import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionAnuncioComponent } from './view/gestion-anuncio/gestion-anuncio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    GestionAnuncioComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    GestionAnuncioComponent
  ]
})
export class GestionAnuncioModule { }
