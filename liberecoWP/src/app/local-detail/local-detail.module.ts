import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocalDetailRoutingModule } from './local-detail-routing.module';
import { LocalDetailComponent } from './local-detail.component';
import { FooterRepeatComponent } from '../footer-repeat/footer-repeat.component';
import { FooterComponent } from '../footer/footer.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { FooterRepeatModule } from '../footer-repeat/footer-repeat.module';
import { FooterModule } from '../footer/footer.module';


@NgModule({
  declarations: [
    LocalDetailComponent
  ],
  imports: [
    CommonModule,
    LocalDetailRoutingModule,
    MatExpansionModule,
    FooterRepeatModule,
    FooterModule
  ]
})
export class LocalDetailModule { }
