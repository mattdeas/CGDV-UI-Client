import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AppComponent } from '../../app.component';
import { GlobalService } from '../../services/global.service';
declare var $: any;

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnInit {
  model:any = {};
  constructor(
    private router: Router,
    protected route: ActivatedRoute,
    private userService: UserService,
    private appcomponent: AppComponent,
    public global: GlobalService
  ) {
    
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
  onSubmit() {
    console.log('model',this.model)
    this.userService.changePassword(this.model)
      .subscribe((res: any) => {
          if(res.status){
            this.appcomponent.showSuccess(res.message);
            this.global.logout();
          }else{
            this.appcomponent.showError(res.message);
          }
        },
      (error) => {        
        this.appcomponent.showError(error);
      });
  }
}
