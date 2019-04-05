import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../../services/common.service';
import { UserService } from '../../../services/user.service';
import { AppComponent } from '../../../app.component';

import { UploadService } from '../../../services/upload.service';
import { VisualService } from '../../../services/visual.service';

import { environment } from '../../../../environments/environment';
declare var $: any;
@Component({
  selector: 'ngx-add',
  styleUrls: ['./add.component.scss'],
  templateUrl: './add.component.html',
})
export class AddComponent {
  API_URL = environment.baseUrl;
  isEdit  = false;
  user: any;
  user_id: any;
  viz_id: any;
  page_title;
  model: any = {};
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
  add_uni_model: any = {};
  uploading:any = false;
  constructor(
              private commonService: CommonService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private appcomponent: AppComponent,
              private uploadService: UploadService,
              private visualService: VisualService
              ) {}
  ngAfterViewInit() {
      this.doJqueryLoad();     
  }

  // You don't need to use document.ready... 
  doJqueryLoad() {
     $( "#js-header" ).removeClass("bg-over-hdr");
     $( "#js-header" ).removeClass("sticky");     
  }
  ngOnInit() {
    this.user = this.commonService.getLoginUser();
    this.user_id = this.user.id;

    this.route.queryParams.subscribe(params => {
        this.viz_id = params['viz_id'];
        if(this.user_id && this.viz_id){
          var url = '?viz_id='+this.viz_id+'&user_id='+this.user_id;
          this.visualService.getVisual(url)
          .subscribe((res: any) => {
            if(res.status){
              this.isEdit  = true;
              this.model = res.result.data[0];
              
            }else{
              this.appcomponent.showError(res.message);
              this.router.navigate(['/my-visual/list']);
            }
          },
      (error) => {        
        this.appcomponent.showError(error);
      });
        }
    });

    this.page_title = this.route.snapshot.data.title;


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
  onUniChange(event){
    let add_new = (event.target.value == 'add_new') ? true : false;
    console.log(add_new)
    if(add_new){
      $("#myModal").modal('show');
      this.model.university_id = undefined;
    }
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
  add_uni(f1){
    this.commonService.addUniversity(f1.form.value)
      .subscribe((res: any) => {
        if(res.status){
          this.appcomponent.showSuccess(res.message);
          this.loadUniversity();
          f1.submitted = false;
          f1.reset();
          $("#myModal").modal('hide');
        }else{
          this.appcomponent.showError(res.message);
        }
      },
      (error) => {        
        this.appcomponent.showError(error);
      });
  }
 
  onSubmit() {
    if(this.isEdit){
      this.visualService.updateVisual(this.viz_id, this.model)
      .subscribe((res: any) => {
          if(res.status){
            this.appcomponent.showSuccess(res.message);
            this.router.navigate(['/my-visual/list']);
          }else{
            this.appcomponent.showError(res.message);
          }
        },
      (error) => {        
        this.appcomponent.showError(error);
      });
    }else{
      // this.model.user_id = this.user_id;
      this.visualService.addVisual(this.model)
      .subscribe((res: any) => {
          if(res.status){
            this.appcomponent.showSuccess(res.message);
            this.router.navigate(['/my-visual/list']);
          }else{
            this.appcomponent.showError(res.message);
          }
        },
      (error) => {        
        this.appcomponent.showError(error);
      });
    }
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
    this.uploading = true;
    this.uploadService.uploadImage(this.image).subscribe(
      (response: any) => {
        this.appcomponent.hideLoader();
        this.uploading = false;
        if (response.status === 0) {
          return false;
        }
        this.model.avatar = response.result.filePath
        this.disableFlag = true;
        this.changeImageFlag = true;
        this.appcomponent.showSuccess(response.message);
      },
      (error) => {
        this.uploading = false;
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


