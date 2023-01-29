import { SucursalService } from './../../services/sucursal.service';
import { SeoService } from './../../services/seo.service';
import { Component, OnInit } from '@angular/core';
import { Sucursal } from 'src/model/sucursal.model';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogMapaComponent } from '../dialog-mapa/dialog-mapa.component';
import { filter, map } from 'rxjs/operators';
import { mergeMap, delay } from 'rxjs/operators';
import { Meta, Title } from '@angular/platform-browser';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  sucursales: Array<Sucursal> = [];
  fragment: string;
  images = [
    { original: '../../assets/img/slider/r1.png' },
    { original: '../../assets/img/slider/r2.png' },
    { original: '../../assets/img/slider/r3.png' },
    { original: '../../assets/img/slider/r4.png' },
    { original: '../../assets/img/slider/r5.png' }
  ]

  imagesW = [
    { original: '../../assets/img/slider/1.png' },
    { original: '../../assets/img/slider/2.png' },
    { original: '../../assets/img/slider/3.png' },
    { original: '../../assets/img/slider/4.png' },
    { original: '../../assets/img/slider/5.png' }
  ]








  constructor(
    private sucursalService: SucursalService,
    private router: Router,
    public dialog: MatDialog,
    private metaService: Meta,
    private titleService: Title,
    public route: ActivatedRoute
  ) {
    sucursalService.getAllActivasByOrden().then(result => {
      this.sucursales = result.data;
    })
  }

  ngOnInit(): void {
    console.log("url --> " + this.router.url)
    this.metaService.removeTag("name='description'")
    this.metaService.removeTag("property='og:site_name'")
    this.metaService.removeTag("property='og:title'")
    this.metaService.removeTag("property='og:type'")
    this.metaService.removeTag("property='og:url'")
    this.metaService.removeTag("name='og:image'")

    if (this.router.url === '/sucursales') {
      this.titleService.setTitle('Descubre nuestras sucursales - Libereco Helados');
      this.metaService.addTag({ name: 'description', content: "Ingresa para descubrir nuestras sucursales, y conocer sus productos, sabores y precios, como también sus horarios y delivery" });
      this.metaService.addTag({ property: 'og:site_name', content: 'Descubre nuestras sucursales - Libereco Helados' });
      this.metaService.addTag({ property: 'og:title', content: 'Ingresa para descubrir nuestras sucursales, y conocer sus productos, sabores y precios, como también sus horarios y delivery' });
      this.metaService.addTag({ property: 'og:type', content: 'website' });
      this.metaService.addTag({ property: 'og:url', content: 'https://libereco.com.ar/sucursales' });
      this.metaService.addTag({ name: 'og:image', content: 'https://libereco.com.ar/images/imagen-home.png' });
    } else {
      this.titleService.setTitle('Libereco Helados Artesanales');
      this.metaService.addTag({ name: 'description', content: "Todos aman nuestra cremosidad y calidad insuperable - Conoce nuestras sucursales, productos y precios" });
      this.metaService.addTag({ property: 'og:site_name', content: 'Libereco Helados Artesanales' });
      this.metaService.addTag({ property: 'og:title', content: 'Todos aman nuestra cremosidad y calidad insuperable - Conoce nuestras sucursales, productos y precios' });
      this.metaService.addTag({ property: 'og:type', content: 'website' });
      this.metaService.addTag({ property: 'og:url', content: 'https://libereco.com.ar' });
      this.metaService.addTag({ name: 'og:image', content: 'https://libereco.com.ar/images/imagen-home.png' });
    }


  }


  goToDetail(urlAmigable: string) {
    this.router.navigate(['/sucursal/' + urlAmigable])
  }

  goToSabores() {
    this.router.navigate(['/sabores'])
  }

  goToSeParte() {
    this.router.navigate(['/franquicias'])
  }

  openDialog() {

    const dialogRef = this.dialog.open(DialogMapaComponent, {});

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  ngAfterViewInit() {
    this.route.fragment.subscribe(fragment => {
      this.fragment = fragment;
      setTimeout(() => this.scrollToAnchor(), 100);
    });
  }

  scrollToAnchor(): void {
    try {
      if (this.fragment) {
        var elmnt = document.getElementById("locales");
        elmnt.scrollIntoView();
      }
    } catch (e) { }
  }

}
