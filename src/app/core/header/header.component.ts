import { Component, EventEmitter, Output, Input } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor( public global: GlobalService,public router: Router) {

  }

  ngAfterViewInit() {
        this.doJqueryLoad();         
    }

    // You don't need to use document.ready... 
    doJqueryLoad() {
	 //    $.HSCore.components.HSHeader.init($('#js-header'));
	 //    $.HSCore.helpers.HSHamburgers.init('.hamburger');

	 //    // initialization of HSMegaMenu component
	 //    $('.js-mega-menu').HSMegaMenu({
	 //      event: 'hover',
	 //      pageContainer: $('.container'),
	 //      breakpoint: 991
	 //    });

	 //    $(window).on('resize', function() {
		//     setTimeout(function() {
		//       $.HSCore.components.HSTabs.init('[role="tablist"]');
		//     }, 200);
		// });
    }

}
