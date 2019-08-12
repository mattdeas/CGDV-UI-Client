import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { Component, AfterViewInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { VisualService} from '../../services/visual.service';
import { CommonService} from '../../services/common.service';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { AppComponent } from '../../app.component';
import { PagerService } from '../../services/pager.serrvice';
import { GlobalService } from '../../services/global.service';
declare var $: any;

@Component({
  selector: 'app-viz-lib',
  templateUrl: './viz-lib.component.html'
})

export class VizLibComponent {
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
  challenge_id: number;
    // pager object
    pager: any = {};
 
    // paged items
    pagedItems: any[];
    page = 1;
    model:any = {};
    universityList:any = [];
  countryList:any = [];
  challengeList:any = [];
  fromSearch:any = false;
  innerWidth : number;
  
  constructor(public router: Router,
             private route: ActivatedRoute,
             public global: GlobalService,
             public commonService: CommonService,
             public visualService: VisualService,
             private pagerService: PagerService,
             public appComponent: AppComponent,private _sanitizer: DomSanitizer) {
  }
  arrowsClasses="u-arrow-v1 g-pos-abs g-right-0 g-bottom-100x g-width-35 g-width-45--md g-height-35 g-height-45--md g-font-size-18 g-color-gray-light-v1 g-color-white--hover g-bg-primary--hover g-brd-around g-brd-gray-light-v1 g-brd-primary--hover g-rounded-50x g-mb-65 g-transition-0_2 g-transition--ease-in";
  arrowLeftClasses="fa fa-angle-left g-mr-40 g-mr-60--md";
  arrowRightClasses="fa fa-angle-right";
  slideConfig = {
    prevArrow: '<div class="js-prev ' + this.arrowsClasses + ' ' + this.arrowLeftClasses + '"></div>',
    nextArrow: '<div class="js-next ' + this.arrowsClasses + ' ' + this.arrowRightClasses + '"></div>',
  };
  ngOnInit(){
    this.challenge_id = parseInt(this.route.snapshot.queryParamMap.get('challenge_id'));
    
    this.commonService.getCountryListFORVIZ('')
        .subscribe((res: any) => {
          if(res.status){
            this.countryList = res.result.data;
          }
        });
    this.commonService.getUniversityList('')
      .subscribe((res: any) => {
        if(res.status){
          this.universityList = res.result.data;
        }
      },
      (error) => {        
        // this.appcomponent.showError(error);
      });
    this.commonService.getChallengeListAll('')
      .subscribe((res: any) => {
        if(res.status){
          this.challengeList = res.result.data;
        }
      });
    this.getFeaturedList();
    
    this.route.queryParams.subscribe(params => {
      
        this.filterData.title = params['title'];
        this.applyFilter = this.filterData.title ? true : false;
        
        if(this.filterData.title || this.filterData.challenge_id){
          this.fromSearch= true;
        }
        
        if(this.route.snapshot.queryParamMap.get('challenge_id') != null)
        {
          this.filterData.challenge_id = this.route.snapshot.queryParamMap.get('challenge_id');
          this.applyFilter = true;
          
        }

        this.getVisualList(1, this.filterData, '', this.applyFilter, this.applySorting);
    });

    this.innerWidth = window.innerWidth;
    console.log(this.innerWidth);

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

  getVisualList(pageNo: number, filterData: any, sortingData: any, applyFilter: boolean, applySorting: boolean){
    this.loading = true;
    let url = '?recordPerPage='+this.limit+'&page=' + pageNo;    
    
    if (applySorting === true ){//&& sortingData) {
      
      //console.log(sortingData.sorts[0]);

      //if (sortingData.sorts && sortingData.sorts[0]) {
      //  this.sortingData.prop = sortingData.sorts[0].prop;
      //  this.sortingData.dir = sortingData.sorts[0].dir;
      //}
      url +=  '&orderby=' + sortingData;
              //'&orderbydirection=' + this.sortingData.dir;
      
    }
    console.log('filterData',filterData)
    console.log('applyfilter',applyFilter)
    if (applyFilter === true && filterData) {

      url +=  (filterData.title ? ('&title=' + filterData.title) : '') +
              (filterData.tags ? ('&tags=' + filterData.tags) : '') +
              (filterData.university_id ? ('&university_id=' + filterData.university_id) : '') +
              (filterData.country_id ? ('&country_id=' + filterData.country_id) : '')  +
              (filterData.challenge_id ? ('&challenge_id=' + filterData.challenge_id) : '')
              console.log('filterData',filterData)
    }
    this.visualService.getVisual(url).subscribe((res: any) => {
        this.loading = false;
        if (res.status === 0) {
          return false;
        }
        if(res.status){
          this.rows = res.result.data;
          console.log(this.rows);
          this.data.count = res.result.count;
          this.data.currentPage = res.result.currentPage;
          // this.setPage(this.page);
          this.pager = this.pagerService.getPager(this.data.count, pageNo, this.limit);
        }
     },
      (error) => {        
        this.appComponent.showError(error);
      });
  }
  
  upvoteFL(viz){ //Featured List Upvote
      console.log(viz.id);
      this.visualService.upvoteVisual(viz.id).subscribe((res: any) => {
          if (res.status === 0) {
            return false;
          }
          if(res.status){
            viz = res.data[0];
            let i = this.featuredList.findIndex(function(element) {
              
              return viz.id == element.id;

            })
            
            if(i!== -1){
              this.featuredList[i].upvoted = 1;
              this.featuredList[i].upvote = viz.upvote;
            }
          }
       },
        (error) => {        
          this.appComponent.showError(error);
        });
  }


upvote(viz){  //Standard List Upvote
    // if(this.global.isLoggedIn){ 
      this.visualService.upvoteVisual(viz.id).subscribe((res: any) => {
          if (res.status === 0) {
            return false;
          }
          if(res.status){
            viz = res.data[0];
            let i = this.rows.findIndex(function(element) {
              return viz.id == element.id;
            })
            if(i!== -1){
              this.rows[i].upvoted = 1;
              this.rows[i].upvote = viz.upvote;
            }
            console.log('this.rows.findIndex[i]',this.rows)
            // this.getVisualList(this.pager.currentPage, '', '', this.applyFilter, this.applySorting);
          }
       },
        (error) => {        
          this.appComponent.showError(error);
        });
    // }else{
    //   this.appComponent.showError('Please Login to upvote.');
    // }
  }
  ngAfterViewInit() {
        this.doJqueryLoad();     
    }

    // You don't need to use document.ready... 
    doJqueryLoad() {
        $( "#js-header" ).removeClass("bg-over-hdr");
        $( "#js-header" ).removeClass("sticky");        
    }

    getCurrentStyle()
		{
      if(this.innerWidth < 1000)
				return this._sanitizer.bypassSecurityTrustStyle("padding-left:10%;padding-right:10%;width:100%;text-align:center");
      else
        return this._sanitizer.bypassSecurityTrustStyle("width:100%;text-align:center");
		}
}
