/*  
 *   Authentication module Api services
 */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/operators';

import { environment } from '../../environments/environment';
const baseUrl = environment.baseUrl;
@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient, private router: Router) {
    
  }
  // api for Login
  loginUser(data: any) {
    return this.http.post(baseUrl + 'api/auth/user/login', data);
  }

  registerUser(data: any) {
    return this.http.post(baseUrl + 'api/auth/user/register', data);
  }

  forgotPassword(data: any) {
    return this.http.post(baseUrl + 'api/password/forgot', data);
  }

  resetPassword(data: any) {
    return this.http.post(baseUrl + 'api/password/reset', data);
  }

  socialSignIn(data: any){
   return this.http.post(baseUrl + 'api/auth/user/socialSignIn', data); 
  }

  logoutUser() {
    return this.http.post(baseUrl + 'api/auth/logout',{});
  }

  checkUserLoginStatus() {
    return this.http.post(baseUrl + 'users/isLogin', '');
  }
}
