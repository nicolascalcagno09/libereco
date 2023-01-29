import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticuloCanjeable } from 'app/shared/model/articulocanjeable.model';
import { SucursalService } from 'app/shared/services/sucursal.service';
import { ArticulocanjeableService } from 'app/shared/services/articulocanjeable.service';
import swal from 'sweetalert2';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-articulocanjeable-new',
  templateUrl: './articulocanjeable-new.component.html',
  styleUrls: ['./articulocanjeable-new.component.scss']
})
export class ArticulocanjeableNewComponent implements OnInit {

  canjeableForm: FormGroup;
  modeEdit: boolean = false;
  todas: boolean = true;
  canjeableSelect: ArticuloCanjeable = {} as ArticuloCanjeable;
  imageFile: { link: string, file: any, name: string };
  sucursales: Array<any> = [];
  sucursalesIds: any = [];
  idCanjeableEdit: String = null;
  canjeables: Array<ArticuloCanjeable> = [];
  generica: boolean = true;

  validation_messages = {
    'titulo': [
      { type: 'required', message: 'Titulo requerido.' }
    ],
    'subtitulo': [
      { type: 'required', message: 'Subtitulo requerido.' }
    ],
    'descripcion': [
      { type: 'required', message: 'Descripcion requerido.' }
    ],
    'desde': [
      { type: 'required', message: 'Fecha y hora desde requerida.' }
    ],
    'hasta': [
      { type: 'required', message: 'Fecha y hora hasta requerida.' }
    ],
    'puntos': [
      { type: 'required', message: 'Debe ingresar los puntos' }
    ],
    'imagenPath': [
      { type: 'required', message: 'Imagen requerida.' }
    ],
  };

  constructor(private fb: FormBuilder,
    private router: Router,
    private sucursalService: SucursalService,
    private canjeableService: ArticulocanjeableService,
    private route: ActivatedRoute,
    private http: HttpClient) {

    this.canjeableForm = this.fb.group({

      titulo: [this.canjeableSelect.titulo || '', Validators.required],
      subtitulo: [this.canjeableSelect.subtitulo || '', Validators.required],
      descripcion: [this.canjeableSelect.descripcion || '', Validators.required],
      puntos: [this.canjeableSelect.puntos || '', Validators.required],
      visibilidad: [this.canjeableSelect.visibilidad || '', Validators.required],
      desde: [this.canjeableSelect.desde || '', Validators.required],
      hasta: [this.canjeableSelect.hasta || '', Validators.required],
      imagen: [this.canjeableSelect.imagen_path || '', Validators.required],
      sucursales: [this.canjeableSelect.sucursales || ''],
    });

    this.sucursalService.getAllLight().then((data: any) => {
      this.sucursales = data.data;
    });

    if (this.route.snapshot.paramMap.get("id") != null) {
      this.modeEdit = true;
      this.loadCanjeable();
    }
  }

  ngOnInit(): void {
  }

  show() {
    console.log(this.canjeableForm.controls['desde'].value);
  }

  isGenerica() {
    if (this.canjeableForm.controls.visibilidad.value) {
      this.generica = true;
      return !this.canjeableForm.controls.visibilidad.value
    } else {
      this.generica = false;
      return false
    }
  }


  loadCanjeable() {
    this.idCanjeableEdit = this.route.snapshot.paramMap.get("id");
    this.canjeableService.getCanjeable(this.idCanjeableEdit).then(result => {
      this.canjeableSelect = result.data;
      let sucursalesIds = this.canjeableSelect.sucursales.map(x => x.id);
      this.http.get(this.canjeableSelect.imagen_path, { responseType: 'blob' }).subscribe((data2: Blob) => {
        var c: any = data2;
        c.lastModifiedDate = new Date();
        c.filename = 'image';
        this.imageFile = {
          link: this.canjeableSelect.imagen_path,
          file: <File>data2,
          name: 'imagen'
        };
        this.canjeableForm.patchValue({
          titulo: this.canjeableSelect.titulo,
          subtitulo: this.canjeableSelect.subtitulo,
          descripcion: this.canjeableSelect.descripcion,
          puntos: this.canjeableSelect.puntos,
          visibilidad: this.canjeableSelect.visibilidad,
          desde: this.canjeableSelect.desde,
          hasta: this.canjeableSelect.hasta,
          imagen: <File>data2,
          sucursales: sucursalesIds
        });
      });
    });
    this.isGenerica();
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
        this.canjeableForm.controls['imagen'].setValue(this.imageFile.file);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }


  nuevoCanjeable() {
    this.normalizeDates();
    swal.fire({title:'Creando!',
              text: 'Aguarde un momento por favor...',
              icon: 'info',
              allowOutsideClick: false
    })
    swal.showLoading()
    this.canjeableService.newCanjeable(this.canjeableForm).
      then((result: any) => {

        if (result.code == 201) {
          swal.fire(
            'Creado!',
            'Se ha creado un nuevo artículo canjeable!',
            'success'
          ).then(result => {
            this.router.navigate(['/articuloscanjeables-list/']);
          })
        }

      }).catch((err: HttpErrorResponse) => {
        console.log('catch' + JSON.stringify(err));
        swal.fire(
          'Error!',
          'Hubo un error al actualizar: ' + this.errorMessage(err),
          'error'
        )
      })
  }

  errorMessage(err: HttpErrorResponse) {
    if (err.status === 0) {
      return 'No se encuentra conexión a internet'
    } else {
      return err.error.errors
    }
  }

  actualizarCanjeable() {
    this.normalizeDates();
    swal.fire({title:'Actualizando!',
              text: 'Aguarde un momento por favor...',
              icon: 'info',
              allowOutsideClick: false
    })
    swal.showLoading()
    this.canjeableService.updateCanjeable(this.canjeableForm, this.canjeableSelect.id).then(response => {
      swal.fire(
        'Actualizado!',
        'El articulo ha sido actualizado.',
        'success'
      ).then(result => {
        this.router.navigate(['/articuloscanjeables-list']);
      })
    });
  }

  sucursalSelect(sucursal) {
    console.log(this.sucursales[sucursal].selected = !this.sucursales[sucursal].selected);
    if (this.sucursales[sucursal].selected) {
      this.sucursalesIds.push(this.sucursales[sucursal].id)
    }
    if (!this.sucursales[sucursal].selected) {
      this.sucursalesIds = this.sucursalesIds.filter(element => {
        return element != this.sucursales[sucursal].id;
      })
    }
  }

  addCustomUser = (term) => ({ id: term, name: term });


  normalizeDates() {
    const formato = 'dd/MM/yyyy HH:mm';
    const desde = this.canjeableForm.controls['desde'].value;
    const hasta = this.canjeableForm.controls['hasta'].value;
    const locale = 'en-US';
    const formattedDesde = desde instanceof Date ? formatDate(desde, formato, locale) : desde;
    const formattedHasta = hasta instanceof Date ? formatDate(hasta, formato, locale) : hasta;
    this.canjeableForm.controls['desde'].setValue(formattedDesde);
    this.canjeableForm.controls['hasta'].setValue(formattedHasta);
  }
}
