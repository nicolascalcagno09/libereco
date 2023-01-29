import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  //{ path: 'home', component: HomeComponent },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'sucursales',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'productos',
    loadChildren: () => import('./productos/productos.module').then(m => m.ProductosModule),
  },
  {
    path: 'sabores',
    loadChildren: () => import('./sabores/sabores.module').then(m => m.SaboresModule),
  },
  {
    path: 'contacto',
    loadChildren: () => import('./contacto/contacto.module').then(m => m.ContactoModule),
  },
  {
    path: 'franquicias',
    loadChildren: () => import('./se-parte/se-parte.module').then(m => m.SeParteModule),
  },
  {
    path: 'calificacion-franquicia',
    loadChildren: () => import('./calificacion-franquicia/calificacion-franquicia.module').then(m => m.CalificacionFranquiciaModule),
  },
  {
    path: 'sucursal/:id',
    loadChildren: () => import('./local-detail/local-detail.module').then(m => m.LocalDetailModule),
  },

  {
    path: 'legales',
    loadChildren: () => import('./legales/legales.module').then(m => m.LegalesModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    { anchorScrolling: 'enabled', relativeLinkResolution: 'legacy' }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
