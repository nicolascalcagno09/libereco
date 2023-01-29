import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaboresComponent } from './sabores.component';

const routes: Routes = [
  {
    path: '',
    component: SaboresComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaboresRoutingModule { }
