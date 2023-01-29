import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeParteComponent } from './se-parte.component';

const routes: Routes = [
  {
    path: '',
    component: SeParteComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  
            
  exports: [RouterModule]
})
export class SeParteRoutingModule { }
