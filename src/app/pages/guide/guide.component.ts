import {Directive, ElementRef, Renderer, Component, OnInit } from '@angular/core';
// @Directive({
//   selector: "[iframeAutoHeight]"
// })
//export class IframeAutoHeightDirective implements OnInit {
//   private el: any;
//   private renderer: Renderer;
//   private prevHeight: number;
//   private sameCount: number;
//   private iFrameURL: any;

//   constructor(_elementRef: ElementRef, _renderer: Renderer) {
//       this.el = _elementRef.nativeElement;
//       this.renderer = _renderer;
//   }

//   ngOnInit() {
//       this.iFrameURL = "https://www.centerforglobaldata.org/assets/custom-img/Guide.htm"
//       const self = this;
//       console.log('Here1');
//       if (this.el.tagName === "IFRAME") {
//         console.log('Here2');
//           this.renderer.listen(this.el, "load", () => {
//             console.log('Here3');
//               self.prevHeight = 0;
//               self.sameCount = 0;
//               setTimeout(() => {
//                   self.setHeight();
//                   console.log('Here4');
//               }, 50);
//           });
//       }
//   }

//   setHeight() {
//       const self = this;
//       console.log('Here5');
//       if (this.el.contentWindow.document.body.scrollHeight !== this.prevHeight) {
//         console.log('Here6');
//           this.sameCount = 0;
//           this.prevHeight = this.el.contentWindow.document.body.scrollHeight;
//           this.renderer.setElementStyle(
//               self.el,
//               "height",
//               this.el.contentWindow.document.body.scrollHeight + "px"
//           );
//           setTimeout(() => {
//             console.log('Here7');
//               self.setHeight();
//           }, 50);

//       } else {
//           this.sameCount++;
//           console.log('Here8');
//           if (this.sameCount < 2) {
//               setTimeout(() => {
//                   self.setHeight();
//                   console.log('Here9');
//               }, 50);
//           }
//       }
//   }
// }


@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.css']
})
export class GuideComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  el: HTMLFrameElement;
  onload(ev: Event) {
    this.el = <HTMLFrameElement>ev.srcElement;
  }
}
