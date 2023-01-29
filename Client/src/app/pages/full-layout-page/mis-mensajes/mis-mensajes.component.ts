import { Component, OnInit } from '@angular/core';
import { Contacto } from 'app/shared/model/contacto.model';
import { ContactoService } from 'app/shared/services/contacto.service';
import { Router } from '@angular/router';
import { Angular2CsvModule } from 'angular2-csv';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import { LocalStorageProvider } from 'app/shared/providers/local-storage/local-storage.provider';

@Component({
  selector: 'app-mis-mensajes',
  templateUrl: './mis-mensajes.component.html',
  styleUrls: ['./mis-mensajes.component.scss']
})
export class MisMensajesComponent implements OnInit {

  calificacionFranquicias: boolean = false;
  informacionFranquicias: boolean = false;
  otros: boolean = false;
  consultaGeneral: boolean = false;
  loadingIndicator: boolean = true;
  idSucursal;
  reorderable: boolean = true;
  contactos: Array<Contacto> = [];
  contactoSelect: Contacto = {} as Contacto;
  contactosNuevos: Array<Contacto> = [];
  contactosLeidos: Array<Contacto> = [];
  contactosDestacados: Array<Contacto> = [];
  filteredDataNuevos: Array<Contacto> = [];
  filteredDataLeidos: Array<Contacto> = [];
  filteredDataDestacados: Array<Contacto> = [];
  columnsWithSearch: string[] = [];

  constructor(private contactoService: ContactoService,
    private router: Router,
    private localStorage: LocalStorageProvider,
    private modalService: NgbModal,) {

    this.localStorage.get(localStorage.KEYS.USER).then((user: any) => {
      let u = JSON.parse(user);
      this.idSucursal = u.sucursal.id
      console.log("SUCURSAL--> " + this.idSucursal)
    });
  }

  

  ngOnInit(): void {
    this.updateContactos();
  }

  async updateContactos() {
    this.contactoService.getAllBySucursal(this.idSucursal).then((data: any) => {
      this.contactos = data.data;
      this.contactosNuevos = this.contactos.filter(function (c) {
        return c.leida == false && c.destacado == false;
      });
      if (this.contactosNuevos.length != 0) {
        this.filteredDataNuevos = this.contactosNuevos;
        this.columnsWithSearch = Object.keys(this.contactosNuevos[0]);
      }
      this.contactosLeidos = this.contactos.filter(function (c) {
        return c.leida == true && c.destacado == false;
      });
      if (this.contactosLeidos.length != 0) {
        this.filteredDataLeidos = this.contactosLeidos;
        this.columnsWithSearch = Object.keys(this.contactosLeidos[0]);
      }

      this.contactosDestacados = this.contactos.filter(function (c) {
        return c.destacado == true;
      });
      if (this.contactosDestacados.length != 0) {
        this.filteredDataDestacados = this.contactosDestacados;
        this.columnsWithSearch = Object.keys(this.contactosDestacados[0]);
      }
    });

  }

  async verDetalles(content, row) {
    this.contactoService.getContacto(row.id).then(contacto => {
      this.contactoSelect = contacto.data[0];
      console.log("MOTIVO CONSULTA --> " + this.contactoSelect.motivoConsulta);
      if (this.contactoSelect.motivoConsulta == 'Calificación de franquicia') {
        this.calificacionFranquicias = true;
        this.informacionFranquicias = false;
        this.consultaGeneral = false;
        this.otros = false;
      }
      if (this.contactoSelect.motivoConsulta == 'Información sobre franquicias') {
        this.calificacionFranquicias = false;
        this.informacionFranquicias = true;
        this.consultaGeneral = false;
        this.otros = false;
      }
      if (this.contactoSelect.motivoConsulta == 'Consulta General') {
        this.calificacionFranquicias = false;
        this.informacionFranquicias = false;
        this.consultaGeneral = true;
        this.otros = false;
      }
      if (this.contactoSelect.motivoConsulta == 'Otro') {
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

  onSort(event) {
    console.log(event);
  }


  goToContactosNuevos() {
    this.router.navigate(['/mis-mensajes-nuevos']);
  }

  marcarLeido(contacto: Contacto) {
    this.contactoService.updateContactoLeido(contacto, true).then(response => {
      this.updateContactos();
      swal.fire(
        'Actualizado!',
        'El mensaje ha sido marcado como leido!',
        'success'
      )
    })
  }

  marcarDestacado(contacto: Contacto) {
    this.contactoService.updateContactoDestacado(contacto, true).then(response => {
      this.updateContactos();
      swal.fire(
        'Actualizado!',
        'El mensaje ha sido marcado como destacado!',
        'success'
      )
    })
  }

  desmarcarDestacado(contacto: Contacto) {
    this.contactoService.updateContactoDestacado(contacto, false).then(response => {
      this.updateContactos();
      swal.fire(
        'Actualizado!',
        'El mensaje ya no se encuentra destacado!',
        'success'
      )
    })
  }

  updateFilterNuevos(event) {
    let filter = event.target.value.toLowerCase();
    this.contactosNuevos = this.filteredDataNuevos.filter(item => {
      for (let i = 0; i < this.columnsWithSearch.length; i++) {
        if (this.columnsWithSearch[i] != 'sucursal') {
          var colValue = item[this.columnsWithSearch[i]];
          if (!filter || (!!colValue && colValue.toString().toLowerCase().indexOf(filter) !== -1)) {
            return true;
          }
        }
        else {
          var colValue = item[this.columnsWithSearch[i]]?.localidad;
          if (!filter || (!!colValue && colValue.toString().toLowerCase().indexOf(filter) !== -1)) {
            return true;
          }
        }
      }
    });
  }

  updateFilterLeidos(event) {
    let filter = event.target.value.toLowerCase();
    this.contactosLeidos = this.filteredDataLeidos.filter(item => {
      for (let i = 0; i < this.columnsWithSearch.length; i++) {
        if (this.columnsWithSearch[i] != 'sucursal') {
          var colValue = item[this.columnsWithSearch[i]];
          if (!filter || (!!colValue && colValue.toString().toLowerCase().indexOf(filter) !== -1)) {
            return true;
          }
        }
        else {
          var colValue = item[this.columnsWithSearch[i]]?.localidad;
          if (!filter || (!!colValue && colValue.toString().toLowerCase().indexOf(filter) !== -1)) {
            return true;
          }
        }
      }
    });
  }

  updateFilterDestacados(event) {
    let filter = event.target.value.toLowerCase();
    this.contactosDestacados = this.filteredDataDestacados.filter(item => {
      for (let i = 0; i < this.columnsWithSearch.length; i++) {
        if (this.columnsWithSearch[i] != 'sucursal') {
          var colValue = item[this.columnsWithSearch[i]];
          if (!filter || (!!colValue && colValue.toString().toLowerCase().indexOf(filter) !== -1)) {
            return true;
          }
        }
        else {
          var colValue = item[this.columnsWithSearch[i]]?.localidad;
          if (!filter || (!!colValue && colValue.toString().toLowerCase().indexOf(filter) !== -1)) {
            return true;
          }
        }
      }
    });
  }
}
