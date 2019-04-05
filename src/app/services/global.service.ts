import { Injectable, Input } from '@angular/core';
import { Router } from '@angular/router';
// import { IMyDpOptions } from 'mydatepicker';
import { AuthenticationService } from '../services/authentication.service';
import * as moment from 'moment';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class GlobalService {
    baseUrl: any;
    roles: any = [];
    loginRights: string;
    timeArray: any = [];
    lastVisitedRoute: any;
    isLoggedIn: any = false;
    avatar:any;
    // currentUser: any;
    // currentUser = new Subject();
    // tslint:disable-next-line:max-line-length
    emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;    

    // currentUser = new Subject<any>();
    // getCurrentUser: Observable<any>;
    currentUser:any;
    constructor(
      public router: Router,
      private authenticationService: AuthenticationService,
    ) {
      this.baseUrl = environment.baseUrl;
      this.timeArray = this.getTime();      
      this.isLoggedIn = localStorage.getItem('isLoggedIn');
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.avatar = (this.currentUser && this.currentUser.avatar) ? (this.baseUrl+this.currentUser.avatar) : '';
    }
    
    
    setCurrentUser(data: any) {
        console.log('data',data)
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.currentUser.avatar = data.avatar;
        this.currentUser.firstname = data.firstname;
        this.currentUser.lastname = data.lastname;
        this.currentUser.username = data.firstname+" "+data.lastname;
        localStorage.setItem('currentUser',JSON.stringify(this.currentUser));
        this.avatar = (this.currentUser && this.currentUser.avatar) ? (this.baseUrl+this.currentUser.avatar) : '';
    }
 
    
    
    // All validation strings    
    validationError = 'Validation Error';
    somethingWentWrong = 'Something went wrong';
    internalServerError = 'Internal server error';
    loginRequired = 'Login required';
    badRequest = 'Bad request';
    updateSuccess = 'Updated successfully';
    addedSuccess = 'Added successfully';
    deleteSucc = 'Deleted successfully';
    attachFile = 'Browse a file';

    transformDate(type: any, date: any) {
      let formatedDate;
      if (type === 'ObjectToISO') {
          formatedDate = (date.date.month + '/' + date.date.day + '/' + date.date.year);
      } else {
        const dbBday = moment.utc(date);
         formatedDate = {
          date: {
            year: dbBday.year(),
            month: dbBday.month() + 1,
            day: dbBday.date()
          },
          formatted: (dbBday.month() + 1) + '/' + (dbBday.date()) + '/' + (dbBday.year())
        };
      }
      return formatedDate;
    }

    // logout the user and redirect to signin screen
    logout() {
        
        this.authenticationService.logoutUser().subscribe(
        (response: any) => {
          localStorage.clear();
          this.isLoggedIn = false;
          if (this.router.url !== '/authentication/signin') {
           this.lastVisitedRoute = this.router.url;
          }
          this.router.navigate(['/authentication/signin']);
        },(error: any) => {
        })
    }

    // convert query string to JSON format
    QueryStringToJSON(queryString: string) {
      const pairs = queryString.split('&');
      const result = {};
      pairs.map((pair: any) => {
          pair = pair.split('=');
          result[pair[0]] = decodeURIComponent(pair[1] || '');
      });
      return JSON.parse(JSON.stringify(result));
    }

    // To check the user role
    // return true if user has roleName role
    IsUserInRole(roleName: string) {
      roleName = roleName.toUpperCase();
      if (this.roles.indexOf(roleName) !== -1) {
          return true;
      } else {
          return false;
      }
    }

    IsUserHasRight(rightName: string) {
      if (this.loginRights.toUpperCase() === rightName.toUpperCase()) {
          return true;
      } else {
          return false;
      }
    }

    // generate timeArray from 12:00 AM to 12:00 PM in {id: '',displayValue: ''} array of object format
    getTime() {
      const x = 5; // minutes interval
      const times = []; // time array
      let tt = 0; // start time
      const ap = ['AM', 'PM']; // AM-PM
      // loop to increment the time and push results in array
      for (let i = 0; tt < 24 * 60; i++) {
        const hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
        const mm = (tt % 60); // getting minutes of the hour in 0-55 format
        times.push({id: undefined, displayValue: undefined});
        times[i].id = ('0' + hh).slice(-2) + ('0' + mm).slice(-2);
        times[i].displayValue = ('0' + ((hh % 12 === 0) ? 12 : (hh % 12))).slice(-2) +
        ':' + ('0' + mm).slice(-2) + ' ' + ap[Math.floor(hh / 12)];
        // pushing data in array in [00:00 - 12:00 AM/PM format]
        tt = tt + x;
      }
      return times;
    }

    // return time as "hh:mm a" format according to match the id in timeArray
    formatTime(id: number) {
      const value = this.timeArray.find(o => o.id === id);
      if (value) {
          return value.displayValue;
      }
    }

    // calculate differance between start time and end time
    recalcTotalHours(StartTime, EndTime) {
      let retVal;
      if (!StartTime || !EndTime) {
        return false;
      } else {
        StartTime = parseInt(StartTime, 10);
        EndTime = parseInt(EndTime, 10);
        if (StartTime < EndTime) {
          retVal = EndTime - StartTime;
        } else {
          retVal = (2400 - StartTime) + EndTime;
        }
        retVal = ('00' + retVal).slice(-4);
        if (retVal.slice(-2) === '70' || retVal.slice(-2) === '30') {
          retVal = retVal.slice(2) + '50';
        } else if (retVal.slice(-2) === '15' || retVal.slice(-2) === '55') {
          retVal = retVal.slice(2) + '25';
        } else if (retVal.slice(-2) === '45' || retVal.slice(-2) === '85') {
          retVal = retVal.slice(2) + '75';
        }
        retVal = retVal / 100;
        return retVal;
      }
    }

    // return all year list from startYear to endYear in array format
    getYearArray(startYear: number, endYear: number) {
      const yearArray = [];
      for (let i = startYear; i <= endYear; i++) {
          yearArray.push(i);
      }
      return yearArray;
    }

    // generate blob file url from base 64 file
    b64toBlob(b64Data, contentType, sliceSize = null) {
      contentType = contentType || '';
      sliceSize = sliceSize || 512;
      const byteCharacters = atob(b64Data);
      const byteArrays = [];
      for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }
      const blob = new Blob(byteArrays, {type: contentType});
      return blob;
    }

    // download file of any type
    downloadFile (blobUrl: any, fileName: any) {
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.href = blobUrl;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(blobUrl);
    }

}

