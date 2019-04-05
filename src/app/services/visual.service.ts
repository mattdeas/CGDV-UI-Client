
import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
const API_URL = environment.baseUrl;

@Injectable()
export class VisualService {

  constructor(private http:HttpClient) {
  }
  
  getVisualComments(querystring): Observable<any> {
    return this.http.get(API_URL+'api/visual/comment'+querystring);
  }

  updateVisualComments(id, visualComment): Observable<any> {
    return this.http.put(API_URL+'api/visual/comment/'+id, visualComment);
  }

  addVisualComments(visualComment): Observable<any> {
    return this.http.post(API_URL+'api/visual/comment', visualComment);
  }

  deleteVisualComments(id): Observable<any> {
    return this.http.delete(API_URL+'api/visual/comment/'+id);
  }

  getVisual(querystring): Observable<any> { 
    console.log(API_URL+'api/visual'+querystring);
    return this.http.get(API_URL+'api/visual'+querystring);
  }

  addVisual(visualData): Observable<any> {
    return this.http.post(API_URL+'api/visual',visualData);
  }

  updateVisual(viz_id, visualData): Observable<any> {
    return this.http.put(API_URL+'api/visual/'+viz_id, visualData);
  }
  
  deleteVisual(viz_id, querystring): Observable<any> {
    return this.http.delete(API_URL+'api/visual/'+viz_id+querystring);
  }

  //featured-visual page  

  getVizOfDay(querystring): Observable<any> {   
    return this.http.get(API_URL+'api/visual/getVizOfDay'+querystring);
  } 

  upvoteVisual(viz_id): Observable<any> {
    return this.http.put(API_URL+'api/visual/upvote',{'viz_id':viz_id});
  }
}
