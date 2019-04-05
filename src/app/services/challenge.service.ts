
import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
const API_URL = environment.baseUrl;

@Injectable()
export class ChallengeService {

  constructor(private http:HttpClient) {
  }
  
  getChallenge(querystring): Observable<any> { 
    return this.http.get(API_URL+'api/challenge'+querystring);
  }

  getVisual(querystring): Observable<any> { 
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

}
