
import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
const API_URL = environment.baseUrl;

@Injectable()
export class CMSService {
  constructor(private http:HttpClient) {
    // this.userArray = Object.values(this.users);
  }
  //About - Homepage
  getAboutHomepage(): Observable<any> {
     return this.http.get(API_URL+'api/cms/homepage_about');
  }
  //About - Homepage
  getVideoSection(): Observable<any> {
     return this.http.get(API_URL+'api/cms/homepage_video_section');
  }
  //About - Aboutpage
  getAboutAboutpage(): Observable<any> {
     return this.http.get(API_URL+'api/cms/aboutpage_about');
  }
  //About - Aboutpage

  //News
  getNewsList(url): Observable<any> {
     return this.http.get(API_URL+'api/cms/news'+url);
  }
  //News

  //Partner
  getPartnerList(url): Observable<any> {
     return this.http.get(API_URL+'api/cms/partner'+url);
  }
  //Partner

  //Journey
  getJourneyList(url): Observable<any> {
     return this.http.get(API_URL+'api/cms/journey'+url);
  }
  //Journey

  //Journey
  getTeamList(url): Observable<any> {
     return this.http.get(API_URL+'api/user/inTeam'+url);
  }
  //Journey
  
}