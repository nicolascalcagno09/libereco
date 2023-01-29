import { Producto } from './../../../shared/model/producto.model';
import { SaborService } from 'app/shared/services/sabor.service';
import { Sabor, SaborCategoria } from 'app/shared/model/sabor.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProductoService } from 'app/shared/services/producto.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-producto-new',
  templateUrl: './producto-new.component.html',
  styleUrls: ['./producto-new.component.scss']
})
export class ProductoNewComponent implements OnInit {

  productoForm: FormGroup;
  productoSelect: Producto = {} as Producto;
  modeEdit: boolean = false;
  idProductoEdit: String = null;
  enabled = false

  validation_messages = {
    'nombre': [
      { type: 'required', message: 'Nombre requerido.' }
    ],
    'orden': [
      { type: 'required', message: 'Orden requerido.' }
    ],
    'saborNombre': [
      { type: 'required', message: 'Sabor Nombre requerido.' }
    ],
  };

  categorias: Array<SaborCategoria> = [];
  sabores: Array<any> = [];


  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private saborService: SaborService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient) {

    this.productoForm = this.fb.group({
      nombre: [this.productoSelect.nombre || '', Validators.required],
      descripcion: [this.productoSelect.descripcion || ''],
      orden: [this.productoSelect.orden || '', Validators.required],
      saborNombre: [this.productoSelect.saborNombre || 'Sabores', Validators.required],
    });

    if (this.route.snapshot.paramMap.get("id") != null) {
      this.modeEdit = true;
      this.saborService.getAllActivos().then((data: any) => {
        this.sabores=data.data
        this.loadProducto();
      });
    }else{
      this.saborService.getAll().then((data: any) => {
        this.sabores = data.data;
      });
    }

    

  }

  ngOnInit() {
  }

  loadProducto() {
    this.idProductoEdit = this.route.snapshot.paramMap.get("id");
    this.productoService.getProducto(this.idProductoEdit).then(result => {
      this.productoSelect = result.data;
      this.productoForm.patchValue({
        nombre: this.productoSelect.nombre,
        descripcion: this.productoSelect.descripcion,
        orden: this.productoSelect.orden,
        saborNombre: result.data.sabor_nombre
      });
      this.enabled= result.data.tiene_sabores;
      let saboresSelected=[]
      saboresSelected = result.data.sabores
      saboresSelected.map(s1=> this.sabores.map(s2 => s1.id === s2.id ? s2.selected = true : null) )
    });
  }

  nuevoProducto() {
    let saboresSelected = this.sabores.filter(s => s.selected == true)
    let producto: any = {
      activo: true,
      descripcion: this.productoForm.get('descripcion').value,
      orden: this.productoForm.get('orden').value,
      nombre: this.productoForm.get('nombre').value,
      tiene_sabores:this.enabled,
      sabor_nombre: this.productoForm.get('saborNombre').value,
      sabores: saboresSelected
    }
    console.log(producto)
    this.productoService.newProducto(producto).then(result =>{
      swal.fire(
        'Creado!',
        'El producto ha sido creado.',
        'success'
      ).then(result=>{
        this.router.navigate(['/productos-list']);
      })
    })

  }

  actualizarProducto() {
    let saboresSelected =[]
    if(this.enabled){
      saboresSelected = this.sabores.filter(s => s.selected == true)
    }
    let producto: any = {
      activo: true,
      orden: this.productoForm.get('orden').value,
      descripcion: this.productoForm.get('descripcion').value,
      nombre: this.productoForm.get('nombre').value,
      tiene_sabores:this.enabled,
      sabor_nombre: this.productoForm.get('saborNombre').value,
      sabores: saboresSelected
    }


    this.productoService.updateProducto(producto, this.productoSelect.id).then(response => {
      swal.fire(
        'Actualizado!',
        'El producto ha sido actualizado.',
        'success'
      ).then(result=>{
        this.router.navigate(['/productos-list']);
      })
    });

  }

  sabor(event: any) {
    this.enabled = event;
  }

  saborSelect(value) {
    let i = this.sabores.findIndex(x => x.id == value.id)
    this.sabores[i].selected = !this.sabores[i].selected
  }


}
