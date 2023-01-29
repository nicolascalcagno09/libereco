import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SaborCategoria } from 'app/shared/model/sabor.model';
import { SaborCategoriaService } from 'app/shared/services/sabor-categoria.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-sabor-categoria',
  templateUrl: './sabor-categoria.component.html',
  styleUrls: ['./sabor-categoria.component.scss']
})
export class SaborCategoriaComponent implements OnInit {

  loadingIndicator: boolean = true;
  reorderable: boolean = true;
  campoForm: FormGroup;
  categorias: Array<SaborCategoria> =[];

  constructor(
    private fb: FormBuilder,
    private saborCategoriaService: SaborCategoriaService) {

    this.campoForm = this.fb.group({
      nombre: ['']
    });
    this.updateCategorias();

  }

  ngOnInit() {
  }

  nuevaCategoria() {
    let valor = this.campoForm.controls['nombre'].value;
    this.saborCategoriaService.newSaborCategoria({nombre:valor}).then(response =>{
      this.campoForm.reset();
      this.updateCategorias();
    });
  }

  eliminarCategoria(categoria: SaborCategoria) {
    swal.fire({
      title: 'Estás seguro?',
      text: 'Se borrará la categoría, y no será posible recuperarla!',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then(result => {
      if (result.value) {
        this.saborCategoriaService.deleteSaborCategoria(categoria).then(response =>{
          this.updateCategorias();
          swal.fire(
            'Eliminado!',
            'La categoria ha sido eliminada.',
            'success'
          )
        })
      }
    })
    
  }

  updateCategorias(){
    this.saborCategoriaService.getAll().then((data:any) =>{
      this.categorias = [...data.data];
    });
  }

}
