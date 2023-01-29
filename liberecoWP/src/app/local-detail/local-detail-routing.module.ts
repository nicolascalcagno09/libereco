import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocalDetailComponent } from './local-detail.component';

const routes: Routes = [
  {
    path: '',
    component: LocalDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocalDetailRoutingModule { }
