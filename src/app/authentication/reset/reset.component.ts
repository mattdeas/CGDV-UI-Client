import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { AppComponent } from '../../app.component';
import { GlobalService } from '../../services/global.service';
declare var $: any;

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html'
})
export class ResetComponent implements OnInit {
  submitted = false;
  error = false;
  token: any;
  constructor(
    private router: Router,
    protected route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private appcomponent: AppComponent,
    public global: GlobalService
  ) {
    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['/']);
    }
    this.route.queryParams.subscribe(params => {
        this.token = params['token'];        
    });
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
  onSubmit(data: any, valid: boolean) {
    console.log('onsubmit',data,valid)
    this.submitted = true;
    if (!valid) {
      return false;
    }
    this.appcomponent.showLoader();
    this.authenticationService.resetPassword({'token':this.token,'password':data.password}).subscribe(
      (response: any) => {
        this.appcomponent.hideLoader();
        if (response.status === 1) {          
          this.appcomponent.showSuccess(response.message);
          this.router.navigate(['/authentication/signin']);
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
