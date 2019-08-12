
import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
const API_URL = environment.baseUrl;

@Injectable()
export class CommonService {
  constructor(private http:HttpClient) {
    // this.userArray = Object.values(this.users);
  }

  getCategoryList(url): Observable<any> {
     return this.http.get(API_URL+'api/category'+url);
  }

  getCountryList(url): Observable<any> {
     return this.http.get(API_URL+'api/country'+url);
  }
  
  getCountryListFORVIZ(url): Observable<any> {
   return this.http.get(API_URL+'api/countryFORVIZ'+url);
  }

  addUniversity(data): Observable<any> {
     return this.http.post(API_URL+'api/university',data);
  }

  getUniversityList(url): Observable<any> {
     return this.http.get(API_URL+'api/university'+url);
  }

  getDashboardStatistics(url): Observable<any> {
   return this.http.get(API_URL+'api/statistics'+url);
  }

  getLoginUser(){
    return  localStorage.getItem('isLoggedIn') && localStorage.getItem('currentUser')  ? JSON.parse(localStorage.getItem('currentUser')) : {};
  }

  getUserList(url): Observable<any> {
   return this.http.get(API_URL+'api/user/listall');
  }
  getChallengeList(url): Observable<any> {
     return this.http.get(API_URL+'api/challengelist');
  }
  getChallengeListAll(url): Observable<any> {
   return this.http.get(API_URL+'api/challengelistall');
   }

   //getUserProfile(id: any) {
   //   return this.http.get(baseUrl + 'api/user/'+id);
   // }
   getIPAddressInfo(ipaddress: any) {
      return this.http.get(API_URL + '/api/userip/'+ipaddress);
   }

}
