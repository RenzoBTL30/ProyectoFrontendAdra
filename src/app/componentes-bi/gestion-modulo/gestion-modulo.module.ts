import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionModuloRoutingModule } from './gestion-modulo-routing.module';
import { GestionModuloComponent } from './views/gestion-modulo/gestion-modulo.component';
import { GestionSesionComponent } from './views/gestion-sesion/gestion-sesion.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GestionModuloComponent,
    GestionSesionComponent,
  ],
  imports: [
    CommonModule,
    GestionModuloRoutingModule,
    FormsModule,
  ],
  exports: [
    GestionModuloComponent,
    GestionSesionComponent
  ]
})
export class GestionModuloModule { }
