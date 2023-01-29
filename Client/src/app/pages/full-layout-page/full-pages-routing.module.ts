import { SucursalProductosComponent } from './sucursal-productos/sucursal-productos.component';
import { SucursalTurnosComponent } from './sucursal-turnos/sucursal-turnos.component';
import { SaborCategoriaComponent } from './sabor-categoria/sabor-categoria.component';
import { UserNewComponent } from './user-new/user-new.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullLayoutPageComponent } from 'app/pages/full-layout-page/full-layout-page.component';
import { AuthGuard } from 'app/shared/auth/auth-guard.service';
import { IndexComponent } from './index/index.component';
import { UserListComponent } from './user-list/user-list.component';
import { SaborListComponent } from './sabor-list/sabor-list.component';
import { SaborNewComponent } from './sabor-new/sabor-new.component';
import { PresentacionListComponent } from './presentacion-list/presentacion-list.component';
import { PresentacionNewComponent } from './presentacion-new/presentacion-new.component';
import { SucursalListComponent } from './sucursal-list/sucursal-list.component';
import { SucursalNewComponent } from './sucursal-new/sucursal-new.component';
import { ProductoListComponent } from './producto-list/producto-list.component';
import { ProductoNewComponent } from './producto-new/producto-new.component';
import { MisDatosComponent } from './mis-datos/mis-datos.component';
import { MisProductosComponent } from './mis-productos/mis-productos.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MisTurnosComponent } from './mis-turnos/mis-turnos.component';
import { ContactoComponent } from './contacto/contacto.component';
import { MisMensajesComponent } from './mis-mensajes/mis-mensajes.component';
import { ContactosNuevosComponent } from './contactos-nuevos/contactos-nuevos.component';
import { MisMensajesNuevosComponent } from './mis-mensajes-nuevos/mis-mensajes-nuevos.component';
import { PromocionListComponent } from './promocion-list/promocion-list.component';
import { PromocionNewComponent } from './promocion-new/promocion-new.component';
import { NovedadListComponent } from './novedad-list/novedad-list.component';
import { NovedadNewComponent } from './novedad-new/novedad-new.component';
import { ArticulocanjeableListComponent } from './articulocanjeable-list/articulocanjeable-list.component';
import { ArticulocanjeableNewComponent } from './articulocanjeable-new/articulocanjeable-new.component';
import { UsuarioappListComponent } from './usuarioapp-list/usuarioapp-list.component';


const routes: Routes = [
  {
    path: '',
    component: FullLayoutPageComponent,
    data: {
      title: 'admin'
    },
  },
  // { path: 'admin', component: CompaniesToReviewComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: IndexComponent },
  { path: 'usuarios-list', component: UserListComponent },
  { path: 'usuarios-new', component: UserNewComponent },
  { path: 'usuarios-new/:id', component: UserNewComponent },
  { path: 'productos-list', component: ProductoListComponent },
  { path: 'productos-new', component: ProductoNewComponent },
  { path: 'producto-edit/:id', component: ProductoNewComponent },
  { path: 'sabores-list', component: SaborListComponent },
  { path: 'sabores-new', component: SaborNewComponent },
  { path: 'sabor-edit/:id', component: SaborNewComponent },
  { path: 'sabores-categorias', component: SaborCategoriaComponent },
  { path: 'presentaciones-list', component: PresentacionListComponent },
  { path: 'presentaciones-new', component: PresentacionNewComponent },
  { path: 'presentacion-edit/:id', component: PresentacionNewComponent },
  { path: 'sucursales-list', component: SucursalListComponent },
  { path: 'sucursales-new', component: SucursalNewComponent },
  { path: 'sucursales-new/:id', component: SucursalNewComponent },
  { path: 'sucursal-productos/:id', component: SucursalProductosComponent },
  { path: 'sucursal-turnos/:id', component: SucursalTurnosComponent },
  { path: 'mis-datos', component: MisDatosComponent },
  { path: 'mis-productos', component: MisProductosComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'mis-turnos', component: MisTurnosComponent },
  { path: 'mis-mensajes', component: MisMensajesComponent },
  { path: 'contacto-list', component: ContactoComponent },
  { path: 'contactos-nuevos', component: ContactosNuevosComponent },
  { path: 'mis-mensajes-nuevos', component: MisMensajesNuevosComponent },
  { path: 'promociones-list', component: PromocionListComponent },
  { path: 'promociones-new', component: PromocionNewComponent },
  { path: 'promocion-edit/:id', component: PromocionNewComponent },
  { path: 'novedades-list', component: NovedadListComponent },
  { path: 'novedades-new', component: NovedadNewComponent },
  { path: 'novedad-edit/:id', component: NovedadNewComponent },
  { path: 'articuloscanjeables-list', component: ArticulocanjeableListComponent },
  { path: 'articulocanjeable-edit/:id', component: ArticulocanjeableNewComponent },
  { path: 'articuloscanjeables-new', component: ArticulocanjeableNewComponent },
  { path: 'usuariosapp-list', component: UsuarioappListComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FullPagesRoutingModule { }
