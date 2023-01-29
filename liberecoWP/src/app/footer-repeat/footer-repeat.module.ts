import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterRepeatRoutingModule } from './footer-repeat-routing.module';
import { FooterRepeatComponent } from './footer-repeat.component';
import { FooterComponent } from '../footer/footer.component';


@NgModule({
  declarations: [
    FooterRepeatComponent
  ],
  imports: [
    CommonModule,
    FooterRepeatRoutingModule,
  ],
  exports: [
    FooterRepeatComponent
  ]
})
export class FooterRepeatModule { }
