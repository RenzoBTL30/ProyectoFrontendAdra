import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionSeminarioComponent } from './view/gestion-seminario/gestion-seminario.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GestionSeminarioComponent
  ],
  imports: [
    FormsModule,
    CommonModule
  ],
  exports:[
    GestionSeminarioComponent
  ]
})
export class GestionSeminarioModule { }
