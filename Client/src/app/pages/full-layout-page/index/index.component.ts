import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageProvider } from 'app/shared/providers/local-storage/local-storage.provider';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  usuario: any
  admin: boolean = false;

  constructor(private router: Router,
    public route: ActivatedRoute,
    private localStorage: LocalStorageProvider,) {

    this.localStorage.get(localStorage.KEYS.USER).then((user: any) => {
      this.usuario = JSON.parse(user);
      console.log("USUARIO-->" + this.usuario.perfil)
      if (this.usuario.perfil === 'Administrador') {
        this.admin = true;
        console.log(this.admin)
      } else {
        this.admin = false;
        console.log(this.admin)
      }
    });
  }

  ngOnInit() {
  }

  goToUsuarios() {
    this.router.navigate(['/usuarios-list'])
  }

  goToProductos() {
    this.router.navigate(['/productos-list'])
  }

  goToSabores() {
    this.router.navigate(['/sabores-list'])
  }

  goToPresentaciones() {
    this.router.navigate(['/presentaciones-list'])
  }

  goToSucursales() {
    this.router.navigate(['/sucursales-list'])
  }

  goToMensajes() {
    this.router.navigate(['/contacto-list'])
  }

  goToMisDatos() {
    this.router.navigate(['/mis-datos'])
  }

  goToMisTurnos() {
    this.router.navigate(['/mis-turnos'])
  }

  goToMisMensajesNuevos() {
    this.router.navigate(['/mis-mensajes'])
  }

  goToMisProductos() {
    this.router.navigate(['/mis-productos'])
  }

  goToPromociones() {
    this.router.navigate(['/promociones-list'])
  }

  goToNovedades() {
    this.router.navigate(['/novedades-list'])
  }

  goToUsuariosApp() {
    this.router.navigate(['/usuariosapp-list'])
  }

  goToArticulosCanjeables() {
    this.router.navigate(['/articuloscanjeables-list'])
  }

}
