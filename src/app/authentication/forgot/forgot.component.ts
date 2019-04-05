import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { AppComponent } from '../../app.component';
import { GlobalService } from '../../services/global.service';
declare var $: any;

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  constructor( private router: Router,
               private authenticationService: AuthenticationService,
               private appcomponent: AppComponent,
               public global: GlobalService,
             ) {}

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
  onSubmit(data) {
    console.log('data',data)
    this.appcomponent.showLoader();
          this.authenticationService.forgotPassword(data).subscribe(
          (response: any) => {
            this.appcomponent.hideLoader();
            if (response.status === 1) {
              this.appcomponent.showSuccess(response.message);
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
  }
}
