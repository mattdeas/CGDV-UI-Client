import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../../services/common.service';
import { UserService } from '../../../services/user.service';
import { AppComponent } from '../../../app.component';

import { UploadService } from '../../../services/upload.service';
import { VisualService } from '../../../services/visual.service';

import { environment } from '../../../../environments/environment';
import { LZStringModule, LZStringService } from 'ng-lz-string';
import { HttpClient,HttpParams } from '@angular/common/http';

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
  link: any;
  page_title;
  model: any = {};
  genderList:any = [];
  universityList:any = [];
  countryList:any = [];
  categoryList:any = [];
  challengeList:any = [];
  userList:any = [];
  selUserList: any = [];
  visUsers:  any = [];
  file: File;
  files: any;
  image: any;
  imageType: any;
  formData: any;
  disableFlag = true;
  changeImageFlag = false;
  add_uni_model: any = {};
  uploading:any = false;
  showhideMultiUser: boolean;
  usrSearch: any;

  constructor(
              private commonService: CommonService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private appcomponent: AppComponent,
              private uploadService: UploadService,
              private visualService: VisualService,
              private lz: LZStringService
              ) {}
  ngAfterViewInit() {
      this.doJqueryLoad();     
  }

  Preview()
  {
    //this.router.navigate([]).then(result => {  window.open(link, '_blank'); });
    
     //http://localhost:4200/visualpreview?embed=%3Cdiv%20class=%27tableauPlaceholder%27%20id=%27viz1560181636143%27%20style=%27position:%20relative%27%3E%3Cnoscript%3E%3Ca%20href=%27#'%3E%3Cimg%20alt='%20'%20src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Tu&#47;Turkmenistan&#47;Dashboard1&#47;1_rss.png'%20style='border:%20none'%20/%3E%3C/a%3E%3C/noscript%3E%3Cobject%20class='tableauViz'%20%20style='display:none;'%3E%3Cparam%20name='host_url'%20value='https%3A%2F%2Fpublic.tableau.com%2F'%20/%3E%20%3Cparam%20name='embed_code_version'%20value='3'%20/%3E%20%3Cparam%20name='site_root'%20value=''%20/%3E%3Cparam%20name='name'%20value='Turkmenistan&#47;Dashboard1'%20/%3E%3Cparam%20name='tabs'%20value='no'%20/%3E%3Cparam%20name='toolbar'%20value='yes'%20/%3E%3Cparam%20name='static_image'%20value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Tu&#47;Turkmenistan&#47;Dashboard1&#47;1.png'%20/%3E%20%3Cparam%20name='animate_transition'%20value='yes'%20/%3E%3Cparam%20name='display_static_image'%20value='yes'%20/%3E%3Cparam%20name='display_spinner'%20value='yes'%20/%3E%3Cparam%20name='display_overlay'%20value='yes'%20/%3E%3Cparam%20name='display_count'%20value='yes'%20/%3E%3Cparam%20name='filter'%20value='publish=yes'%20/%3E%3C/object%3E%3C/div%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cscript%20type='text/javascript'%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20var%20divElement%20=%20document.getElementById('viz1560181636143');%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20var%20vizElement%20=%20divElement.getElementsByTagName('object')[0];%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20(%20divElement.offsetWidth%20%3E%20800%20)%20{%20vizElement.style.width='1000px';vizElement.style.height='827px';}%20else%20if%20(%20divElement.offsetWidth%20%3E%20500%20)%20{%20vizElement.style.width='1000px';vizElement.style.height='827px';}%20else%20{%20vizElement.style.width='100%';vizElement.style.height='1527px';}%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20var%20scriptElement%20=%20document.createElement('script');%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20scriptElement.src%20=%20'https://public.tableau.com/javascripts/api/viz_v1.js';%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20vizElement.parentNode.insertBefore(scriptElement,%20vizElement);%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C/script%3E&comment=true&description=null&avatar=storage/vS7sU8tEHDoTxv4c.png
     //http://localhost:4200/visualpreview?embed=%3Cdiv%20class=%27tableauPlaceholder%27%20id=%27viz1560181636143%27%20style=%27position:%20relative%27%3E%3Cnoscript%3E%3Ca%20href==27%23%27%3E%3Cimg%20alt%3D%27%20%27%20src%3D%27https:%26%2347;%26%2347;public.tableau.com%26%2347;static%26%2347;images%26%2347;Tu%26%2347;Turkmenistan%26%2347;Dashboard1%26%2347;1_rss.png%27%20style%3D%27border:%20none%27%20%2F%3E%3C%2Fa%3E%3C%2Fnoscript%3E%3Cobject%20class%3D%27tableauViz%27%20%20style%3D%27display:none;%27%3E%3Cparam%20name%3D%27host_url%27%20value%3D%27https%253A%252F%252Fpublic.tableau.com%252F%27%20%2F%3E%20%3Cparam%20name%3D%27embed_code_version%27%20value%3D%273%27%20%2F%3E%20%3Cparam%20name%3D%27site_root%27%20value%3D%27%27%20%2F%3E%3Cparam%20name%3D%27name%27%20value%3D%27Turkmenistan%26%2347;Dashboard1%27%20%2F%3E%3Cparam%20name%3D%27tabs%27%20value%3D%27no%27%20%2F%3E%3Cparam%20name%3D%27toolbar%27%20value%3D%27yes%27%20%2F%3E%3Cparam%20name%3D%27static_image%27%20value%3D%27https:%26%2347;%26%2347;public.tableau.com%26%2347;static%26%2347;images%26%2347;Tu%26%2347;Turkmenistan%26%2347;Dashboard1%26%2347;1.png%27%20%2F%3E%20%3Cparam%20name%3D%27animate_transition%27%20value%3D%27yes%27%20%2F%3E%3Cparam%20name%3D%27display_static_image%27%20value%3D%27yes%27%20%2F%3E%3Cparam%20name%3D%27display_spinner%27%20value%3D%27yes%27%20%2F%3E%3Cparam%20name%3D%27display_overlay%27%20value%3D%27yes%27%20%2F%3E%3Cparam%20name%3D%27display_count%27%20value%3D%27yes%27%20%2F%3E%3Cparam%20name%3D%27filter%27%20value%3D%27publish%3Dyes%27%20%2F%3E%3C%2Fobject%3E%3C%2Fdiv%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cscript%20type%3D%27text%2Fjavascript%27%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20var%20divElement%20%3D%20document.getElementById(%27viz1560181636143%27);%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20var%20vizElement%20%3D%20divElement.getElementsByTagName(%27object%27)%5B0%5D;%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20(%20divElement.offsetWidth%20%3E%20800%20)%20%7B%20vizElement.style.width%3D%271000px%27;vizElement.style.height%3D%27827px%27;%7D%20else%20if%20(%20divElement.offsetWidth%20%3E%20500%20)%20%7B%20vizElement.style.width%3D%271000px%27;vizElement.style.height%3D%27827px%27;%7D%20else%20%7B%20vizElement.style.width%3D%27100%25%27;vizElement.style.height%3D%271527px%27;%7D%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20var%20scriptElement%20%3D%20document.createElement(%27script%27);%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20scriptElement.src%20%3D%20%27https:%2F%2Fpublic.tableau.com%2Fjavascripts%2Fapi%2Fviz_v1.js%27;%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20vizElement.parentNode.insertBefore(scriptElement,%20vizElement);%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fscript%3E&comment=true&avatar=storage%2FvS7sU8tEHDoTxv4c.png
    var params = new HttpParams()
     .set('embed', encodeURIComponent(this.model.embed_code))
     .set('comment', this.model.comments)
     .set('description', this.model.description)
     .set('avatar', this.model.avatar);
    
    //console.log(params.toString());

    this.link =  '/visualpreview?' + params.toString();
    //console.log(encodeURIComponent(this.model.embed_code));
    //console.log(this.link);
      this.router.navigate([],{ 
         queryParams: {
           'embed':encodeURIComponent(this.model.embed_code),
           'comment':this.model.comments,
           'description':this.model.description,
           'avatar':this.model.avatar

          
           //this.link = '/visualpreview';

           } , queryParamsHandling:"merge"  }).then(result => {  window.open(this.link, '_blank'); });
    
  }
  // You don't need to use document.ready... 
  doJqueryLoad() {
     $( "#js-header" ).removeClass("bg-over-hdr");
     $( "#js-header" ).removeClass("sticky");     
  }

  selectedIds = [];
  selectedUsers = [];
  OnCheckboxSelect(id, lastname, firstname, event) {
    console.log('in here');
    console.log(event);
    if (event.target.checked === true) {
      this.selectedUsers.push({id: id, lastname: lastname, firstname: firstname});
      this.selectedIds.push({id: id, checked: event.target.checked});
      
    }
    if (event.target.checked === false) {
      this.selectedIds = this.selectedIds.filter((item) => item.id !== id);
      this.selectedUsers = this.selectedUsers.filter((item) => item.id !== id);
    }
  }

  PopulateSelectedUsers(id, lastname, firstname) {
      this.selectedUsers.push({id: id, lastname: lastname, firstname: firstname});
      this.selectedIds.push({id: id, checked: true});
  }

  loadUserList(){
    this.commonService.getUserList('')
      .subscribe((res: any) => {
        if(res.status){
          this.userList = res.result.data;
          this.selUserList = res.result.data;
        }
      },
      (error) => {        
        // this.appcomponent.showError(error);
      });
  }

  loadSelUsers(){
    if(this.viz_id)
    {
      var url = '?viz_id='+this.viz_id;  
      this.visualService.getVisualUser(url).subscribe((res: any) => {
        if (res.status === 0) {
          return false;
        }
        if(res.status){
          console.log('VisualUsers')
          console.log(res);
          this.visUsers = res.result.data[0];
          console.log(this.visUsers.length)
          if(this.visUsers && this.visUsers.length > 1)
          {
            
            this.showhideMultiUser = true;
            var i = 0;
            for(var i = 0; i < this.visUsers.length; i++)
            { 
              console.log(this.visUsers[i]);
              console.log(this.visUsers[i].id);
              if(this.visUsers[i].user_id != this.user_id){
                this.PopulateSelectedUsers(this.visUsers[i].user_id, this.visUsers[i].lastname, this.visUsers[i].firstname);
              }
            }
          }
          console.log(this.visUsers);
          //console.log(this.visual.vnumcomments);
          
        }
      },
      (error) => {        
        //this.appComponent.showError(error);
      });
    }
  }
  remUser(id, event)
  {
    console.log(this.selectedIds)
    this.selectedIds = this.selectedIds.filter((item) => item.id !== id);
    console.log(this.selectedIds)
    this.selectedUsers = this.selectedUsers.filter((item) => item.id !== id);
  }
  UserSearchChange(val: String ){
    this.selUserList = this.userList;
    if(val.length > 0)
    {
      //consultant.lastname.toLowerCase().indexOf(searchString.toLowerCase()) !== -1
    this.selUserList = this.userList.filter(x => (x.lastname + "").toLowerCase().indexOf(val.toLowerCase()) !== -1 || (x.firstname + "").toLowerCase().indexOf(val.toLowerCase()) !== -1)
    }
  }


  ngOnInit() {
    console.log('starting');
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
              console.log('Has Data');
              console.log(this.model);
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
    this.loadUserList();
    this.loadSelUsers();
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
    if(this.model.comments == null)  {
      this.model.comments = false;
    }
    this.model.selectedIds = this.selectedIds;
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


