import { Router, ActivatedRoute} from '@angular/router';
import { Component, AfterViewInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { VisualService} from '../../services/visual.service';
import { AppComponent } from '../../app.component';
import { CommentListComponent } from '../comment/comment-list/comment-list.component';

declare var $: any;
@Component({
  selector: 'app-visual',
  templateUrl: './visual.component.html'
})

export class VisualComponent {
  baseUrl = environment.baseUrl;
  featuredList = [];
  visual;
  visUsers;
  vizId;
  comments;
  constructor(public router: Router,
              public route: ActivatedRoute,
             public visualService: VisualService,
              public appComponent: AppComponent) {
  }
  
  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      this.vizId = params['id'];
      this.getVisual();
      this.getVisualUsers();
    });

  }

  getVisualUsers(){
    var url = '?viz_id='+this.vizId;  
    this.visualService.getVisualUser(url).subscribe((res: any) => {
      if (res.status === 0) {
        return false;
      }
      if(res.status){
        console.log('VisualUsers')
        console.log(res);
        this.visUsers = res.result.data[0];
        console.log(this.visUsers);
        //console.log(this.visual.vnumcomments);
        
      }
    },
    (error) => {        
      this.appComponent.showError(error);
    });
  }

  getVisual(){
    var url = '?viz_id='+this.vizId;    
    this.visualService.getVisual(url).subscribe((res: any) => {
        if (res.status === 0) {
          return false;
        }
        if(res.status){
          
          this.visual = res.result.data[0];
          console.log(this.visual.vnumcomments);
          if(this.visual && this.visual.embed_code){            
            this.visual.script = this.visual.embed_code.match(/<script.*?>([\s\S]*?)<\/script>/gmi) ? this.visual.embed_code.match(/<script.*?>([\s\S]*?)<\/script>/gmi)[0]: '';
            this.visual.html = this.visual.embed_code.replace(this.visual.script,'');
            setTimeout(()=>{
              this.load();            
            },500)
          }
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
