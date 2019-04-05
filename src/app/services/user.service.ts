import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/operators';

import { environment } from '../../environments/environment';
const baseUrl = environment.baseUrl;
@Injectable()
export class UserService {
  constructor(private http: HttpClient, private router: Router) {
  }
  
  getUserProfile(id: any) {
    return this.http.get(baseUrl + 'api/user/'+id);
  }
  
  updateUser(user_id, userData): Observable<any> {
    return this.http.put(baseUrl+'api/user/'+user_id, userData);
  }

  changePassword(data): Observable<any> {
    return this.http.post(baseUrl+'api/password/change', data);
  }
}
