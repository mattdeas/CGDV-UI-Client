import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService, UserService, CommonService, UploadService } from '../../services';
import { AppComponent } from '../../app.component';
import { environment } from '../../../environments/environment';
import { VisualService} from '../../services/visual.service';
import { PagerService } from '../../services/pager.serrvice';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.css']
})
export class BioComponent implements OnInit {
  user: any;
  user_id: any;
  title: any;
  model: any = {};
  genderList:any = [];
  universityList:any = [];
  countryList:any = [];
  categoryList:any = [];
  file: File;
  files: any;
  image: any;
  imageType: any;
  formData: any;
  disableFlag = true;
  changeImageFlag = false;
  isEdit;
  baseUrl;
  add_uni_model: any = {};
  uploading:any = false;
  applyFilter = false;
  applySorting = false;
  filterData: any = {};
  limit = 20;
  sortingData: any = {prop: '', dir: ''};
  rows = [];
  data: any = {
    count: 0,
    currentPage: 0
  };
  innerWidth : number;
  // pager object
  pager: any = {};
 
  // paged items
  pagedItems: any[];
  page = 1;
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public global: GlobalService,
    public userService: UserService,
    public commonService: CommonService,
    public uploadService: UploadService,
    public appcomponent: AppComponent,
    private visualService: VisualService,
    private pagerService: PagerService,
    private _sanitizer: DomSanitizer
    ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.user = this.global.currentUser;
    this.user_id = id;
    this.baseUrl = environment.baseUrl;
    this.innerWidth = window.innerWidth;
    
    if(this.user_id){
      this.userService.getUserProfile(this.user_id)
          .subscribe((res: any) => {
            if(res.status){
              this.isEdit = false;
              this.model = res.data[0];  
              this.image = this.baseUrl+ "/" +this.model.avatar;
            }else{
              this.appcomponent.showError(res.message); 
              this.router.navigate(['/']);
            }
          });    
      
      this.title = this.route.snapshot.data.title;
      
      
      this.commonService.getCountryList('')
          .subscribe((res: any) => {
            if(res.status){
                  this.countryList = res.result.data;
                }
          });
      
      this.loadUniversity();
             
      this.commonService.getCategoryList("?type=team")
          .subscribe((res: any) => {
            if(res.status){
                this.categoryList = res.result.data;
              }
            },
            (error) => {        
              // this.appcomponent.showError(error);
            });
          }else{
            this.router.navigate(['/']);
          }
         
          
          
          this.route.queryParams.subscribe(params => {
            
              this.filterData.user_id = this.user_id;
              this.applyFilter = this.filterData.user_id ? true : false;
              
                           
              
      
              this.getVisualList(1, this.filterData, '', this.applyFilter, this.applySorting);
          });
     

  }

  getVisualList(pageNo: number, filterData: any, sortingData: any, applyFilter: boolean, applySorting: boolean){
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

  getCurrentStyle()
		{
      if(this.innerWidth < 1000)
				return this._sanitizer.bypassSecurityTrustStyle("padding-left:10%;padding-right:10%;width:100%;text-align:center");
      else
        return this._sanitizer.bypassSecurityTrustStyle("width:100%;text-align:center");
		}
}
