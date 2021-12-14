import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistorialModulosComponent } from './view/historial-modulos/historial-modulos.component';
import { RecursosModule } from '../recursos/recursos.module';


@NgModule({
  declarations: [
    HistorialModulosComponent
  ],
  imports: [
    CommonModule,
    RecursosModule
  ],
  exports: [
    HistorialModulosComponent
  ]
})
export class HistorialModulosModule { }
