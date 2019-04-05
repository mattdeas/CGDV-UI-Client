import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VisualService } from '../../../services/visual.service';
import { AppComponent } from '../../../app.component';
import { environment } from '../../../../environments/environment';
import { CommonService } from '../../../services/common.service';


@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
  baseUrl = environment.baseUrl;
  vizId;
  comments;
  commentscount;
  isVisible = true;
  commentText ="";
  commentId = -1;
  user: any;
  user_id: any;
  addsave = "Add";
  vc: VisualComment;
    hideShowText = 'Hide';
  loggedin;
  constructor(private route: ActivatedRoute,
              public visualService: VisualService,
              private commonService: CommonService,
              public appComponent: AppComponent) { }

  ngOnInit() {
        //const id = this.route.snapshot.params['id'];
    
    this.route.queryParams.subscribe(params => {
      this.vizId = params['id'];
      this.getVisualComments();
      this.user = this.commonService.getLoginUser();
      this.user_id  = this.user.id
      
    });
    console.log(this.user_id);
    this.loggedin =  localStorage.getItem('isLoggedIn')
    console.log(this.loggedin);
  }

  getVisualComments(){
    var url = '?viz_id='+this.vizId;    
    this.visualService.getVisualComments(url).subscribe((res: any) => {
        
        this.commentscount = res.result.data.length;
        console.log("commentscount");
        console.log(this.commentscount);
        if (res.status === 0) {
          return false;
        }
        if(res.status){
          this.comments = res.result.data;
        }
     },
      (error) => {        
        this.appComponent.showError(error);
      });
  }

  setVisibility() {
    this.isVisible = !this.isVisible;
    this.hideShowText = this.isVisible ? 'Hide' : 'Show';
  }

  AddEditComment() {
      //Send Comment to DB
    
    this.vc = new VisualComment();
    this.vc.commentText = this.commentText;
      this.user = this.commonService.getLoginUser();
    this.vc.user_id  = this.user.id
    this.vc.vizid = this.vizId;
    
    //To be implemented later
    this.vc.replytocommentid = 0;

    if(this.commentId > 0) // Add
    {
      this.vc.id = this.commentId;
    }
    else{
      this.vc.id = -1;
    }
    this.addsave = "Add";
    if(this.commentId == -1)
    {
      console.log('in add');
      
      this.visualService.addVisualComments(this.vc).subscribe((res: any) => {
        if(res.status){
          this.appComponent.showSuccess(res.message);
          //$("#myModal").modal('hide');
          this.commentText = "";
          this.commentId = -1;
          this.ngOnInit();
        }else{
          this.appComponent.showError(res.message);
        }
      },
      (error) => {        
        this.appComponent.showError(error);
      });
    }
    else
    {
      console.log('in update');
    this.visualService.updateVisualComments(this.commentId, this.vc).subscribe((res: any) => {
        if(res.status){
          this.appComponent.showSuccess(res.message);
          //$("#myModal").modal('hide');
          this.commentText = "";
          this.commentId = -1;
          this.ngOnInit();
        }else{
          this.appComponent.showError(res.message);
        }
      },
      (error) => {        
        this.appComponent.showError(error);
      });
    }
      
  }
  setEditTextComment(id, comment)
  {
    this.commentText = comment;
    this.commentId = id;
    this.addsave = "Save";
  }

  delComment (id) {
    //Send Comment to DB

    this.visualService.deleteVisualComments(id).subscribe((res: any) => {
      if(res.status){
        this.appComponent.showSuccess(res.message);
        //$("#myModal").modal('hide');
        this.commentText = "";
        this.commentId = -1;
        this.ngOnInit();
      }else{
        this.appComponent.showError(res.message);
      }
    },
    (error) => {        
      this.appComponent.showError(error);
    });
  this.ngOnInit();
}
  

  //<li><a href="javascript:void(0)" (click)="edit(item)"><i class="fa fa-pencil" ></i></a></li>
  //<li><a href="javascript:void(0)" (click)="delete(item?.id,item?.user_id)" ><i class="fa fa-trash" aria-hidden="true"></i></a></li>
}
export class VisualComment{
    // id: number;
    commentText: string;
    id: number;
    vizid: number;
    user_id: number;
    replytocommentid: number;
}