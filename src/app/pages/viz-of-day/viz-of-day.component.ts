import { Router } from '@angular/router';
import { Component, AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-viz-of-day',
  templateUrl: './viz-of-day.component.html'
})

export class VizOfDayComponent {
  constructor(public router: Router) {
  }  	
}
