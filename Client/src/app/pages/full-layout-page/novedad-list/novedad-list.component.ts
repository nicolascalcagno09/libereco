import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Novedad } from './../../../shared/model/novedad.model';
import { NovedadService } from 'app/shared/services/novedad.service';
import swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificacionService } from 'app/shared/services/notificacion.service';


@Component({
  selector: 'app-novedad-list',
  templateUrl: './novedad-list.component.html',
  styleUrls: ['./novedad-list.component.scss']
})
export class NovedadListComponent implements OnInit {

  loadingIndicator: boolean = true;
  reorderable: boolean = true;
  novedades: Array<Novedad> = [];
  novedadesForm: FormGroup;
  modeEdit: boolean = false;
  novedadSelect: Novedad = {} as Novedad;
  imageFile: { link: string, file: any, name: string };
  sucursales: Array<any> = [];
  sucursalesIds: any = [];
  idNovedadEdit: String = null;
  columnsWithSearch: string[] = [];
  filteredDataNuevos: Array<Novedad> = [];

  constructor(private novedadService: NovedadService,
    private router: Router,
    private modalService: NgbModal,
    private notificacionService: NotificacionService
    ) {
    this.updateNovedades();
  }

  ngOnInit(): void {
  }

  onSort(event) {
    console.log(event);
  }

  updateNovedades() {
    this.novedadService.getAll().then((data: any) => {
      this.novedades = data.data;
      if (this.novedades.length != 0) {
        this.filteredDataNuevos = this.novedades;
        this.columnsWithSearch = Object.keys(this.novedades[0]);
      }
    });
  }

  editarNovedad(novedad: Novedad) {
    this.router.navigate(['/novedad-edit/', novedad.id]);
  }

  eliminarNovedad(novedad: Novedad) {
    swal.fire({
      title: 'Estás seguro?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then(result => {
      if (result.value) {
        this.novedadService.deleteNovedad(novedad).then(response =>{
          this.updateNovedades();
          swal.fire(
            'Eliminado!',
            'La novedad ha sido eliminada.',
            'success'
          )
        })
      }
    })
  }

  notificar(novedad: Novedad){
    swal.fire({
        title: 'Libereco ha cargado una nueva Novedad.',
        text: novedad.titulo,
        showCancelButton: true,
        confirmButtonText: 'Enviar Push',
        cancelButtonText: 'Cancelar',
      }
    ).then(result => {
      if (result.value) {
        this.sendNotification('novedadId', novedad.id);
        swal.fire(
          'Enviada!',
          'La notificación fue enviada con éxito',
          'success'
        )
      }
    })
  }

  verDetalles(content, row) {
    this.novedadService.getNovedad(row.id).then(novedad => {
      this.novedadSelect = novedad.data;
      this.modalService.open(content, { size: 'lg', windowClass: 'dark-modal' });
    });
  }

  async sendNotification(novedadId, id) {
    let body = {};
    body[novedadId] = id;
    await this.notificacionService.sendPush(body);
  }

  updateFilter(event) {
    let filter = event.target.value.toLowerCase();
    filter = filter.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    this.novedades = this.filteredDataNuevos.filter(item => {
      for (let i = 0; i < this.columnsWithSearch.length; i++) {
          var colValue = item[this.columnsWithSearch[i]];
          if (!filter || (!!colValue && colValue.toString().toLowerCase().indexOf(filter) !== -1)) {
            return true;
          }
      }
    });
  }

}