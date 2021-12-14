import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalbiComponent } from './view/principalbi/principalbi.component';
import { RecursosModule } from '../recursos/recursos.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    PrincipalbiComponent
  ],
  imports: [
    CommonModule,
    RecursosModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    PrincipalbiComponent
  ]
})
export class PrincipalbiModule { }
