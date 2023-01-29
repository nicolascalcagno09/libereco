import { Component, OnInit } from '@angular/core';
import { Contacto } from 'app/shared/model/contacto.model';
import { ContactoService } from 'app/shared/services/contacto.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageProvider } from 'app/shared/providers/local-storage/local-storage.provider';

@Component({
  selector: 'app-mis-mensajes-nuevos',
  templateUrl: './mis-mensajes-nuevos.component.html',
  styleUrls: ['./mis-mensajes-nuevos.component.scss']
})
export class MisMensajesNuevosComponent implements OnInit {

  calificacionFranquicias: boolean = false;
  informacionFranquicias: boolean = false;
  otros: boolean = false;
  consultaGeneral: boolean = false;
  loadingIndicator: boolean = true;
  reorderable: boolean = true;
  contactosNuevos: Array<Contacto> = [];
  contactoSelect: Contacto = {} as Contacto;
  idSucursal;

  constructor(private contactoService: ContactoService,
    private router: Router,
    private localStorage: LocalStorageProvider,
    private modalService: NgbModal) {

    this.localStorage.get(localStorage.KEYS.USER).then((user: any) => {
      let u = JSON.parse(user);
      this.idSucursal = u.sucursal.id
      this.contactoService.getAllNoLeidosBySucursal(u.sucursal.id).then((data: any) => {
        this.contactosNuevos = data.data;
      });
    });
  }

  ngOnInit(): void {
  }

  async verDetalles(content, row) {
    this.contactoService.getContacto(row.id).then(contacto => {
      this.contactoSelect = contacto.data[0];
      console.log("MOTIVO CONSULTA --> " +this.contactoSelect.motivoConsulta);
    if(this.contactoSelect.motivoConsulta == 'Calificación de franquicia'){
      this.calificacionFranquicias = true;
      this.informacionFranquicias = false;
      this.consultaGeneral = false;
      this.otros = false;
    }
    if(this.contactoSelect.motivoConsulta == 'Información sobre franquicias'){
      this.calificacionFranquicias = false;
      this.informacionFranquicias = true;
      this.consultaGeneral = false;
      this.otros = false;
    }
    if(this.contactoSelect.motivoConsulta == 'Consulta General'){
      this.calificacionFranquicias = false;
      this.informacionFranquicias = false;
      this.consultaGeneral = true;
      this.otros = false;
    }
    if(this.contactoSelect.motivoConsulta == 'Otro'){
      this.calificacionFranquicias = false;
      this.informacionFranquicias = false;
      this.consultaGeneral = false;
      this.otros = true;
    }
    console.log("calificacion --> " + this.calificacionFranquicias)
    console.log("informacionFranquicias --> " + this.informacionFranquicias)
    console.log("consultaGeneral --> " + this.consultaGeneral)
    this.modalService.open(content, { size: 'lg', windowClass: 'dark-modal' });
    });
  }

  goToTodos() {
    this.router.navigate(['/mis-mensajes']);
  }

  onSort(event) {
    console.log(event);
  }

}
