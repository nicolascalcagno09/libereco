import { Sabor } from 'app/shared/model/sabor.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SaborService } from 'app/shared/services/sabor.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-sabor-list',
  templateUrl: './sabor-list.component.html',
  styleUrls: ['./sabor-list.component.scss']
})
export class SaborListComponent implements OnInit {

  loadingIndicator: boolean = true;
  reorderable: boolean = true;
  sabores : Array<Sabor> = [];
  campoForm: FormGroup;
  currentSabor: Sabor = {} as Sabor;
  columnsWithSearch: string[] = [];
  filteredDataNuevos: Array<Sabor> = [];

  constructor(
    private fb: FormBuilder, 
    private saborService: SaborService,
    private router: Router
    ) {

    
    this.updateSabores();
    
   
  }

  ngOnInit() {
  }

  updateSabores(){
    this.saborService.getAll().then((data:any) =>{
      this.sabores = data.data;
      if (this.sabores.length != 0) {
        this.filteredDataNuevos = this.sabores;
        this.columnsWithSearch = Object.keys(this.sabores[0]);
      }
    });
  }

  eliminarSabor(sabor: Sabor) {
    
    swal.fire({
      title: 'Estás seguro?',
      text: 'Se borrará el Sabor, y no será posible recuperarlo!',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then(result => {
      if (result.value) {
        this.saborService.deleteSabor(sabor).then(response =>{
          this.updateSabores();
          swal.fire(
            'Eliminado!',
            'El sabor ha sido eliminada.',
            'success'
          )
        })
      }
    })
  }

  editarSabor(sabor: Sabor) {
    this.router.navigate(['/sabor-edit/', sabor.id]);
  }

  publicarSabor(sabor:Sabor, activo:boolean){
    this.saborService.updateSaborActivo(sabor,activo).then(result =>{
      this.updateSabores();
    });
  }

  onSort(event){
    console.log(event);
  }


  updateFilter(event) {
    let filter = event.target.value.toLowerCase();
    filter = filter.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    this.sabores = this.filteredDataNuevos.filter(item => {
      for (let i = 0; i < this.columnsWithSearch.length; i++) {
          var colValue = item[this.columnsWithSearch[i]];
          if (!filter || (!!colValue && colValue.toString().toLowerCase().indexOf(filter) !== -1)) {
            return true;
          }
      }
    });
  }
}
