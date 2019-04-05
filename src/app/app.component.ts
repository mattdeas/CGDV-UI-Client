import {
  Component, OnInit, ElementRef, OnDestroy,
  ViewChild, HostListener,  NgZone, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import 'style-loader!angular2-toaster/toaster.css';

const SMALL_WIDTH_BREAKPOINT = 991;

export interface Options {
  heading?: string;
  removeFooter?: boolean;
  mapHeader?: boolean;
}

import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  private _router: Subscription;

  routeOptions: Options;

  config: ToasterConfig;

  position = 'toast-top-right';
  animationType = 'fade';
  content = `I'm cool toaster!`;
  timeout = 5000;
  toastsLimit = 5;
  type = 'default';

  isNewestOnTop = true;
  isHideOnClick = true;
  isDuplicatesPrevented = false;
  isCloseButton = true;  
  constructor(
    public toasterService: ToasterService,
    private _element: ElementRef,
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title,
    private zone: NgZone
    ){
    this.config = new ToasterConfig({
      positionClass: this.position,
      timeout: this.timeout,
      newestOnTop: this.isNewestOnTop,
      tapToDismiss: this.isHideOnClick,
      preventDuplicates: this.isDuplicatesPrevented,
      animation: this.animationType,
      limit: this.toastsLimit,
    });
  }
  title = 'QED';
  load = false;
  showLoader() {
    this.load = true;
  }

  hideLoader() {
    this.load = false;
  }
  showSuccess(Message: any) {
    this.showToast('success','Success!',Message);
    // this.toastr.success(Message, 'Success!');
  }

  showError(Message: any) {
    this.showToast('error','Oops!',Message);
    // this.toastr.error(Message, 'Oops!');
  }

  showWarning(Message: any) {
    this.showToast('warning','Alert!',Message);
    // this.toastr.warning(Message, 'Alert!');
  }

  showInfo(Message: any) {
    this.showToast('info','',Message);
  }

  showCustom(Message: any) {
    this.showToast('info','',Message);
  }
  
  showToast(type: string, title: string, body: string) {
    console.log('showToast',body)
    this.config = new ToasterConfig({
      positionClass: this.position,
      timeout: this.timeout,
      newestOnTop: this.isNewestOnTop,
      tapToDismiss: this.isHideOnClick,
      preventDuplicates: this.isDuplicatesPrevented,
      animation: this.animationType,
      limit: this.toastsLimit,
    });
    const toast: Toast = {
      type: type,
      title: title,
      body: body,
      timeout: this.timeout,
      showCloseButton: this.isCloseButton,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toasterService.popAsync(toast);
  }

  ngOnInit(): void {
    this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
      // Scroll to top on view load
      this.runOnRouteChange();
    });
  }

  ngAfterViewInit(): void  {
    setTimeout(_ => this.runOnRouteChange());
  }

  ngOnDestroy() {
    this._router.unsubscribe();
  }

  runOnRouteChange(): void {    

    this.route.children.forEach((route: ActivatedRoute) => {
      let activeRoute: ActivatedRoute = route;
      while (activeRoute.firstChild) {
        activeRoute = activeRoute.firstChild;
      }
      this.routeOptions = activeRoute.snapshot.data;
    });

    if (this.routeOptions) {
      if (this.routeOptions.hasOwnProperty('heading')) {
        this.setTitle(this.routeOptions.heading);
      }
    }
  }

  setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle + ' - QED Group LLC');
  }
}