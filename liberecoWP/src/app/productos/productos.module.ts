import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { ProductosComponent } from './productos.component';
import { FooterRepeatComponent } from '../footer-repeat/footer-repeat.component';
import { FooterComponent } from '../footer/footer.component';
import { FooterRepeatModule } from '../footer-repeat/footer-repeat.module';
import { FooterModule } from '../footer/footer.module';


@NgModule({
  declarations: [
    ProductosComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    FooterRepeatModule,
    FooterModule
  ]
})
export class ProductosModule { }
