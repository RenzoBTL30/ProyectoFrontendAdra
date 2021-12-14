import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageModuloAsesorComponent } from './presentation/pages/page-modulo-asesor/page-modulo-asesor.component';
import { ModuloAsesorComponent } from './presentation/views/modulo-asesor/modulo-asesor.component';
import { TablaPedidoOracionComponent } from './presentation/views/tabla-pedido-oracion/tabla-pedido-oracion.component';
import { RecursosModule } from '../recursos/recursos.module';
import { ModuloasesorRoutingModule } from './modulo-asesor-routing.module';


@NgModule({
  declarations: [
    PageModuloAsesorComponent,
    ModuloAsesorComponent,
    TablaPedidoOracionComponent,
    
  ],
  imports: [
    CommonModule,
    RecursosModule,
    ModuloasesorRoutingModule,
  ],
  exports: [
    PageModuloAsesorComponent
  ]
})
export class ModuloAsesorModule { }
