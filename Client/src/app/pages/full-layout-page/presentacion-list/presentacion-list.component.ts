import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Presentacion } from 'app/shared/model/presentacion.model';
import { PresentacionService } from 'app/shared/services/presentacion.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-presentacion-list',
  templateUrl: './presentacion-list.component.html',
  styleUrls: ['./presentacion-list.component.scss']
})
export class PresentacionListComponent implements OnInit {

  loadingIndicator: boolean = true;
  reorderable: boolean = true;
  presentaciones: Array<Presentacion> = [];
  presentacionForm: FormGroup;
  currentSabor: Presentacion = {} as Presentacion;
  columnsWithSearch: string[] = [];
  filteredDataNuevos: Array<Presentacion> = [];

  constructor(private fb: FormBuilder,
    private presentacionService: PresentacionService,
    private router: Router
  ) {
    this.updatePresentaciones();
  }

  ngOnInit() {
  }

  updatePresentaciones() {
    this.presentacionService.getAllByOrden().then((data: any) => {
      this.presentaciones = data.data;
      if (this.presentaciones.length != 0) {
        this.filteredDataNuevos = this.presentaciones;
        this.columnsWithSearch = Object.keys(this.presentaciones[0]);
      }
    });
  }

  editarPresentacion(presentacion: Presentacion) {
    this.router.navigate(['/presentacion-edit/', presentacion.id]);
  }

  publicarPresentacion(presentacion: Presentacion, activo: boolean) {
    this.presentacionService.updatePresentacionActivo(presentacion, activo).then(result => {
      this.updatePresentaciones();
    });
  }

  eliminarPresentacion(presentacion: Presentacion) {

    swal.fire({
      title: 'Estás seguro?',
      text: 'Se borrará la Presentación, y no será posible recuperarlo!',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then(result => {
      if (result.value) {
        this.presentacionService.deletePresentacion(presentacion).then(response => {
          this.updatePresentaciones();
          swal.fire(
            'Eliminado!',
            'La presentacion ha sido eliminada.',
            'success'
          )
        })
      }
    })
  }

  onSort(event) {
    console.log(event);
  }

  updateFilter(event) {
    let filter = event.target.value.toLowerCase();
    filter = filter.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    this.presentaciones = this.filteredDataNuevos.filter(item => {
      for (let i = 0; i < this.columnsWithSearch.length; i++) {
          var colValue = item[this.columnsWithSearch[i]];
          if (!filter || (!!colValue && colValue.toString().toLowerCase().indexOf(filter) !== -1)) {
            return true;
          }
      }
    });
  }

}
