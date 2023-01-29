import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalificacionFranquiciaRoutingModule } from './calificacion-franquicia-routing.module';
import { CalificacionFranquiciaComponent } from './calificacion-franquicia.component';
import { FooterRepeatModule } from '../footer-repeat/footer-repeat.module';
import { FooterRepeatComponent } from '../footer-repeat/footer-repeat.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterModule } from '../footer/footer.module';


@NgModule({
  declarations: [
    CalificacionFranquiciaComponent
  ],
  imports: [
    CommonModule,
    CalificacionFranquiciaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FooterRepeatModule,
    FooterModule
  ]
})
export class CalificacionFranquiciaModule { }
