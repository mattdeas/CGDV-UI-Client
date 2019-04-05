import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { AboutComponent } from './about/about.component';
import { PartnerComponent } from './partner/partner.component';
import { VizOfDayComponent } from './viz-of-day/viz-of-day.component';
import { VizLibComponent } from './viz-lib/viz-lib.component';
import { VideoComponent } from './video/video.component';
import { VisualComponent } from './visual/visual.component';
import { VizChallengeComponent} from './viz-challenge/viz-challenge.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AuthGuard } from '../authguard';
import { BioComponent } from './bio/bio.component';
import { GuidelinesComponent } from './guidelines/guidelines.component';

export const PagesRoutes: Routes = [
{
  path: '',
  component: DashboardComponent,
  data: {
    heading: 'Home'
  }
},
{
      path: 'my-visual',
      canActivate: [AuthGuard],
      loadChildren: './my-visual/my-visual.module#MyVisualModule',
},
{
  path: 'profile',
  canActivate: [AuthGuard],
  component: ProfileComponent,
  data: {
    heading: 'Profile'
  }
},
{
  path: 'about',
  component: AboutComponent,
  data: {
    heading: 'About'
  }
},
{
  path: 'partner',
  component: PartnerComponent,
  data: {
    heading: 'Our Partner'
  }
},
{
  path: 'viz-of-day',
  component: VizOfDayComponent,
  data: {
    heading: 'Viz Of Day'
  }
},
{
  path: 'viz-lib',
  component: VizLibComponent,
  data: {
    heading: 'Viz Library'
  }
},
{
  path: 'viz-challenge',
  component: VizChallengeComponent,
  data: {
    heading: 'Viz Challenge'
  }
},
{
  path: 'visual',
  component: VisualComponent,
  data: {
    heading: 'Visual'
  }
},
{
  path: 'guidelines',
  component: GuidelinesComponent,
  data: {
    heading: 'Guidelines'
  }
},
{
  path: 'video',
  component: VideoComponent,
  data: {
    heading: 'Video'
  }
},
{
  path: 'bio/:id',
  component: BioComponent,
  data: {
    heading: 'Bio'
  }
},
{
  path: 'changePassword',
  component: ChangePasswordComponent,
  data: {
    heading: 'Change Password'
  }
}
];
