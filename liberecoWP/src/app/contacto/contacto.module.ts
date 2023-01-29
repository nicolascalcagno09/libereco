import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactoRoutingModule } from './contacto-routing.module';
import { ContactoComponent } from './contacto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterRepeatComponent } from '../footer-repeat/footer-repeat.component';
import { FooterComponent } from '../footer/footer.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FooterRepeatModule } from '../footer-repeat/footer-repeat.module';
import { FooterModule } from '../footer/footer.module';


@NgModule({
  declarations: [
    ContactoComponent
  ],
  imports: [
    CommonModule,
    ContactoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    FooterRepeatModule,
    FooterModule
  ]
})
export class ContactoModule { }
