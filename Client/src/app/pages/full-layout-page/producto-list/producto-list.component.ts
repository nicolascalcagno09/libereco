import { Producto } from './../../../shared/model/producto.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { ProductoService } from 'app/shared/services/producto.service';

@Component({
  selector: 'app-producto-list',
  templateUrl: './producto-list.component.html',
  styleUrls: ['./producto-list.component.scss']
})
export class ProductoListComponent implements OnInit {

  loadingIndicator: boolean = true;
  reorderable: boolean = true;
  productos : Array<Producto> = [];
  productosForm: FormGroup;
  currentSabor: Producto = {} as Producto;

  constructor(
    private fb: FormBuilder, 
    private productoService: ProductoService,
    private router: Router
    ) {

    
    this.updateProductos();
    
   
  }

  ngOnInit() {
  }

  updateProductos(){
    this.productoService.getAllByOrden().then((data:any) =>{
      this.productos = data.data;
    });
  }

  eliminarProducto(producto: Producto) {
    
    swal.fire({
      title: 'Estás seguro?',
      text: 'Se borrará el Producto, y no será posible recuperarlo!',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then(result => {
      if (result.value) {
        this.productoService.deleteProducto(producto).then(response =>{
          this.updateProductos();
          swal.fire(
            'Eliminado!',
            'El producto ha sido eliminada.',
            'success'
          )
        })
      }
    })
  }

  editarProducto(producto: Producto) {
    this.router.navigate(['/producto-edit/', producto.id]);
  }

  publicarProducto(producto:Producto, activo:boolean){
    this.productoService.updateProductoActivo(producto,activo).then(result =>{
      this.updateProductos();
    });
  }

  onSort(event){
    console.log(event);
  }

}
