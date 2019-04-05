import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService, UserService, CommonService, UploadService } from '../../services';
import { AppComponent } from '../../app.component';
import { environment } from '../../../environments/environment';

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
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public global: GlobalService,
    public userService: UserService,
    public commonService: CommonService,
    public uploadService: UploadService,
    public appcomponent: AppComponent
    ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.user = this.global.currentUser;
    this.user_id = id;
    this.baseUrl = environment.baseUrl;
    
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
}
