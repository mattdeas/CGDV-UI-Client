import { Injectable } from '@angular/core';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
@Injectable()
export class ToastService{

  constructor(private toasterService: ToasterService,){
    
  }

  config: ToasterConfig;

  position = 'toast-top-right';
  animationType = 'fade';
  title = 'HI there!';
  content = `I'm cool toaster!`;
  timeout = 5000;
  toastsLimit = 5;
  type = 'default';

  isNewestOnTop = true;
  isHideOnClick = true;
  isDuplicatesPrevented = false;
  isCloseButton = true;  
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
    // this.toastr.info(Message);
  }

  showCustom(Message: any) {
    this.showToast('info','',Message);
  }
  
  showToast(type: string, title: string, body: string) {
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

  clearToasts() {
    this.toasterService.clear();
  }   
}