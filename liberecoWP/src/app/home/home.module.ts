import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { CardLocalComponent } from '../card-local/card-local.component';
import { FooterRepeatComponent } from '../footer-repeat/footer-repeat.component';
import { FooterComponent } from '../footer/footer.component';
import { FooterRepeatModule } from '../footer-repeat/footer-repeat.module';
import { FooterModule } from '../footer/footer.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';



@NgModule({
  declarations: [
    HomeComponent,
    CardLocalComponent
    ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    IvyCarouselModule,
    FooterRepeatModule,
    FooterModule,
    LazyLoadImageModule
  ]
})
export class HomeModule { }
