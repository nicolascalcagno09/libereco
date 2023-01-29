import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Promocion } from './../../../shared/model/promocion.model';
import { PromocionService } from 'app/shared/services/promocion.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificacionService } from 'app/shared/services/notificacion.service';

@Component({
  selector: 'app-promocion-list',
  templateUrl: './promocion-list.component.html',
  styleUrls: ['./promocion-list.component.scss']
})
export class PromocionListComponent implements OnInit {

  loadingIndicator: boolean = true;
  reorderable: boolean = true;
  promociones: Array<Promocion> = [];
  promocionesForm: FormGroup;
  promocionSelect: Promocion = {} as Promocion;
  columnsWithSearch: string[] = [];
  filteredDataNuevos: Array<Promocion> = [];

  constructor(private promocionService: PromocionService,
              private router: Router,
              private modalService: NgbModal,
              private notificacionService: NotificacionService
              ) {
    this.updatePromociones();
  }

  ngOnInit(): void {
  }

  onSort(event) {
    console.log(event);
  }

  updatePromociones() {
    this.promocionService.getAll().then((data: any) => {
      this.promociones = data.data;
      if (this.promociones.length != 0) {
        this.filteredDataNuevos = this.promociones;
        this.columnsWithSearch = Object.keys(this.promociones[0]);
      }
    });
  }

  editarPromocion(promocion: Promocion) {
    this.router.navigate(['/promocion-edit/', promocion.id]);
  }

  eliminarPromocion(promocion: Promocion) {
    swal.fire({
      title: 'Estás seguro?',
      text: 'Se borrará la Promoción y no será posible recuperarla!',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then(result => {
      if (result.value) {
        this.promocionService.deletePromocion(promocion).then(response =>{
          this.updatePromociones();
          swal.fire(
            'Eliminado!',
            'La promoción ha sido eliminada.',
            'success'
          )
        })
      }
    })
  }

  notificar(promocion: Promocion){
    swal.fire({
        title: 'Libereco tiene una nueva Promoción para vos!',
        text: promocion.titulo,
        showCancelButton: true,
        confirmButtonText: 'Enviar Push',
        cancelButtonText: 'Cancelar',
      }
    ).then(result => {
      if (result.value) {
        this.sendNotification('promocionId', promocion.id);
        swal.fire(
          'Enviada!',
          'La notificación fue enviada con éxito',
          'success'
        )
      }
    })
  }

  verDetalles(content, row) {
    this.promocionService.getPromocion(row.id).then(promocion => {
      this.promocionSelect = promocion.data;
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
    this.promociones = this.filteredDataNuevos.filter(item => {
      for (let i = 0; i < this.columnsWithSearch.length; i++) {
          var colValue = item[this.columnsWithSearch[i]];
          if (!filter || (!!colValue && colValue.toString().toLowerCase().indexOf(filter) !== -1)) {
            return true;
          }
      }
    });
  }
}
