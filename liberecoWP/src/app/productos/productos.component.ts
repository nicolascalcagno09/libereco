import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/services/producto.service';
import { DialogMapaComponent } from '../dialog-mapa/dialog-mapa.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { mergeMap, delay } from 'rxjs/operators';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {


  productos = []

  constructor(
    private productoService: ProductoService,
    private router: Router,
    private metaService: Meta,
    private titleService: Title,
    public route: ActivatedRoute
  ) {

    this.productoService.getProductosActivosByOrdenConPresentacionesActivasByOrden().then(result => {
      this.productos = result.data;
    })

  }

  ngOnInit(): void {
    this.metaService.removeTag("name='description'")
    this.metaService.removeTag("property='og:site_name'")
    this.metaService.removeTag("property='og:title'")
    this.metaService.removeTag("property='og:type'")
    this.metaService.removeTag("property='og:url'")
    this.metaService.removeTag("name='og:image'")

    this.titleService.setTitle('Nuestros Productos - Libereco Helados Artesanales');
    this.metaService.addTag({ name: 'description', content: "Nuestros Productos - Libereco Helados Artesanales" });
    this.metaService.addTag({ property: 'og:site_name', content: 'Conoce la gran variedad de productos que tenemos para vos!' });
    this.metaService.addTag({ property: 'og:title', content: 'Ingresa para conocer nuestros productos, sabores y precios, y también nuestros horarios y delivery' });
    this.metaService.addTag({ property: 'og:type', content: 'website' });
    this.metaService.addTag({ property: 'og:url', content: 'https://libereco.com.ar/productos' });
    this.metaService.addTag({ name: 'og:image', content: 'https://libereco.com.ar/images/imagen-productos.png' });
  }


  goToHome() {
    this.router.navigate(['/home'], { fragment: 'localesRef' });
  }
}
