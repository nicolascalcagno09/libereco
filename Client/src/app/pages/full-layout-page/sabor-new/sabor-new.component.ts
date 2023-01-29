import { SaborCategoriaService } from 'app/shared/services/sabor-categoria.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Sabor, SaborCategoria } from 'app/shared/model/sabor.model';
import { SaborService } from 'app/shared/services/sabor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert2';


@Component({
  selector: 'app-sabor-new',
  templateUrl: './sabor-new.component.html',
  styleUrls: ['./sabor-new.component.scss']
})
export class SaborNewComponent implements OnInit {

  saborForm: FormGroup;
  saborSelect: Sabor = {} as Sabor;
  isEdit: boolean = false;
  idSaborEdit: String = null;
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
    'categoria': [
      { type: 'required', message: 'Categoría requerida.' }
    ],
  };


  categorias: Array<SaborCategoria> = [];


  constructor(
    private fb: FormBuilder,
    private saborService: SaborService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private SCService: SaborCategoriaService
  ) {

    this.saborForm = this.fb.group({
      titulo: [this.saborSelect.titulo || '', Validators.required],
      imagen: [this.saborSelect.imagen_path || '', Validators.required],
      orden: [this.saborSelect.orden || '', Validators.required],
      categoria: [this.saborSelect.tipoSabor || null],
      descripcion: [this.saborSelect.descripcion || null]
    });

    if (this.route.snapshot.paramMap.get("id") != null) {
      this.isEdit = true;
      this.loadSabor();
    }

    this.SCService.getAll().then((data:any) =>{
      this.categorias =  [...data.data];
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
        this.saborForm.controls['imagen'].setValue(this.imageFile.file);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  loadSabor() {
    this.idSaborEdit = this.route.snapshot.paramMap.get("id");
    this.saborService.getSabor(this.idSaborEdit).then(result => {
      this.saborSelect = result.data;

      this.http.get(this.saborSelect.imagen_path, { responseType: 'blob' }).subscribe((data2: Blob) => {
        var c: any = data2;
        c.lastModifiedDate = new Date();
        c.filename = 'image';
        this.imageFile = {
          link: this.saborSelect.imagen_path,
          file: <File>data2,
          name: 'imagen'
        };

        this.saborForm.patchValue({
          titulo: this.saborSelect.titulo,
          descripcion: this.saborSelect.descripcion,
          imagenPath: this.saborSelect.imagen_path,
          categoria: this.saborSelect.tipoSabor.id,
          orden: this.saborSelect.orden,
        });
      });
    });
  }

  nuevo() {
    this.saborService.newSabor(this.saborForm).then(response => {
      swal.fire(
        'Creado!',
        'El nuevo sabor ha sido creado.',
        'success'
      )
      .then(result=>{
        this.router.navigate(['/sabores-list']);
      })
    });
  }

  actualizar() {
    this.saborService.updateSabor(this.saborForm, this.saborSelect.id).then(response => {
      swal.fire(
        'Actualizado!',
        'El sabor ha sido actualizado.',
        'success'
      ).then(result=>{
        this.router.navigate(['/sabores-list']);
      })
    });
  }

}
