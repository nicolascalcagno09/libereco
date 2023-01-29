import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isCollapsed = true;

  constructor(
    private router: Router

  ) { }

  ngOnInit(): void {

  }

  goToSucursales() {
    setTimeout(() => {
      window.scroll(100, 650);
    }, 100);
    this.router.navigate(['/sucursales'])
  }

  goToProductos() {
    this.isCollapsed = true;
    this.router.navigate(['/productos'])
  }

  goToSabores() {
    this.isCollapsed = true;
    this.router.navigate(['/sabores'])
  }

  goToContacto() {
    this.isCollapsed = true;
    this.router.navigate(['/contacto'])
  }

  goToFranquicias() {
    this.isCollapsed = true;
    this.router.navigate(['/franquicias'])
  }

  goToHome() {
    this.isCollapsed = true;
    this.router.navigate(['/home'])
  }

}
