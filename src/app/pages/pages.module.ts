import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { AboutComponent } from './about/about.component';
import { PartnerComponent } from './partner/partner.component';
import { VizOfDayComponent } from './viz-of-day/viz-of-day.component';
import { VizLibComponent } from './viz-lib/viz-lib.component';
import { VideoComponent } from './video/video.component';
import { VisualComponent } from './visual/visual.component';
import { VisualPreviewComponent } from './visualpreview/visualpreview.component';
import { VizChallengeComponent } from './viz-challenge/viz-challenge.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PagesRoutes } from './pages.routing';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CustomFormsModule } from 'ngx-custom-validators';
import { SafePipe } from '../services/pipes/safe.pipe';
import { ObjNgFor } from '../services/pipes/objNgFor.pipe';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BioComponent } from './bio/bio.component';
import { CommentListComponent } from './comment/comment-list/comment-list.component';
import { CommentAddComponent } from './comment/comment-add/comment-add.component';
import {MatDividerModule} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import { GuidelinesComponent } from './guidelines/guidelines.component';
import { GuideComponent } from './guide/guide.component';
import {MatChip, MatChipsModule, MatChipList} from '@angular/material/chips';
import {MatIconModule, MatIcon} from '@angular/material/icon';
import { LZStringModule, LZStringService } from 'ng-lz-string';

@NgModule({
  imports: [
  	CommonModule, 
  	FormsModule,
    NgbModule,
  	RouterModule.forChild(PagesRoutes),
    SlickCarouselModule,
    NgxDatatableModule,
    CustomFormsModule,
    MatDividerModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    LZStringModule,
    
  ],
  declarations: [
  	DashboardComponent,
  	ProfileComponent,
  	AboutComponent,
  	PartnerComponent,
  	VizOfDayComponent,
    VizLibComponent,
    VizChallengeComponent,
  	VideoComponent,
    VisualComponent,
    ChangePasswordComponent,
    SafePipe,
    ObjNgFor,
    BioComponent,
    CommentListComponent,
    CommentAddComponent,
    GuidelinesComponent,
    GuideComponent,
    VisualPreviewComponent,
    
    
  ],
  providers: [
    // Specify the service in the providers section
    LZStringService
  ]
})

export class PagesModule {}
