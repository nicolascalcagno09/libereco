import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FooterRepeatComponent } from './footer-repeat.component';

const routes: Routes = [
  {
    path: '',
    component: FooterRepeatComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FooterRepeatRoutingModule { }
