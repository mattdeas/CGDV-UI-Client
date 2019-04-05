import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VisualService } from '../../../services/visual.service';
import { UploadService } from '../../../services/upload.service';
import { ToastService } from '../../../services/toaster.service';
import { CommonService } from '../../../services/common.service';
import { AppComponent } from '../../../app.component';
import { PagerService } from '../../../services/pager.serrvice';
import { environment } from '../../../../environments/environment';
declare var $: any;
@Component({
  selector: 'ngx-list',
  styleUrls: ['./list.component.scss'],
  templateUrl: './list.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ListComponent {
  baseUrl = environment.baseUrl;
  showAdd = false;
  user: any;
  user_id: any;
  viz_id: any;
  rows = [];
  data: any = {
    count: 0,
    currentPage: 0
  };
  Math: any;
  applyFilter = false;
  applySorting = false;  
  sortingData: any = {prop: '', dir: ''};
  fil
  sorts: any[] = [];
  loading;
  limit = 20;
  // pager object
  pager: any = {};
 
  // paged items
  pagedItems: any[];
  page = 1;

  model: any = {};
  add_uni_model: any = {};
  genderList:any = [];
  universityList:any = [];
  countryList:any = [];
  categoryList:any = [];
  challengeList:any = [];
  file: File;
  files: any;
  image: any;
  imageType: any;
  formData: any;
  disableFlag = true;
  changeImageFlag = false;
  uploading= false;
  constructor(
    private visualService: VisualService, 
    private uploadService: UploadService,
    private appcomponent: AppComponent,
    private router: Router,
    private route: ActivatedRoute,
    private pagerService: PagerService,
    private commonService: CommonService,) {
    	
  }
  
  ngOnInit() {
    this.user = this.commonService.getLoginUser();
    this.user_id = this.user.id;
    this.Math = Math;    
    this.getVisualList(1, '', '', this.applyFilter, this.applySorting);
    if(this.route.snapshot.queryParamMap.get('challenge_id') != null)
    {
          this.model.challenge_id = parseInt(this.route.snapshot.queryParamMap.get('challenge_id'));
    }

    this.commonService.getCountryList('')
      .subscribe((res: any) => {
        if(res.status){
          this.countryList = res.result.data;          
        }
      },
      (error) => {        
        // this.appcomponent.showError(error);
      });

    this.loadUniversity();
    this.loadChallengeList();

    this.commonService.getCategoryList("?type=visual")
      .subscribe((res: any) => {
        if(res.status){
          this.categoryList = res.result.data;
        }
      },
      (error) => {        
        // this.appcomponent.showError(error);
      });
  }
  ngAfterViewInit() {
      this.doJqueryLoad();     
  }

  // You don't need to use document.ready... 
  doJqueryLoad() {
     $( "#js-header" ).removeClass("bg-over-hdr");
     $( "#js-header" ).removeClass("sticky");     
  }
  getVisualList(pageNo: number, filterData: any, sortingData: any, applyFilter: boolean, applySorting: boolean){
    this.loading = true;
    let url = '?recordPerPage='+this.limit+'&page=' + pageNo;
    url +=  '&user_id=' + this.user_id;
    if (applySorting === true && sortingData) {
      if (sortingData.sorts && sortingData.sorts[0]) {
        this.sortingData.prop = sortingData.sorts[0].prop;
        this.sortingData.dir = sortingData.sorts[0].dir;
      }
      url +=  '&orderby=' + this.sortingData.prop +
              '&orderbydirection=' + this.sortingData.dir;
    }
    if (applyFilter === true && filterData) {

      url +=  (filterData.title ? ('&title=' + filterData.title) : '') +
              (filterData.author ? ('&author=' + filterData.author) : '') +
              (filterData.tags ? ('&tags=' + filterData.tags) : '') 
    }
    this.visualService.getVisual(url).subscribe((res: any) => {
        this.loading = false;
        if (res.status === 0) {
          return false;
        }
        if(res.status){
          this.rows = res.result.data;
          this.data.count = res.result.count;
          this.data.currentPage = res.result.currentPage;
          this.pager = this.pagerService.getPager(this.data.count, pageNo, this.limit);
        }
     },
      (error) => {        
        this.appcomponent.showError(error);
      });
  }
  edit(visual: any) { 
    this.router.navigate(['/my-visual/edit'],{ queryParams: {'viz_id':visual.id} , queryParamsHandling:"merge"  }); 
  }
  delete(viz_id, user_id) {
   if (window.confirm('Are you sure you want to delete?')) {
   this.visualService.deleteVisual(viz_id,"?user_id="+this.user_id).subscribe((res: any) => {
        if(res.status){
          this.appcomponent.showSuccess(res.message);
          this.rows = this.rows.filter(item => item.id !== viz_id);          
          this.data.count -= 1;
          if(!this.rows.length){
            this.getVisualList(1, '', '', this.applyFilter, this.applySorting);
          }
        }
     },
      (error) => {        
        this.appcomponent.showError(error);
      });
    }
  }

  upvote(viz){
    // if(this.global.isLoggedIn){ 
      this.visualService.upvoteVisual(viz.id).subscribe((res: any) => {
          if (res.status === 0) {
            return false;
          }
          if(res.status){
            viz = res.data[0];
            let i = this.rows.findIndex(function(element) {
              return viz.id == element.id;
            })
            if(i!== -1){
              this.rows[i].upvoted = 1;
              this.rows[i].upvote = viz.upvote;
            }
            // this.getVisualList(this.pager.currentPage, '', '', this.applyFilter, this.applySorting);
          }
       },
        (error) => {        
          this.appcomponent.showError(error);
        });
    // }else{
    //   this.appComponent.showError('Please Login to upvote.');
    // }
  }


  loadUniversity(){
    this.commonService.getUniversityList('')
      .subscribe((res: any) => {
        if(res.status){
          this.universityList = res.result.data;
        }
      },
      (error) => {        
        // this.appcomponent.showError(error);
      });
  }

  loadChallengeList(){
    this.commonService.getChallengeList('')
      .subscribe((res: any) => {
        if(res.status){
          this.challengeList = res.result.data;
        }
      },
      (error) => {        
        // this.appcomponent.showError(error);
      });
  }

  onUniChange(event){
    let add_new = (event.target.value == 'add_new') ? true : false;
    console.log(add_new)
    if(add_new){
      $("#myModal").modal('show');
      this.model.university_id = undefined;
    }
  }
  add_uni(f1){
    console.log(this.add_uni_model)
    this.commonService.addUniversity(f1.form.value)
      .subscribe((res: any) => {
        if(res.status){
          this.appcomponent.showSuccess(res.message);
          this.loadUniversity();
          f1.submitted = false;
          f1.reset();
          this.add_uni_model = {};
          $("#myModal").modal('hide');
        }else{
          this.appcomponent.showError(res.message);
        }
      },
      (error) => {        
        this.appcomponent.showError(error);
      });
  }
  onSubmit(f) {
      if(this.model.comments == null)  {
        this.model.comments = false;
      }
        
      // this.model.user_id = this.user_id;
      this.visualService.addVisual(this.model)
      .subscribe((res: any) => {
          if(res.status){
            this.appcomponent.showSuccess(res.message);
            // this.router.navigate(['/my-visual/list']);
            this.showAdd = false;
            f.submitted = false;
            f.reset();
            this.model = {};
            this.image = null;
            this.getVisualList(1, '', '', this.applyFilter, this.applySorting);
          }else{
            this.appcomponent.showError(res.message);
          }
        },
      (error) => {        
        this.appcomponent.showError(error);
      });
  }
  
  // For image upload (convert base 64)
  changeListener($event) {
    this.disableFlag = false;
    // if (($event.target.files[0].type === 'image/jpeg') ||
    //    ($event.target.files[0].type === 'image/jpg') ||       
    //    ($event.target.files[0].type === 'image/png')) {
    // } else {
    //   this.appcomponent.showError('please upload only jpg/png file only');
    //   this.disableFlag = true;
    // }
    
    this.file = $event.target.files[0];  
    // this.formData = new FormData();
    // // Append files to the virtual form.    
    // this.formData.append('upload', this.file);

    const myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image = myReader.result;
    };
    myReader.readAsDataURL(this.file);
  }

  // For upload image called API
  UploadImage() {
    this.appcomponent.showLoader();
    this.uploading= true;
    this.uploadService.uploadImage(this.image).subscribe(
      (response: any) => {
        this.uploading= false;
        this.appcomponent.hideLoader();
        if (response.status === 0) {
          return false;
        }
        this.model.avatar = response.result.filePath
        this.disableFlag = true;
        this.changeImageFlag = true;
        this.appcomponent.showSuccess(response.message);
      },
      (error) => {
        this.uploading= false;
        this.appcomponent.hideLoader();
        this.appcomponent.showError(error);
      });
  }
  changeImage(){
    this.changeImageFlag = true;
  }
  removeImage() {
    if (window.confirm('Are you sure you want to remove?')) {
      this.appcomponent.showLoader();
      if(this.disableFlag && this.model.avatar){
        this.uploadService.removeImage(this.model.avatar).subscribe(
          (response: any) => {
            this.appcomponent.hideLoader();
            if (response.status === 0) {
              return false;
            }
            this.image = '';
            this.model.avatar = '';
            this.file = null;
            this.appcomponent.showSuccess(response.message);
          },
          (error) => {
            this.appcomponent.hideLoader();
            this.appcomponent.showError(error);
          });
      }else{
        this.appcomponent.hideLoader();
        this.image = '';
        this.file = null;      
        this.appcomponent.showSuccess('Image removed');
      }
    }
  }
}
