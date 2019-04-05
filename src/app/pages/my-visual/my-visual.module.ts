import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common"
import { MyVisualRoutingModule, routedComponents } from './my-visual-routing.module';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
  imports: [
    MyVisualRoutingModule,
    FormsModule,
    NgxDatatableModule,
    CommonModule
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
  ],
})
export class MyVisualModule { }
