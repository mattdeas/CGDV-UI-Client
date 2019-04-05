import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { GlobalService } from './global.service';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
  constructor(public global: GlobalService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('token');
    if (token) {
      req = req.clone({
        setHeaders: { 'x-access-token' : token }
      });
    }
    return next
      .handle(req)
      .map(resp => {
        if (resp instanceof HttpResponse) {
          return resp;
        }
      })
      .catch(err => {
        let errorData: any;
        if (err instanceof HttpErrorResponse) {
          switch (err.status) {
            case 0:
              errorData = this.global.somethingWentWrong;
              break;
            case 400:
              errorData = ' ';                                        // handle Bad request
              if (err.error.error && err.error.error.constructor === Array) {
                err.error.error.map((obj) => {
                  errorData += ' *' + obj.message;
                });
              } else if (err.error.message) {
                errorData = err.error.message;
              } else {
                errorData = this.global.badRequest;
              }
              break;
            case 401:                                           // handle Authentication Error
              errorData = err.error.message || this.global.loginRequired;
              this.global.logout();
              break;
            case 404:                                           // handle not found error
              errorData = this.global.somethingWentWrong;
              break;
            case 500:                                           // handle internal server error
              errorData = this.global.internalServerError;
              break;
            default:                                            // handle other error
              errorData = err.error.message;
              if (!errorData && !err.status) {
                errorData = this.global.somethingWentWrong;
              } else if (!errorData) {
                errorData = err.status + ' ' + err.statusText;
              }
          }
          return Observable.throw(errorData);
        } else {
          return Observable.throw(this.global.somethingWentWrong);
        }
      });
  }
}
