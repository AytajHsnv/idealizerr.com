import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEaIntlTelInputComponent } from './ngx-ea-intl-tel-input.component';
import { FormsModule } from '@angular/forms';
import { ClickOutsideModule } from 'ng-click-outside';
//======================================================================
@NgModule({
  declarations: [
    NgxEaIntlTelInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ClickOutsideModule,
  ],
  exports:[
    NgxEaIntlTelInputComponent
  ]
})//======================================================================

export class NgxEaIntlTelInputModule { }

//======================================================================
