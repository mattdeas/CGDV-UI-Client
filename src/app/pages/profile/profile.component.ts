import { Router, ActivatedRoute } from '@angular/router';
import { Component, AfterViewInit } from '@angular/core';
import { GlobalService, UserService, CommonService, UploadService } from '../../services';
import { AppComponent } from '../../app.component';
import { environment } from '../../../environments/environment';
declare var $: any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})

export class ProfileComponent {
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
    this.user = this.global.currentUser;
    this.user_id = this.user.id;
    this.baseUrl = environment.baseUrl;
    if(this.user_id){
      this.userService.getUserProfile(this.user_id)
          .subscribe((res: any) => {
            if(res.status){
              this.isEdit = true;
              this.model = res.data[0];              
            }else{
              this.appcomponent.showError(res.message); 
              this.router.navigate(['/']);
            }
          });    

      this.title = this.route.snapshot.data.title;

      this.genderList = ['Male','Female','Other'];
      this.model.gender = this.genderList[0];

      this.commonService.getCountryList('')
        .subscribe((res: any) => {
          if(res.status){
            this.countryList = res.result.data;
          }
        });

      this.loadUniersity();
       
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

  
  onUniChange(event){
    let add_new = (event.target.value == 'add_new') ? true : false;
    console.log(add_new)
    if(add_new){
      $("#myModal").modal('show');
      this.model.university_id = undefined;
    }
  }
  add_uni(f1){
    this.commonService.addUniversity(f1.form.value)
      .subscribe((res: any) => {
        if(res.status){
          this.appcomponent.showSuccess(res.message);
          this.loadUniersity();
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

  loadUniersity(){
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
  ngAfterViewInit() {
      this.doJqueryLoad();     
  }

  // You don't need to use document.ready... 
  doJqueryLoad() {
     $( "#js-header" ).removeClass("bg-over-hdr");
     $( "#js-header" ).removeClass("sticky");        
  }
  onSubmit() {
    this.userService.updateUser(this.user_id, this.model)
      .subscribe((res: any) => {
          if(res.status){
            this.appcomponent.showSuccess(res.message);
            this.global.setCurrentUser(res.data);
            this.router.navigate(['/']);
          }else{
            this.appcomponent.showError(res.message); 
          }
        },
      (error) => {                
        this.appcomponent.showError(error); 
      });
  }
  
  
  changeListener($event) {
    this.disableFlag = false;
    // if (($event.target.files[0].type === 'image/jpeg') ||
    //    ($event.target.files[0].type === 'image/jpg') ||       
    //    ($event.target.files[0].type === 'image/png')) {
    // } else {
    //   this.appcomponent.showError('please upload only jpg/png file only');
    //   // this.appcomponent.showError('please upload only jpg, gif and png file only');
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
        if (response.status === 0) {
          return false;
        }
        this.uploading = false;
        this.model.avatar = response.result.filePath
        this.disableFlag = true;
        this.changeImageFlag = true;

        this.appcomponent.showSuccess( 'Image Uploaded');
      },
      (error) => {
        this.appcomponent.hideLoader();        
        this.uploading = false;
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
            this.appcomponent.showSuccess('Image removed')
          },
          (error) => {
            this.appcomponent.hideLoader();
            this.appcomponent.showError('Image not removed')
          });
      }else{
        this.appcomponent.hideLoader();
        this.image = '';
        this.file = null;
        this.appcomponent.showSuccess('Image removed')
      }
    }
  }
  	
}
