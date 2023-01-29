import { Component, OnInit } from '@angular/core';
import { ArticuloCanjeable } from './../../../shared/model/articulocanjeable.model';
import { FormGroup } from '@angular/forms';
import { ArticulocanjeableService } from 'app/shared/services/articulocanjeable.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificacionService } from 'app/shared/services/notificacion.service';

@Component({
  selector: 'app-articulocanjeable-list',
  templateUrl: './articulocanjeable-list.component.html',
  styleUrls: ['./articulocanjeable-list.component.scss']
})
export class ArticulocanjeableListComponent implements OnInit {


  loadingIndicator: boolean = true;
  reorderable: boolean = true;
  canjeables: Array<ArticuloCanjeable> = [];
  canjeablesForm: FormGroup;
  canjeableSelect: ArticuloCanjeable = {} as ArticuloCanjeable;
  columnsWithSearch: string[] = [];
  filteredDataNuevos: Array<ArticuloCanjeable> = [];


  constructor(private canjeableService: ArticulocanjeableService,
              private router: Router,
              private modalService: NgbModal,
              private notificacionService: NotificacionService
              ) {
    this.updateCanjeables();
  }

  ngOnInit(): void {
  }

  onSort(event) {
    console.log(event);
  }

  updateCanjeables() {
    this.canjeableService.getAll().then((data: any) => {
      this.canjeables = data.data;
      if (this.canjeables.length != 0) {
        this.filteredDataNuevos = this.canjeables;
        this.columnsWithSearch = Object.keys(this.canjeables[0]);
      }
    });
  }

  editarCanjeable(canjeable: ArticuloCanjeable) {
    this.router.navigate(['/articulocanjeable-edit/', canjeable.id]);
  }

  eliminarCanjeable(canjeable: ArticuloCanjeable) {
    swal.fire({
      title: 'Estás seguro?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then(result => {
      if (result.value) {
        this.canjeableService.deleteCanjeanble(canjeable).then(response =>{
          this.updateCanjeables();
          swal.fire(
            'Eliminado!',
            'El articulo ha sido eliminado.',
            'success'
          )
        })
      }
    })
  }

  notificar(articulo: ArticuloCanjeable){
    swal.fire({
        title: 'Libereco cargó nuevos artículos canjeables.',
        text: articulo.titulo,
        showCancelButton: true,
        confirmButtonText: 'Enviar Push',
        cancelButtonText: 'Cancelar',
      }
    ).then(result => {
      if (result.value) {
        this.sendNotification('canjeableId', articulo.id);
        swal.fire(
          'Enviada!',
          'La notificación fue enviada con éxito',
          'success'
        )
      }
    })
  }

  verDetalles(content, row) {
    this.canjeableService.getCanjeable(row.id).then(canjeable => {
      this.canjeableSelect = canjeable.data;
      this.modalService.open(content, { size: 'lg', windowClass: 'dark-modal' });
    });
  }

  async sendNotification(value, id) {
    let body = {};
    body[value] = id;
    await this.notificacionService.sendPush(body);
  }

  updateFilter(event) {
    let filter = event.target.value.toLowerCase();
    filter = filter.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    this.canjeables = this.filteredDataNuevos.filter(item => {
      for (let i = 0; i < this.columnsWithSearch.length; i++) {
          var colValue = item[this.columnsWithSearch[i]];
          if (!filter || (!!colValue && colValue.toString().toLowerCase().indexOf(filter) !== -1)) {
            return true;
          }
      }
    });
  }

}
