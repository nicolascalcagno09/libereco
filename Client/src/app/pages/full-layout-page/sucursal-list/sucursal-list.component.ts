import { Component, OnInit } from '@angular/core';
import { Sucursal } from 'app/shared/model/sucursal.model';
import { FormGroup } from '@angular/forms';
import { SucursalService } from 'app/shared/services/sucursal.service';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sucursal-list',
  templateUrl: './sucursal-list.component.html',
  styleUrls: ['./sucursal-list.component.scss']
})
export class SucursalListComponent implements OnInit {

  loadingIndicator: boolean = true;
  reorderable: boolean = true;
  sucursales: Array<Sucursal> = [];
  sucursalesForm: FormGroup;
  currentSucursal: Sucursal = {} as Sucursal;
  sucursalSelect: Sucursal = {} as Sucursal;
  scrollBarHorizontal = (window.innerWidth < 1200);
  columnsWithSearch: string[] = [];
  filteredDataNuevos: Array<Sucursal> = [];
 
  constructor(
    private sucursalService: SucursalService,
    private router: Router,
    private modalService: NgbModal,
    private route: ActivatedRoute,
  ) {
    window.onresize = () => {
      this.scrollBarHorizontal = (window.innerWidth < 1200);
    };
    this.updateSucursales();
  }

  ngOnInit() {
    
  }

  

  updateSucursales() {
    this.sucursalService.getAllByOrden().then((data: any) => {
      this.sucursales = data.data;
      if (this.sucursales.length != 0) {
        this.filteredDataNuevos = this.sucursales;
        this.columnsWithSearch = Object.keys(this.sucursales[0]);
      }
    });
  }

  eliminarSucursal(producto: Sucursal) {

    swal.fire({
      title: 'Estás seguro?',
      text: 'Se borrará la Sucursal, y no será posible recuperarla!',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then(result => {
      if (result.value) {
        this.sucursalService.deleteSucursal(producto).then(response => {
          this.updateSucursales();
          swal.fire(
            'Eliminada!',
            'La sucursal ha sido eliminada.',
            'success'
          )
        })
      }
    })
  }

  editarSucursal(sucursal: Sucursal) {
    this.router.navigate(['/sucursales-new/', sucursal.id]);
  }

  editarProductos(sucursal: Sucursal) {
    this.router.navigate(['/sucursal-productos/', sucursal.id]);
  }

  editarTurnos(sucursal: Sucursal) {
    this.router.navigate(['/sucursal-turnos/', sucursal.id]);
  }

  publicarSucursal(sucursal: Sucursal, activo: boolean) {
    this.sucursalService.updateSucursalActivo(sucursal, activo).then(result => {
      this.updateSucursales();
    });
  }

  verDetalles(content, row) {
    this.sucursalService.getSucursal(row.id).then(sucursal => {
      this.sucursalSelect = sucursal.data;
      this.modalService.open(content, { size: 'lg', windowClass: 'dark-modal' });
    });
  }

  onSort(event){
    console.log(event);
  }


  updateFilter(event) {
    let filter = event.target.value.toLowerCase();
    filter = filter.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    this.sucursales = this.filteredDataNuevos.filter(item => {
      for (let i = 0; i < this.columnsWithSearch.length; i++) {
          var colValue = item[this.columnsWithSearch[i]];
          if (!filter || (!!colValue && colValue.toString().toLowerCase().indexOf(filter) !== -1)) {
            return true;
          }
      }
    });
  }
}
