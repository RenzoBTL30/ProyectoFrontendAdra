import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeminariosComponent } from './view/seminarios/seminarios.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SeminariosComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    SeminariosComponent
  ]
})
export class SeminariosModule { }
