import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporteComponent } from './view/reporte/reporte.component';
import { FormsModule } from '@angular/forms';


declare var XLSX: any;

@NgModule({
  declarations: [
    ReporteComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ReporteComponent
  ]
})
export class ReporteModule { }
