import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaboresRoutingModule } from './sabores-routing.module';
import { SaboresComponent } from './sabores.component';
import { FooterRepeatComponent } from '../footer-repeat/footer-repeat.component';
import { FooterComponent } from '../footer/footer.component';
import { FooterRepeatModule } from '../footer-repeat/footer-repeat.module';
import { FooterModule } from '../footer/footer.module';


@NgModule({
  declarations: [
    SaboresComponent
  ],
  imports: [
    CommonModule,
    SaboresRoutingModule,
    FooterRepeatModule,
    FooterModule
  ]
})
export class SaboresModule { }
