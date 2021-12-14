import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageMenu1Component } from './presentation/pages/page-menu1/page-menu1.component';
import { Menu1Component } from './presentation/views/menu1/menu1.component';
import { RecursosModule } from '../recursos/recursos.module';
import { ModulosModule } from '../modulos/modulos.module';
import { AnunciosModule } from '../anuncios/anuncios.module';
import { SeminariosModule } from '../seminarios/seminarios.module';
import { HistorialModulosModule } from '../historial-modulos/historial-modulos.module';
import { SeminariosComponent } from '../seminarios/view/seminarios/seminarios.component';
import { SesionesModule } from "../sesiones/sesiones.module";
import { PrincipalModule } from '../principal/principal.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PageMenu1Component,
    Menu1Component,
  ],
  imports: [
    CommonModule,
    ModulosModule,
    RecursosModule,
    AnunciosModule,
    SeminariosModule,
    SesionesModule,
    HistorialModulosModule,
    PrincipalModule,
    FormsModule,
  ],
  exports: [
    PageMenu1Component
  ]
})
export class MenuPrincipal1Module { }
