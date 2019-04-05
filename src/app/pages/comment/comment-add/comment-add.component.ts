import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
//import {UserService} from '../../user/shared/user.service';
//import {Errors} from '../../core/interfaces/errors';
//import {Comment} from '../shared/comment';
//import * as moment from 'moment';
//import {User} from '../../user/shared/user';

@Component({
  selector: 'app-comment-add',
  templateUrl: './comment-add.component.html',
  styleUrls: ['./comment-add.component.css']
})
export class CommentAddComponent implements OnInit {
  commentControl = new FormControl('', [Validators.required]);
  commentForm: FormGroup;
  //currentUser: User;

  constructor() { }

  ngOnInit() {
  //   this.userService.currentUser.subscribe(currentUser => {
  //     this.currentUser = currentUser;
  // });
  // this.commentForm = new FormGroup({'comment': this.commentControl});
  }

  addComment() {
    // this.commentControl.markAsTouched({onlySelf: true});
    // const comment = this.commentForm.value.comment;
    // if (!comment) {
    //     return;
    // }
    // const newComment = {
    //     author: this.currentUser,
    //     description: comment,
    //     createdAt: moment().format('YYYY-MM-DD HH:mm:ss').toString()
    // };
    // this.comments.push(newComment);
    // this.commentControl.patchValue('');
    // this.commentControl.markAsUntouched({onlySelf: true});

}

}
