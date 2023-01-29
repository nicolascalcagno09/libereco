import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeParteRoutingModule } from './se-parte-routing.module';
import { SeParteComponent } from './se-parte.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { FooterRepeatModule } from '../footer-repeat/footer-repeat.module';
import { FooterModule } from '../footer/footer.module';
import { YouTubePlayerModule } from "@angular/youtube-player";

@NgModule({
  declarations: [
    SeParteComponent
    ],
  imports: [
    CommonModule,
    SeParteRoutingModule,
    MatExpansionModule,
    FooterRepeatModule,
    FooterModule,
    YouTubePlayerModule
  ]
})
export class SeParteModule { }
