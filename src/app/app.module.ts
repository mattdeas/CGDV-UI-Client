import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS }    from '@angular/common/http';

import { MyHttpInterceptor } from './services/interceptor';


import { AppRoutingModule }     from './app-routing.module';
import { AppComponent }         from './app.component';

import {  HeaderComponent,  
          FooterComponent, 
          AdminLayoutComponent, 
          AuthLayoutComponent,
       } from './core';
import { AuthenticationService, GlobalService, UserService, CommonService, 
  UploadService, VideoService, VisualService, PagerService, CMSService, 
  ChallengeService} from './services';
import { AuthGuard  } from './authguard';

import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import {ToasterModule} from 'angular2-toaster';
import {MatCardModule} from '@angular/material/card';

import {
    SocialLoginModule,
    AuthServiceConfig,
    GoogleLoginProvider,
    FacebookLoginProvider,
} from "angular-6-social-login";
//import { CommentListComponent } from '../app/pages/comment/comment-list/comment-list.component'
import {MatDividerModule} from '@angular/material';





// Configs 
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("2269291319750991")
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("93581005372-bbghhn1i1pndgg05p5rkve7e3iu3v3c7.apps.googleusercontent.com")
        },
      ]
  );
  return config;
}

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'qed-client' }),
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ToasterModule.forRoot(),
    SocialLoginModule,
    MatCardModule
  ],
  declarations: [
    AppComponent,  
    HeaderComponent,  
    FooterComponent, 
    AdminLayoutComponent, 
    AuthLayoutComponent,
    //MatDividerModule
    //CommentListComponent
  ],
  providers: [
    AuthGuard,
    GlobalService,
    UserService, 
    CommonService, 
    UploadService, 
    VideoService, 
    VisualService,
    PagerService,
    CMSService,
    ChallengeService,
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyHttpInterceptor,
      multi: true
    },
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },   
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string) {
    const platform = isPlatformBrowser(platformId) ?
      'in the browser' : 'on the server';
    console.log(`Running ${platform} with appId=${appId}`);
  }
}
