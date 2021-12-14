import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecursosModule } from 'src/app/recursos/recursos.module';
import { GestionModuloComponent } from '../gestion-modulo/views/gestion-modulo/gestion-modulo.component';
import { MenuInicioComponent } from './view/menu-inicio/menu-inicio.component';


  @NgModule({
    imports: [
        RouterModule,
    ],
    exports: [RouterModule]
  })


export class MenuinicioRoutingModule { }