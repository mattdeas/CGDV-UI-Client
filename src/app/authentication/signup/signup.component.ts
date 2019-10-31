import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { AppComponent } from '../../app.component';
import { GlobalService } from '../../services/global.service';
import { CommonService } from '../../services/common.service';

import {
    AuthService,
    FacebookLoginProvider,
    GoogleLoginProvider
} from 'angular-6-social-login';
declare var $: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
  submitted = false;
  error = false;
  add_uni_model: any = {};
  model: any = {};
  universityList:any;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private appcomponent: AppComponent,
    public global: GlobalService,
    private commonService: CommonService,
    private socialAuthService: AuthService
  ) {
    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loadUniversity()
  }
  ngAfterViewInit() {
      this.doJqueryLoad();     
  }

  // You don't need to use document.ready... 
  doJqueryLoad() {
     $( "#js-header" ).removeClass("bg-over-hdr");        
     $( "#js-header" ).removeClass("sticky");
  }
  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }else if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

     this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform+" sign in data : " , userData);
        // Now sign-in with userData
        // ...
        if(userData.id && userData.email){
          this.appcomponent.showLoader();
          this.authenticationService.socialSignIn({id:userData.id, email:userData.email, provider:socialPlatform}).subscribe(
          (response: any) => {
            this.appcomponent.hideLoader();
            if (response.status === 1) {
              localStorage.setItem('currentUser', JSON.stringify(response.result));
              localStorage.setItem('token', response.result.token);
              localStorage.setItem('isLoggedIn', 'true');
              this.global.isLoggedIn = localStorage.getItem('isLoggedIn');
              this.global.currentUser = JSON.parse(localStorage.getItem('currentUser'));
              
              if (this.global.lastVisitedRoute) {
                const lastVisitedRoute = this.global.lastVisitedRoute.split('?');
                if (lastVisitedRoute[1]) {
                  lastVisitedRoute[1] = this.global.QueryStringToJSON(lastVisitedRoute[1]);
                  this.router.navigate([lastVisitedRoute[0]], {queryParams: lastVisitedRoute[1]});
                } else {
                  this.router.navigate([lastVisitedRoute[0]]);
                }
              } else {
                this.router.navigate(['/']);
              }
            } else {
              this.appcomponent.showError(response.message);
              return false;
            }
          },(error: any) => {
           this.appcomponent.hideLoader();
           this.appcomponent.showError(error);
          })
        }else{
          this.appcomponent.hideLoader();
          this.appcomponent.showError('Email not found from social account');
        }
            
      }
    );
    
    
  }
  // for login
  onSubmit(data: any, valid: boolean) {
    console.log('onsubmit',data,valid)
    this.submitted = true;
    if (!valid) {
      return false;
    }
    this.appcomponent.showLoader();
    this.authenticationService.registerUser(data).subscribe(
      (response: any) => {
        this.appcomponent.hideLoader();
        if (response.status === 1) {
          localStorage.setItem('currentUser', JSON.stringify(response.result));
          localStorage.setItem('token', response.result.token);
          localStorage.setItem('isLoggedIn', 'true');
          this.global.isLoggedIn = localStorage.getItem('isLoggedIn');
          this.global.setCurrentUser(response.result);
          this.global.roles = [];
          this.global.loginRights = '';
          if (response.result.Roles) {
            this.global.roles = response.result.Roles;
          }
          if (response.result.Rights) {
            this.global.loginRights = response.result.Rights;
          }
          if (this.global.lastVisitedRoute) {
            const lastVisitedRoute = this.global.lastVisitedRoute.split('?');
            if (lastVisitedRoute[1]) {
              lastVisitedRoute[1] = this.global.QueryStringToJSON(lastVisitedRoute[1]);
              this.router.navigate([lastVisitedRoute[0]], {queryParams: lastVisitedRoute[1]});
            } else {
              this.router.navigate([lastVisitedRoute[0]]);
            }
          } else {
            this.router.navigate(['/']);
          }
        } else {
          this.appcomponent.showError(response.message);
          return false;
        }
      },
      (error) => {
        console.log(error)
        this.appcomponent.hideLoader();
        this.appcomponent.showError(error);
      }
    );
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
  add_uni(f1){
    console.log('Uni Added =');
    console.log(f1.form.value);
    this.commonService.addUniversity(f1.form.value)
      .subscribe((res: any) => {
        console.log(res);
        if(res.status){
          this.appcomponent.showSuccess(res.message);
          this.loadUniversity();
          f1.submitted = false;
          f1.reset();
          $("#myModal").modal('hide');
          this.model.university_id = res.result[0].id;
        }else{
          this.appcomponent.showError(res.message);
        }
      },
      (error) => {        
        this.appcomponent.showError(error);
      });
  }
}
