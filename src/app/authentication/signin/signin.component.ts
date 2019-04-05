import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { AppComponent } from '../../app.component';
import { GlobalService } from '../../services/global.service';

declare var $: any;
import {
    AuthService,
    FacebookLoginProvider,
    GoogleLoginProvider
} from 'angular-6-social-login';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit {
  submitted = false;
  error = false;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private appcomponent: AppComponent,
    public global: GlobalService,
    private socialAuthService: AuthService
  ) {
    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    
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
              this.global.setCurrentUser(this.global.currentUser);
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
    this.authenticationService.loginUser(data).subscribe(
      (response: any) => {
        this.appcomponent.hideLoader();
        if (response.status === 1) {
          localStorage.setItem('currentUser', JSON.stringify(response.result));
          localStorage.setItem('token', response.result.token);
          localStorage.setItem('isLoggedIn', 'true');
          this.global.isLoggedIn = localStorage.getItem('isLoggedIn');
          this.global.currentUser = JSON.parse(localStorage.getItem('currentUser'));
          this.global.setCurrentUser(this.global.currentUser);
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
}
