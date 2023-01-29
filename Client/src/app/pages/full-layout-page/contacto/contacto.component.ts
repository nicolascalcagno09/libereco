import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contacto } from 'app/shared/model/contacto.model';
import { ContactoService } from 'app/shared/services/contacto.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent implements OnInit {

  calificacionFranquicias: boolean = false;
  informacionFranquicias: boolean = false;
  otros: boolean = false;
  consultaGeneral: boolean = false;
  loadingIndicator: boolean = true;
  reorderable: boolean = true;

  contactosNuevos: Array<any> = [];
  contactosLeidos: Array<any> = [];
  contactosDestacados: Array<any> = [];

  contactosNuevosAuxConsultaGeneral: Array<any> = [];
  contactosNuevosAuxCalificacionFranquicias: Array<any> = [];
  contactosNuevosAuxInformacionSobreFranquicias: Array<any> = [];

  contactosDestacadosAuxConsultaGeneral: Array<any> = [];
  contactosDestacadosAuxCalificacionFranquicias: Array<any> = [];
  contactosDestacadosAuxInformacionSobreFranquicias: Array<any> = [];

  contactosLeidosAuxConsultaGeneral: Array<any> = [];
  contactosLeidosAuxCalificacionFranquicias: Array<any> = [];
  contactosLeidosAuxInformacionSobreFranquicias: Array<any> = [];

  contactos: Array<Contacto> = [];
  contactoSelect: Contacto = {} as Contacto;
  filteredDataNuevos: Array<Contacto> = [];
  filteredDataLeidos: Array<Contacto> = [];
  filteredDataDestacados: Array<Contacto> = [];
  columnsWithSearch: string[] = [];

  optionsConsultaGeneral = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: false,
    headers: ['Fecha','Mail','Apellido','Nombre','Teléfono','Motivo de Consulta','Consulta','Leido'],
    useBom: false,
    removeNewLines: true,
    keys: ['createdAt','correoElectronico','apellido','nombre','telefono','motivoConsulta','consulta','leido']
  };

  optionsFranquicias = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: false,
    headers: ['Fecha','Mail','Apellido','Nombre','Teléfono','Motivo de Consulta','Sucursal','Porque elegis libereco',
    'Atencion en el local','Limpieza en el local','Como te sentis en el local','Sugerencias','Producto preferido','Sabores para agregar',
  'Te podemos contactar?','Leido'],
    useBom: false,
    removeNewLines: true,
    keys: ['createdAt','correoElectronico','apellido','nombre','telefono','motivoConsulta','suc',
    'porqueElegisLibereco','atencionEnLocal','limpiezaEnLocal','comoTeSentisteEnElLocal','sugerencias','productoPreferido','saboresParaAgregar',
  'tpc','leido']
  };

  optionsInformacionSobreFranquicias = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: false,
    headers: ['Fecha','Mail','Apellido','Nombre','Teléfono','Motivo de Consulta','Leido','Localidad de interes','Tiene experiencia en manejo de comercios',
  'Tiene experiencia en manejo de personal','Dedicación actual','Monto disponible para inversion','Porque deberias ser el propietario'],
    useBom: false,
    removeNewLines: true,
    keys: ['createdAt','correoElectronico','apellido','nombre','telefono','motivoConsulta','leido','localidadDeInteres','localidadDondeReside',
  'experiencia','personal','dedicacionActual','montoDisponibleParaInversion','porqueDeberiaSerElPropietario']
  };


  constructor(private contactoService: ContactoService,
    private router: Router,
    private modalService: NgbModal,) {

    this.updateContactos();
  }

  ngOnInit(): void {
  }

  // ngAfterViewChecked() {
  //   // document.querySelector('angular2csv > button').innerHTML = 'Hola Leo';
  //   document.getElementById('suc').innerHTML = '<button type="button">SUBMIT PICKS</button>';
  // }

  updateContactos() {
    //CONTACTOS NUEVOS
    this.contactoService.getAll().then((data: any) => {
      this.contactos = data.data;
      this.contactosNuevos = this.contactos.filter(function (c) {
        return c.leida == false && c.destacado == false;
      });
      if (this.contactosNuevos.length != 0) {
        this.filteredDataNuevos = this.contactosNuevos;
        this.columnsWithSearch = Object.keys(this.contactosNuevos[0]);
      }
      this.contactosNuevos.map(cn => {
        if(cn.motivoConsulta == 'Consulta General'){
          cn.leido = 'No';
          this.contactosNuevosAuxConsultaGeneral.push(cn);
        }
        if(cn.motivoConsulta == 'Calificación de franquicia'){
          cn.suc = cn.sucursal == null ? '-':cn.sucursal.localidad
          cn.tpc = cn.tePodemosContactar == true ? 'Si':'No';
          cn.leido = 'No';
          this.contactosNuevosAuxCalificacionFranquicias.push(cn);
        }
        if(cn.motivoConsulta == 'Información sobre franquicias'){
          cn.leido = 'No';
          cn.experiencia = cn.tieneExperienciaManejoComercios = true ? 'Si':'No';
          cn.personal = cn.tieneExperienciaManejoPersonal = true ? 'Si':'No';
          this.contactosNuevosAuxInformacionSobreFranquicias.push(cn);
        }
      })
    });
    //CONTACTOS LEIDOS
    this.contactoService.getAll().then((data: any) => {
      this.contactos = data.data;
      this.contactosLeidos = this.contactos.filter(function (c) {
        return c.leida == true && c.destacado == false;
      });
      if (this.contactosLeidos.length != 0) {
        this.filteredDataLeidos = this.contactosLeidos;
        this.columnsWithSearch = Object.keys(this.contactosLeidos[0]);
      }
      this.contactosLeidos.map(cd => {
        if(cd.motivoConsulta == 'Consulta General'){
          cd.leido = 'Si';
          this.contactosLeidosAuxConsultaGeneral.push(cd);
        }
        if(cd.motivoConsulta == 'Calificación de franquicia'){
          cd.suc = cd.sucursal == null ? '-':cd.sucursal.localidad
          cd.tpc = cd.tePodemosContactar == true ? 'Si':'No';
          cd.leido = 'Si';
          this.contactosLeidosAuxCalificacionFranquicias.push(cd);
        }
        if(cd.motivoConsulta == 'Información sobre franquicias'){
          cd.leido = 'Si';
          cd.experiencia = cd.tieneExperienciaManejoComercios = true ? 'Si':'No';
          cd.personal = cd.tieneExperienciaManejoPersonal = true ? 'Si':'No';
          this.contactosLeidosAuxInformacionSobreFranquicias.push(cd);
        }
      })
    });

    //CONTACTOS DESTACADOS
    this.contactoService.getAll().then((data: any) => {
      this.contactos = data.data;
      this.contactosDestacados = this.contactos.filter(function (c) {
        return c.destacado == true;
      });
      if (this.contactosDestacados.length != 0) {
        this.filteredDataDestacados = this.contactosDestacados;
        this.columnsWithSearch = Object.keys(this.contactosDestacados[0]);
      }
      this.contactosDestacados.map(c => {
        if(c.motivoConsulta == 'Consulta General'){
          c.leido = c.leida ? 'Si':'No';
          this.contactosDestacadosAuxConsultaGeneral.push(c);
        }
        if(c.motivoConsulta == 'Calificación de franquicia'){
          c.suc = c.sucursal == null ? '-':c.sucursal.localidad
          c.tpc = c.tePodemosContactar == true ? 'Si':'No';
          c.leido = c.leida ? 'Si':'No';
          this.contactosDestacadosAuxCalificacionFranquicias.push(c);
        }
        if(c.motivoConsulta == 'Información sobre franquicias'){
          c.leido = c.leida ? 'Si':'No';
          c.experiencia = c.tieneExperienciaManejoComercios = true ? 'Si':'No';
          c.personal = c.tieneExperienciaManejoPersonal = true ? 'Si':'No';
          this.contactosLeidosAuxInformacionSobreFranquicias.push(c);
        }
      })
    });

  }

  eliminarContacto(contacto: Contacto) {

    swal.fire({
      title: 'Estás seguro?',
      text: 'Se borrará el Mensaje, y no será posible recuperarlo!',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then(result => {
      if (result.value) {
        this.contactoService.deleteContacto(contacto).then(response => {
          this.updateContactos();
          swal.fire(
            'Eliminado!',
            'El mensaje ha sido eliminado.',
            'success'
          )
        })
      }
    })
  }

  async verDetalles(content, row) {
    this.contactoService.getContacto(row.id).then(contacto => {
      this.contactoSelect = contacto.data[0];
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

      this.modalService.open(content, { size: 'lg', windowClass: 'dark-modal' });
    });
  }

  onSort(event) {
    console.log(event);
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

  goToContactosNuevos() {
    this.router.navigate(['/contactos-nuevos']);
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
