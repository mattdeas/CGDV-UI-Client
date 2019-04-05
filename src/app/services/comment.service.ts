
import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
const API_URL = environment.baseUrl;

@Injectable()
export class CommentService {

  constructor(private http:HttpClient) {
  }
  
  getComment(querystring): Observable<any> { 
    return this.http.get(API_URL+'api/comment'+querystring);
  }

  addComment(commentData): Observable<any> {
    return this.http.post(API_URL+'api/comment',commentData);
  }

  //updateVisual(viz_id, visualData): Observable<any> {
  //  return this.http.put(API_URL+'api/visual/'+viz_id, visualData);
  //}
  
  deleteComment(viz_id, querystring): Observable<any> {
    return this.http.delete(API_URL+'api/comment/'+viz_id+querystring);
  }

  //featured-visual page  

}
