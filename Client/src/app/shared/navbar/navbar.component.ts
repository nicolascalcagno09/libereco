import { Component, Output, EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { LayoutService } from '../services/layout.service';
import { ConfigService } from '../services/config.service';
import { AuthenticationService } from '../auth/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactoService } from '../services/contacto.service';
import { Contacto } from '../model/contacto.model';
import swal from 'sweetalert2';
import { NotificacionService } from '../services/notificacion.service';

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit, AfterViewInit {
  currentLang = "en";
  toggleClass = "ft-maximize";
  placement = "bottom-right";
  public isCollapsed = true;
  @Output()
  toggleHideSidebar = new EventEmitter<Object>();

  public config: any = {};
  contactosNuevos: Array<Contacto> = [];
  public consultasNuevasSize: number = 0;

  constructor(
    public translate: TranslateService, 
    private layoutService: LayoutService, 
    private configService:ConfigService,
    private auth: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private contactoService: ContactoService,
    private notificacionService: NotificacionService
    ) {
    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|es|pt|de/) ? browserLang : "en");
    this.contactoService.getAllNoLeidos().then((data: any) => {
      this.contactosNuevos = data.data;
    });
  }

  ngOnInit() {
    this.config = this.configService.templateConf;
  }

  ngAfterViewInit() {
    if(this.config.layout.dir) {
      const dir = this.config.layout.dir;
        if (dir === "rtl") {
          this.placement = "bottom-left";
        } else if (dir === "ltr") {
          this.placement = "bottom-right";
        }
    }
  }


  ChangeLanguage(language: string) {
    this.translate.use(language);
  }

  ToggleClass() {
    if (this.toggleClass === "ft-maximize") {
      this.toggleClass = "ft-minimize";
    } else {
      this.toggleClass = "ft-maximize";
    }
  }

  toggleNotificationSidebar() {
    this.layoutService.emitChange(true);
  }

  toggleSidebar() {
    const appSidebar = document.getElementsByClassName("app-sidebar")[0];
    if (appSidebar.classList.contains("hide-sidebar")) {
      this.toggleHideSidebar.emit(false);
    } else {
      this.toggleHideSidebar.emit(true);
    }
  }

  logout(){
      localStorage.clear();
      this.router.navigate(['/login']);
  }

  goToChangePassword() {
    this.router.navigate(['/change-password']);
  }

  goToContactosNuevos() {
    this.router.navigate(['/contactos-nuevos']);
  }

  notificar(){
    swal.fire({
      title: "Enviar notificación push",
      html:
      '<input id="title" name="title" class="swal2-input" placeholder="Ingrese título">' +
      '<input id="subtitle" class="swal2-input" placeholder="Ingrese descripción">',
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const title = swal.getPopup().querySelector<HTMLInputElement>("#title").value
        const subtitle = swal.getPopup().querySelector<HTMLInputElement>("#subtitle").value
        if (!title || !subtitle) {
          swal.showValidationMessage(`Debe completar título y descripción de la notificación push.`)
        }
        return { title, subtitle}
      }
    }).then((result) => {
        if (result.value) {
            this.sendNotification(result.value.title, result.value.subtitle);
        }
    });
  }

  async sendNotification(titulo, desc) {

    let body = {
      title: titulo,
      body: desc
    }
    await this.notificacionService.sendGeneralPush(body);
  } 
}
