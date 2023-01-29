import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-se-parte',
  templateUrl: './se-parte.component.html',
  styleUrls: ['./se-parte.component.scss']
})
export class SeParteComponent implements OnInit {

  constructor(private router: Router,
    private metaService: Meta,
    private titleService: Title,) {

  }

  ngOnInit(): void {
    setTimeout(() => {
      window.scroll(0, 0);
    }, 100);
    this.metaService.removeTag("name='description'")
    this.metaService.removeTag("property='og:site_name'")
    this.metaService.removeTag("property='og:title'")
    this.metaService.removeTag("property='og:type'")
    this.metaService.removeTag("property='og:url'")
    this.metaService.removeTag("name='og:image'")

    this.titleService.setTitle('Franquicias - Se parte de nuestra familia - Libereco Helados');
    this.metaService.addTag({ name: 'description', content: "Sé parte de nuestra familia de franquicias de Heladerías Libereco - Conoce un negocio con amplio crecimiento personal y estabilidad economica" });
    this.metaService.addTag({ property: 'og:site_name', content: 'Franquicias - Libereco Helados' });
    this.metaService.addTag({ property: 'og:title', content: 'Sé parte de nuestra familia de franquicias de Heladerías Libereco - Conoce un negocio con amplio crecimiento personal y estabilidad economica' });
    this.metaService.addTag({ property: 'og:type', content: 'website' });
    this.metaService.addTag({ property: 'og:url', content: 'https://libereco.com.ar/franquicias' });
    this.metaService.addTag({ name: 'og:image', content: 'https://libereco.com.ar/assets/img/slider/1.jpg' });

  }


  goToFormulario(seParte: boolean) {
    const param = seParte;
    this.router.navigate(['/contacto', { franquicia: param }]);
  }
}
