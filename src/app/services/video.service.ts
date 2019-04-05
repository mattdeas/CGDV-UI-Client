
import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
const API_URL = environment.baseUrl;

@Injectable()
export class VideoService {

  constructor(private http:HttpClient) {
  }
  
  getVideo(querystring): Observable<any> { 
    return this.http.get(API_URL+'api/video'+querystring);
  } 

  
}
