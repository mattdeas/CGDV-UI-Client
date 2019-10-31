import { Router } from '@angular/router';
import { Component, AfterViewInit, Inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { VisualService } from '../../services/visual.service';
import { CMSService } from '../../services/cms.service';
import { CommonService } from '../../services/common.service'
import { AppComponent } from '../../app.component';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ChallengeService} from '../../services/challenge.service';
// import * as Typed from 'typed.js';
declare  var Typed:any;
import "../../../assets/vendor/typedjs/typed.min.js";
import { any } from 'prop-types';
declare var $: any;

export interface DialogData {
  URLPath: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
  deviceInfo = null;
  baseUrl = environment.baseUrl;
  featuredList: any = [];
  Challengerows = [];
  homeCMS: any = {};
  statistics: any = {};
  users: number;
  countries: number;
  universities: number;
  visuals: number;
  publicIP: any;
  public innerWidth: any;
  public innerHeight: any;

  constructor(public router: Router,
              public visualService: VisualService,
              public cmsService: CMSService,
              public commonService: CommonService,
              private deviceService: DeviceDetectorService,
              public appComponent: AppComponent,private _sanitizer: DomSanitizer,
              public challengeService: ChallengeService,
              private http:HttpClient, public dialog:MatDialog
    ) {
    this.epicFunction();
  }
  arrowsClasses="u-arrow-v1 g-pos-abs g-right-0 g-bottom-100x g-width-35 g-width-45--md g-height-35 g-height-45--md g-font-size-18 g-color-gray-light-v1 g-color-white--hover g-bg-primary--hover g-brd-around g-brd-gray-light-v1 g-brd-primary--hover g-rounded-50x g-mb-65 g-transition-0_2 g-transition--ease-in";
  arrowLeftClasses="fa fa-angle-left g-mr-40 g-mr-60--md";
  arrowRightClasses="fa fa-angle-right";
  slideConfig_news = {
    prevArrow: '',
    nextArrow: '',
    autoplay: true,
    autoplaySpeed: 10000
  };
  slideConfig = {
    prevArrow: '<div class="js-prev ' + this.arrowsClasses + ' ' + this.arrowLeftClasses + '"></div>',
    nextArrow: '<div class="js-next ' + this.arrowsClasses + ' ' + this.arrowRightClasses + '"></div>',
  };

  ngOnInit(){
    this.getFeaturedList();
    this.getCMSContent();
    this.getStats();

    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
    if(this.innerWidth > 1000) //Only show on non Mobile
    { 
      this.openDialog();
    }

    
    
    
  }

  epicFunction() {
    console.log('hello `Home` component');
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
    console.log(this.deviceInfo);
    console.log(isMobile);  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
    console.log(isTablet);  // returns if the device us a tablet (iPad etc)
    console.log(isDesktopDevice); // returns if the app is running on a Desktop browser.
  }
   
  openDialog(): void {
    let url = '?recordPerPage=20&page=1';// + pageNo;    
    this.challengeService.getChallenge(url).subscribe((res: any) => {
      //     this.loading = false;
           if (res.status === 0) {
             return false;
           }
           if(res.status){
             this.Challengerows = res.result.data;
             console.log(this.Challengerows);
             
             if(this.Challengerows.length > 0)
              {
                for(var i = 0; i < this.Challengerows.length; i += 1) {
                  
                  if(this.Challengerows[i].notificationshow == 0) 
                    {
                      this.Challengerows.splice(i,1);
                      i = i - 1;
                    }
                  else
                  {
                    var EndDate;
                    EndDate = new Date(this.Challengerows[0].end);
                    var Today;
                     Today = new Date();
                     var dayDif = (EndDate - Today)  / 1000 / 60 / 60 / 24;
                     console.log(Today);
                     console.log(EndDate);
                     console.log(dayDif);
                     if(dayDif > 5){
                      this.Challengerows.splice(i,1);
                      i = i - 1;
                     }
                  }
                }
              }
            
              if(this.Challengerows.length > 0)
              {   console.log(this.Challengerows[this.Challengerows.length - 1].embedded_path);
                  var trustURL = this.Challengerows[this.Challengerows.length - 1].embedded_path;
                 const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
                  width: '70%', height: '900px',
                  data: {URLPath: trustURL  }
                 });
              }

           }
        },
         (error) => {        
           this.appComponent.showError(error);
    });
    

    // this.commonService.getChallengeList('')
    //   .subscribe((res: any) => {
    //     if(res.status){
    //       console.log(res);
    //     }
    //   },
    //   (error) => {        
    //     // this.appcomponent.showError(error);
    //   });


    // const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
    //   width: '70%', height: '800px'
    // });

   
  }



  
  

  getMobileStyle(myVal: any)
		{
      if(myVal == 1)
      {
        const style = "height: " + this.innerHeight + "px;";
        return this._sanitizer.bypassSecurityTrustStyle(style);
      }
      else
      {
        const style = "object-fit: fill; height: " + this.innerHeight + "px;";
        return this._sanitizer.bypassSecurityTrustStyle(style);
      }
      
    }
    
  getStats(){
    this.commonService.getDashboardStatistics('').subscribe((res: any) => {

      console.log(res.result.data);
      this.statistics = res.result.data[0];
      this.universities = parseInt(this.statistics.universities);
      this.visuals = parseInt(this.statistics.visuals);
      this.users = parseInt(this.statistics.users);
      this.countries = parseInt(this.statistics.countries);

      //if (res.status === 0) {
      //  return false;
     //}
      //if(res.status && res.result && res.result.data){
      //  
      //}
   },
    (error) => {        
      
    });
  }
  getCMSContent(){
    this.cmsService.getAboutHomepage().subscribe((res: any) => {
        if (res.status === 0) {
          return false;
        }
        if(res.status && res.result && res.result.length){
          this.homeCMS['about_us'] = res.result[0].content;
        }
     },
      (error) => {        
        
      });
    this.cmsService.getVideoSection().subscribe((res: any) => {
        if (res.status === 0) {
          return false;
        }
        if(res.status && res.result && res.result.length){
          this.homeCMS['video_section'] = res.result[0];
          console.log("this.homeCMS['video_section']",this.homeCMS['video_section'])
          var typed2 = new Typed('.u-text-animation.u-text-animation--typing', { 
             strings: [this.homeCMS['video_section']['text_typed']], 
             typeSpeed: 80,
             backDelay: 2000, 
             fadeOut: true, 
             loop: false });
        }
     },
      (error) => {        
        
      });
    this.cmsService.getPartnerList('').subscribe((res: any) => {
        if (res.status === 0) {
          return false;
        }
        if(res.status && res.result && res.result.data){
          this.homeCMS['partners'] = res.result.data;
        }
     },
      (error) => {        
        
      });
    this.cmsService.getNewsList('').subscribe((res: any) => {
        if (res.status === 0) {
          return false;
        }
        if(res.status && res.result && res.result.data){
          this.homeCMS['latest_news'] = res.result.data;
          console.log("this.homeCMS['latest_news']",this.homeCMS['latest_news'])
        }
     },
      (error) => {        
        
      });
  }
  getFeaturedList(){
    var url = '?recordPerPage=10&page=1&is_featured=1&orderby=seq_no&orderbydirection=ASC'
    this.visualService.getVisual(url).subscribe((res: any) => {
        if (res.status === 0) {
          return false;
        }
        if(res.status){
          this.featuredList = res.result.data;
        }
     },
      (error) => {        
        this.appComponent.showError(error);
      });
  }

	ngAfterViewInit() {
     
    this.doJqueryLoad();     
    /* $('.count').each(function () {
      $(this).prop('Counter',0).animate({
          Counter: $(this).text()
      }, {
          duration: 4000,
          easing: 'swing',
          step: function (now) {
              $(this).text(Math.ceil(now));
          }
      });
    });  */
     
  }

  // You don't need to use document.ready... 
  doJqueryLoad() {
       // var typed2 = new Typed('.u-text-animation.u-text-animation--typing', { 
       //       strings: [this.homeCMS['video_section']], 
       //       typeSpeed: 80,
       //       backDelay: 2000, 
       //       fadeOut: true, 
       //       loop: false });
    // var typed2 = new Typed('.u-text-animation.u-text-animation--typing', { 
    //      strings: [ 
    //                  "The Story is in the Data", 
    //                  "Using Data We Can Make Development More Effective",
    //                  "Saving Money", 
    //                  "And Saving Lives", ], 
    //      typeSpeed: 60,            
    //      backDelay: 500, 
    //      fadeOut: true, 
    //      loop: true });  
      // $( "#js-header" ).addClass("bg-over-hdr");
      $( "#js-header" ).removeClass("bg-over-hdr");     
      $( "#js-header" ).removeClass("sticky"); 
      // initialization of go to
      $.HSCore.components.HSGoTo.init('.js-go-to');
  }
}




@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  URLPath: any;
  //constructor(
  //  public dialogRef: MatDialogRef<DialogOverviewExampleDialog>
  //  ) {}
  constructor(
      public sanitizer: DomSanitizer,
      public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
        //this.URLPath = this.sanitizer.bypassSecurityTrustResourceUrl(data.URLPath);
       //  = data.URLPath;

      }

  ngOnInit() {
    
  }
  
  ngAfterViewInit() {
  
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}