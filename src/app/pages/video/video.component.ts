import { Router } from '@angular/router';
import { Component, AfterViewInit } from '@angular/core';
import { VideoService} from '../../services/video.service';
import { PagerService } from '../../services/pager.serrvice';
import { AppComponent } from '../../app.component';
declare var $: any;

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html'
})

export class VideoComponent {
  videoList= [];
   rows = [];
  data: any = {
    count: 0,
    currentPage: 0
  };
  curPage = this.data.currentPage;
  applyFilter = false;
  applySorting = false;
  sortingData: any = {prop: '', dir: ''};
  sorts: any[] = [];
  loading;
  limit = 15;
  
  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];
  page = 1;
  constructor(public router: Router,
              public videoService: VideoService,
              private pagerService: PagerService,
              public appComponent: AppComponent
              ) {
  } 
  ngOnInit(){
    this.getVideoList(1, '', '', this.applyFilter, this.applySorting);
  }
  getVideoList(pageNo: number, filterData: any, sortingData: any, applyFilter: boolean, applySorting: boolean){
    this.loading = true;
    let url = '?recordPerPage='+this.limit+'&page=' + pageNo;    
    if (applySorting === true && sortingData) {
      if (sortingData.sorts && sortingData.sorts[0]) {
        this.sortingData.prop = sortingData.sorts[0].prop;
        this.sortingData.dir = sortingData.sorts[0].dir;
      }
      url +=  '&orderby=' + this.sortingData.prop || 'seq_no' +
              '&orderbydirection=' + this.sortingData.dir || 'ASC';
    }else{
      url +=  '&orderby=' +  'seq_no' +
              '&orderbydirection=' +  'ASC';
    }
    if (applyFilter === true && filterData) {

      url +=  (filterData.title ? ('&title=' + filterData.title) : '') +
              (filterData.author ? ('&author=' + filterData.author) : '') +
              (filterData.tags ? ('&tags=' + filterData.tags) : '') 
    }
    this.videoService.getVideo(url).subscribe((res: any) => {
        this.loading = false;
        if (res.status === 0) {
          return false;
        }
        if(res.status){
          this.rows = res.result.data;
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
  
  ngAfterViewInit() {
      this.doJqueryLoad();     
  }

  // You don't need to use document.ready... 
  doJqueryLoad() {
     //$( "#js-header" ).addClass("bg-over-hdr");
     $( "#js-header" ).removeClass("bg-over-hdr");
     $( "#js-header" ).removeClass("sticky");     
  }
  
}
