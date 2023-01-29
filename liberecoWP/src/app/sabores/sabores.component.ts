import { Component, OnInit } from '@angular/core';
import { TipoSaborService } from 'src/services/tipoSabor.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-sabores',
  templateUrl: './sabores.component.html',
  styleUrls: ['./sabores.component.scss']
})
export class SaboresComponent implements OnInit {

  tipoSabores = []
  constructor(
    private tipoSaborService: TipoSaborService,
    private router: Router,
    private metaService: Meta,
    private titleService: Title,
    public route: ActivatedRoute
  ) {
    this.tipoSaborService.getAllConSaboresActivos().then(result => {
      this.tipoSabores = result.data;
    })
  }

  ngOnInit(): void {
    this.metaService.removeTag("name='description'")
    this.metaService.removeTag("property='og:site_name'")
    this.metaService.removeTag("property='og:title'")
    this.metaService.removeTag("property='og:type'")
    this.metaService.removeTag("property='og:url'")
    this.metaService.removeTag("name='og:image'")

    this.titleService.setTitle('Nuestros Sabores- Libereco Helados');
    this.metaService.addTag({ name: 'description', content: "Mas de 70 sabores para descubrir, conoce el mundo Libereco!, y atrevete a probar algo nuevo" });
    this.metaService.addTag({ property: 'og:site_name', content: 'Nuestros Sabores - Libereco Helados' });
    this.metaService.addTag({ property: 'og:title', content: 'Mas de 70 sabores para descubrir, conoce el mundo Libereco!, y atrevete a probar algo nuevo' });
    this.metaService.addTag({ property: 'og:type', content: 'website' });
    this.metaService.addTag({ property: 'og:url', content: 'https://libereco.com.ar/sabores' });
    this.metaService.addTag({ name: 'og:image', content: 'https://libereco.com.ar/images/imagen-sabores.png' });
  }


  goToHome() {
    this.router.navigate(['/home'], { fragment: 'localesRef' });
  }

}
