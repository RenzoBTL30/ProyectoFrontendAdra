import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuInicioComponent } from './view/menu-inicio/menu-inicio.component';


@NgModule({
  declarations: [
    MenuInicioComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    MenuInicioComponent
  ]
})
export class MenuInicioModule { }
