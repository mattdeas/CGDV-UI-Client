import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { GlobalService } from '../services/global.service';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs';
import 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    public global: GlobalService,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (localStorage.getItem('currentUser')) {
      this.global.currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : {};
    }
    if (localStorage.getItem('token')) {
      return true;
      // return this.authenticationService.checkUserLoginStatus()
      // .map((response: any) => {
      //   if (response.status === 1) {
      //     return true;
      //   } else {
      //     this.global.logout();
      //     return false;
      //   }
      // });
    } else {  // not logged in so redirect to login page with the return url
      this.global.logout();
      return false;
    }
  }

}
