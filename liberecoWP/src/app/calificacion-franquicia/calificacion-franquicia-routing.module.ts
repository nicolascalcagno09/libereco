import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalificacionFranquiciaComponent } from './calificacion-franquicia.component';

const routes: Routes = [
  {
    path: '',
    component: CalificacionFranquiciaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalificacionFranquiciaRoutingModule { }
