import { Component, EventEmitter, Output, Input } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
	public innerWidth: any;
  constructor( public global: GlobalService,public router: Router,private _sanitizer: DomSanitizer) {

	}
	showHideMenu = false;

	ngOnInit(){
		this.innerWidth = window.innerWidth;
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
		hideMenu()
		{
				this.showHideMenu = !this.showHideMenu;
				console.log(this.showHideMenu);
				//"collapse navbar-collapse align-items-center flex-sm-row g-pt-10 g-pt-5--lg
		}
		getCurrentStyle()
		{
			var style = "display:block;"
			var style2 = "display:none;"

			if(this.showHideMenu)
				return this._sanitizer.bypassSecurityTrustStyle(style);
			else return this._sanitizer.bypassSecurityTrustStyle(style2);
				
		}


}
