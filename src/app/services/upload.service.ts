
import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
const API_URL = environment.baseUrl;

let counter = 0;

@Injectable()
export class UploadService { 

  constructor(private http:HttpClient) {
    // this.userArray = Object.values(this.users);
  }

  // For upload image
  uploadImage( image: any) {
    console.log(image)
    // let headers = new HttpHeaders({ 'Content-Type': 'multipart/form-data' });    
    // return this.http.post(API_URL + '/common/upload/' , formData, { headers: headers });
    return this.http.post(API_URL + 'api/common/upload/' , {'image':image}, { });
    // return this.http.post(API_URL + 'api/common/upload/' , image, { });
  }

  // For remove image
  removeImage( image: any) {
    return this.http.post(API_URL + 'api/common/removeImage/' , {'image':image});
  }

  
  
}
