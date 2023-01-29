import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { LegalesComponent } from './legales.component';
import { FooterRepeatComponent } from '../footer-repeat/footer-repeat.component';
import { FooterComponent } from '../footer/footer.component';
import { FooterRepeatModule } from '../footer-repeat/footer-repeat.module';
import { FooterModule } from '../footer/footer.module';
import { LegalesRoutingModule } from './legales-routing.module';


@NgModule({
  declarations: [
    LegalesComponent
  ],
  imports: [
    CommonModule,
    LegalesRoutingModule,
    FooterRepeatModule,
    FooterModule
  ]
})
export class LegalesModule { }
