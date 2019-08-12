import { Router, ActivatedRoute} from '@angular/router';
import { Component, AfterViewInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { VisualService} from '../../services/visual.service';
import { AppComponent } from '../../app.component';
import { CommentListComponent } from '../comment/comment-list/comment-list.component';

declare var $: any;
@Component({
  selector: 'app-visualpreview',
  templateUrl: './visualpreview.component.html'
})

export class VisualPreviewComponent {
  baseUrl = environment.baseUrl;
  featuredList = [];
  visual;
  vizId;
  embed_code;
  comments;
  description;
  avatar;
  script
  html;
  constructor(public router: Router,
              public route: ActivatedRoute,
             public visualService: VisualService,
              public appComponent: AppComponent
             ) {
  }
  
  ngOnInit(){
    console.log(this.route.queryParams);
    this.route.queryParams.subscribe(params => {
      
      console.log(params);
      this.embed_code = decodeURIComponent(params['embed']);
      console.log(this.embed_code);
      this.comments = params['comment'];
      this.description = params['description'];
      this.avatar = params['avatar'];
      if(this.description == 'undefined' || this.description == 'null')
        this.description = "";
      
      if(this.embed_code != 'null' && this.embed_code != 'undefined'){            
          this.script = this.embed_code.match(/<script.*?>([\s\S]*?)<\/script>/gmi) ? this.embed_code.match(/<script.*?>([\s\S]*?)<\/script>/gmi)[0]: '';
          this.html = this.embed_code.replace(this.script,'');
          setTimeout(()=>{
            this.load();            
          },500)
       }
    });
    

  }

  getVisual(){
    // var url = '?viz_id='+this.vizId;    
    // this.visualService.getVisual(url).subscribe((res: any) => {
    //     if (res.status === 0) {
    //       return false;
    //     }
    //     if(res.status){
          
    //       this.visual = res.result.data[0];
    //       if(this.visual && this.visual.embed_code){            
    //         this.visual.script = this.visual.embed_code.match(/<script.*?>([\s\S]*?)<\/script>/gmi) ? this.visual.embed_code.match(/<script.*?>([\s\S]*?)<\/script>/gmi)[0]: '';
    //         this.visual.html = this.visual.embed_code.replace(this.visual.script,'');
    //         setTimeout(()=>{
    //           this.load();            
    //         },500)
    //       }
    //     }
    //  },
    //   (error) => {        
    //     this.appComponent.showError(error);
    //   });
  }

  ngAfterViewInit() {
        this.doJqueryLoad();     
    }

    // You don't need to use document.ready... 
    doJqueryLoad() {
        $( "#js-header" ).removeClass("bg-over-hdr");
        $( "#js-header" ).removeClass("sticky");  
        
    }
    load(){
      //var divElement = $('.tableauPlaceholder');                             
      //var vizElement = $('object')[0];
      //divElement.style.width = '100%';
      //divElement.style.height = '100%';
      //vizElement.style.width = '100%';
      //vizElement.style.height = '100%';
     // vizElement.style.maxWidth = '1050px';
     // vizElement.style.height = ((divElement.offsetWidth || 1110) * 0.75) + 'px';
     // vizElement.style.maxHeight = '2000px';
      //var scriptElement = document.createElement('script');
      //scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
     //scriptElement.src = '';
      //vizElement.parentNode.insertBefore(scriptElement, vizElement);
      var divElement = $('.tableauPlaceholder');                             
      var vizElement = $('object')[0];
      if(vizElement)
      {
        vizElement.style.width = '100%';
        vizElement.style.maxWidth = '1050px';
        vizElement.style.height = ((divElement.offsetWidth || 1110) * 0.75) + 'px';
      //vizElement.style.height = '100%';
      //vizElement.style.maxHeight = '887px';
      //vizElement.style.marginLeft = '4%';
        var scriptElement = document.createElement('script');
        scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
        vizElement.parentNode.insertBefore(scriptElement, vizElement);
      }
    }
}
