import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidosOracionComponent } from './views/pedidos-oracion/pedidos-oracion.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PedidosOracionComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    PedidosOracionComponent
  ]
})
export class PedidosOracionModule { }
