import { Router, ActivatedRoute } from '@angular/router';
import { Component, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html'
})

export class PartnerComponent {
  constructor(
  	public router: Router,
  	public route: ActivatedRoute,
  	private titleService: Title,
  	) {
  		// this.titleService.setTitle( 'QED | ' + this.route.snapshot.data['heading'] );
  } 
}
