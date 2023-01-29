import { Component, OnInit } from '@angular/core';
import { Contacto } from 'app/shared/model/contacto.model';
import { ContactoService } from 'app/shared/services/contacto.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contactos-nuevos',
  templateUrl: './contactos-nuevos.component.html',
  styleUrls: ['./contactos-nuevos.component.scss']
})
export class ContactosNuevosComponent implements OnInit {

  calificacionFranquicias:boolean = false;
  informacionFranquicias:boolean = false;
  otros:boolean=false;
  consultaGeneral:boolean=false;
  loadingIndicator: boolean = true;
  reorderable: boolean = true;
  contactosNuevos: Array<Contacto> = [];
  contactoSelect: Contacto = {} as Contacto;
  filteredData: Array<Contacto> = [];
  columnsWithSearch : string[] = [];
  constructor(private contactoService: ContactoService,
    private router: Router,
    private modalService: NgbModal) {

    this.updateContactos();
  }

  ngOnInit(): void {
  }

  updateContactos() {
    this.contactoService.getAllNoLeidos().then((data: any) => {
      this.contactosNuevos = data.data;
      this.filteredData = this.contactosNuevos;
      this.columnsWithSearch = Object.keys(this.contactosNuevos[0]);
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

  onSort(event) {
    console.log(event);
  }

  marcarLeido(contacto:Contacto){
    this.contactoService.updateContactoLeido(contacto,true).then(response => {
      this.updateContactos();
      swal.fire(
        'Actualizado!',
        'El mensaje ha sido marcado como leido!',
        'success'
      )
    })
  }

  goToTodos() {
    this.router.navigate(['/contacto-list']);
  }

  updateFilter(event) {
    let filter = event.target.value.toLowerCase();
    this.contactosNuevos = this.filteredData.filter(item => {
      for (let i = 0; i < this.columnsWithSearch.length; i++){
        if (this.columnsWithSearch[i] != 'sucursal') {
          var colValue = item[this.columnsWithSearch[i]] ;
          if (!filter || (!!colValue && colValue.toString().toLowerCase().indexOf(filter) !== -1)) {
            return true;
          }
        }
        else {
          var colValue = item[this.columnsWithSearch[i]]?.localidad ;
          if (!filter || (!!colValue && colValue.toString().toLowerCase().indexOf(filter) !== -1)) {
            return true;
          }
        }
      }
    });
  }
}
