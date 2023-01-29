import { ProductoService } from './../../../shared/services/producto.service';
import { PresentacionService } from './../../../shared/services/presentacion.service';
import { Producto } from './../../../shared/model/producto.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Presentacion } from 'app/shared/model/presentacion.model';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert2';

@Component({
  selector: 'app-presentacion-new',
  templateUrl: './presentacion-new.component.html',
  styleUrls: ['./presentacion-new.component.scss']
})
export class PresentacionNewComponent implements OnInit {

  presentacionForm: FormGroup;
  presentacionSelect: Presentacion = {} as Presentacion;
  modeEdit: boolean = false;
  idPresentacionEdit: String = null;
  imageFile: { link: string, file: any, name: string };



  validation_messages = {
    'titulo': [
      { type: 'required', message: 'Titulo requerido.' }
    ],
    'orden': [
      { type: 'required', message: 'Orden requerido.' }
    ],
    'imagenPath': [
      { type: 'required', message: 'Imagen requerida.' }
    ],
    'producto': [
      { type: 'required', message: 'Producto requerido.' }
    ],
    'precio': [
      { type: 'required', message: 'El precio es requerido.' }
    ],
  };


  productos: Array<Producto> = [ ]

  constructor(
    private fb: FormBuilder,
    private presentacionService: PresentacionService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private productoService: ProductoService
  ) {

    this.presentacionForm = this.fb.group({
      titulo: [this.presentacionSelect.titulo || '', Validators.required],
      orden: [this.presentacionSelect.orden || '', Validators.required],
      descripcion: [this.presentacionSelect.descripcion || ''],
      imagen: [this.presentacionSelect.imagen_path || '', Validators.required],
      producto: [this.presentacionSelect.producto || null],
      precio: [this.presentacionSelect.precio || '', Validators.required],
    });

    if (this.route.snapshot.paramMap.get("id") != null) {
      this.modeEdit = true;
      this.loadPresentacion();
    }

    this.productoService.getAllActivos().then((data:any) =>{
      this.productos = data.data;
    });
  }

  ngOnInit() {
  }


  


  imagesPreview(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (_event: any) => {
        this.imageFile = {
          link: _event.target.result,
          file: event.srcElement.files[0],
          name: event.srcElement.files[0].name
        };
        this.presentacionForm.controls['imagen'].setValue(this.imageFile.file);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  loadPresentacion() {
    this.idPresentacionEdit = this.route.snapshot.paramMap.get("id");
    this.presentacionService.getPresentacion(this.idPresentacionEdit).then(result => {
      this.presentacionSelect = result.data;

      this.http.get(this.presentacionSelect.imagen_path, { responseType: 'blob' }).subscribe((data2: Blob) => {
        var c: any = data2;
        c.lastModifiedDate = new Date();
        c.filename = 'image';
        this.imageFile = {
          link: this.presentacionSelect.imagen_path,
          file: <File>data2,
          name: 'imagen'
        };

        this.presentacionForm.patchValue({
          titulo: this.presentacionSelect.titulo,
          orden: this.presentacionSelect.orden,
          descripcion: this.presentacionSelect.descripcion,
          imagenPath: this.presentacionSelect.imagen_path,
          precio: this.presentacionSelect.precio,
          producto: this.presentacionSelect?.producto?.id
        });
      });
    });
  }

  nuevo() {
    this.presentacionService.newPresentacion(this.presentacionForm).then(response => {
      swal.fire(
        'Creado!',
        'La nueva presentacion ha sido creada.',
        'success'
      ).then(result=>{
        this.router.navigate(['/presentaciones-list']);
      })
    });
  }

  actualizar() {
    this.presentacionService.updatePresentacion(this.presentacionForm, this.presentacionSelect.id).then(response => {
      swal.fire(
        'Actualizado!',
        'La nueva presentacion ha sido actualizada.',
        'success'
      ).then(result=>{
        this.router.navigate(['/presentaciones-list']);
      })
    });
  }

}
