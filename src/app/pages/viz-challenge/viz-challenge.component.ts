import { Router, ActivatedRoute } from '@angular/router';
import { Component, AfterViewInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ChallengeService} from '../../services/challenge.service';
import { CommonService} from '../../services/common.service';

import { AppComponent } from '../../app.component';
import { PagerService } from '../../services/pager.serrvice';
import { GlobalService } from '../../services/global.service';


declare var $: any;

@Component({
  selector: 'app-viz-lib',
  templateUrl: './viz-challenge.component.html',
  styleUrls: ['./viz-challenge.component.css']
})

export class VizChallengeComponent {
  baseUrl = environment.baseUrl;
  featuredList = [];
  rows = [];
  data: any = {
    count: 0,
    currentPage: 0
  };
  curPage = this.data.currentPage;
  applyFilter = false;
  applySorting = false;
  filterData: any = {};
  sortingData: any = {prop: '', dir: ''};
  sorts: any[] = [];
  loading;
  limit = 20;
  public innerWidth: any;
  public innerHeight: any;

  now: any;
today: string ;

  
    // pager object
    pager: any = {};
 
    // paged items
    pagedItems: any[];
    page = 1;
    model:any = {};
    universityList:any = [];
  countryList:any = [];
  fromSearch:any = false;
  constructor(public router: Router,
             private route: ActivatedRoute,
             public global: GlobalService,
             public commonService: CommonService,
             public challengeService: ChallengeService,
             private pagerService: PagerService,
             public appComponent: AppComponent) {
  }
  arrowsClasses="u-arrow-v1 g-pos-abs g-right-0 g-bottom-100x g-width-35 g-width-45--md g-height-35 g-height-45--md g-font-size-18 g-color-gray-light-v1 g-color-white--hover g-bg-primary--hover g-brd-around g-brd-gray-light-v1 g-brd-primary--hover g-rounded-50x g-mb-65 g-transition-0_2 g-transition--ease-in";
  arrowLeftClasses="fa fa-angle-left g-mr-40 g-mr-60--md";
  arrowRightClasses="fa fa-angle-right";
  slideConfig = {
    prevArrow: '<div class="js-prev ' + this.arrowsClasses + ' ' + this.arrowLeftClasses + '"></div>',
    nextArrow: '<div class="js-next ' + this.arrowsClasses + ' ' + this.arrowRightClasses + '"></div>',
  };
  ngOnInit(){
    this.route.queryParams.subscribe(params => {
        this.filterData.title = params['title'];
        this.applyFilter = this.filterData.title ? true : false;
        if(this.filterData.title){
          this.fromSearch= true;
        }
        this.getChallengeList();
    })
    this.now = new Date;
    this.today =this.now.toISOString();
    
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
  }

  getChallengeList(){
    this.loading = true;
    let url = '?recordPerPage='+this.limit+'&page=1';// + pageNo;    
    
    //if (applySorting === true ){//&& sortingData) {
      
      //console.log(sortingData.sorts[0]);

      //if (sortingData.sorts && sortingData.sorts[0]) {
      //  this.sortingData.prop = sortingData.sorts[0].prop;
      //  this.sortingData.dir = sortingData.sorts[0].dir;
      //}
      //url +=  '&orderby=' + sortingData;
              //'&orderbydirection=' + this.sortingData.dir;
      
    //}
    //console.log('filterData',filterData)
    //if (applyFilter === true && filterData) {

//      url +=  (filterData.title ? ('&title=' + filterData.title) : '') +
  //            (filterData.tags ? ('&tags=' + filterData.tags) : '') +
    //          (filterData.university_id ? ('&university_id=' + filterData.university_id) : '') +
              //(filterData.country_id ? ('&country_id=' + filterData.country_id) : '') 
    //}
    this.challengeService.getChallenge(url).subscribe((res: any) => {
        this.loading = false;
        if (res.status === 0) {
          return false;
        }
        if(res.status){
          this.rows = res.result.data;
          this.data.count = res.result.count;
          this.data.currentPage = res.result.currentPage;
          // this.setPage(this.page);
          //this.pager = this.pagerService.getPager(this.data.count, pageNo, this.limit);
        }
     },
      (error) => {        
        this.appComponent.showError(error);
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
}
