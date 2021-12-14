import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnunciosComponent } from './views/anuncios/anuncios.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AnunciosComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    AnunciosComponent
  ]
})
export class AnunciosModule { }
