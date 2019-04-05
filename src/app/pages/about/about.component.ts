import { Router } from '@angular/router';
import { Component, AfterViewInit } from '@angular/core';
import { CMSService } from '../../services/cms.service';
import { environment } from '../../../environments/environment';
declare var $: any;
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html'
})

export class AboutComponent {
  baseUrl = environment.baseUrl;
  aboutCMS: any = {};
  constructor(public router: Router, public cmsService: CMSService,private modalService: NgbModal) {
  }
  arrowsClasses="u-arrow-v1 g-pos-abs g-right-0 g-bottom-100x g-width-35 g-width-45--md g-height-35 g-height-45--md g-font-size-18 g-color-gray-light-v1 g-color-white--hover g-bg-primary--hover g-brd-around g-brd-gray-light-v1 g-brd-primary--hover g-rounded-50x g-mb-65 g-transition-0_2 g-transition--ease-in";
  arrowLeftClasses="fa fa-angle-left g-mr-40 g-mr-60--md";
  arrowRightClasses="fa fa-angle-right";
  slideConfig_nav = {
    // slidesToShow: 5,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    dots: false,
    centerMode: true,
    focusOnSelect: true
  };
  slideConfig_body = {
    // slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.slider-nav'
  };
  modalData: any;
  ngOnInit(){
    this.getCMSContent();

  }
  getCMSContent(){
    this.cmsService.getAboutAboutpage().subscribe((res: any) => {
        if (res.status === 0) {
          return false;
        }
        if(res.status && res.result && res.result.length){
          this.aboutCMS['about_us'] = res.result[0].content;
        }
     },
      (error) => {        
        
      });
    this.cmsService.getPartnerList('').subscribe((res: any) => {
        if (res.status === 0) {
          return false;
        }
        if(res.status && res.result && res.result.data){
          this.aboutCMS['partners'] = res.result.data;
        }
     },
      (error) => {        
        
      });
    this.cmsService.getJourneyList('').subscribe((res: any) => {
        if (res.status === 0) {
          return false;
        }
        if(res.status && res.result && res.result.data){
          this.aboutCMS['our_journey'] = res.result.data;
        }
     },
      (error) => {        
        
      }); 

    this.cmsService.getTeamList('').subscribe((res: any) => {
        if (res.status === 0) {
          return false;
        }
        if(res.status && res.result){
          this.aboutCMS['team'] = res.result;
          console.log("this.aboutCMS['team']",this.aboutCMS['team'])
        }
     },
      (error) => {        
        
      });    
  }
  
    ngAfterViewInit() {
        this.doJqueryLoad();         
    }

    openModal(content,member){
      this.modalData = member;  
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      
    }, (reason) => {
      
    });
    }

    // You don't need to use document.ready... 
    doJqueryLoad() {
      $( "#js-header" ).removeClass("bg-over-hdr");
      $( "#js-header" ).removeClass("sticky");      
    }
}
