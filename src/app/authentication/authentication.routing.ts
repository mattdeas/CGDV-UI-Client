import { Routes } from '@angular/router';

import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ResetComponent } from './reset/reset.component';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'signin',
      component: SigninComponent,
      data: {
        heading: 'Signin'
      }
    }, {
      path: 'signup',
      component: SignupComponent,
      data: {
        heading: 'Signup'
      }
    }, {
      path: 'forgot',
      component: ForgotComponent,
      data: {
        heading: 'Forgot Password'
      }
    }, {
      path: 'reset',
      component: ResetComponent,
      data: {
        heading: 'Reset Password'
      }
    }]
  }
];

