import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SucursalService } from 'app/shared/services/sucursal.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Novedad } from 'app/shared/model/novedad.model';
import swal from 'sweetalert2';
import { NovedadService } from 'app/shared/services/novedad.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-novedad-new',
  templateUrl: './novedad-new.component.html',
  styleUrls: ['./novedad-new.component.scss']
})
export class NovedadNewComponent implements OnInit {

  novedadForm: FormGroup;
  modeEdit: boolean = false;
  todas: boolean = true;
  novedadSelect: Novedad = {} as Novedad;
  imageFile: { link: string, file: any, name: string };
  sucursales: Array<any> = [];
  sucursalesIds: any = [];
  idNovedadEdit: String = null;
  novedades: Array<Novedad> = [];
  generica:boolean=true;
  
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
    'imagenPath': [
      { type: 'required', message: 'Imagen requerida.' }
    ],
  };

  constructor(private fb: FormBuilder,
    private router: Router,
    private sucursalService: SucursalService,
    private novedadService: NovedadService,
    private route: ActivatedRoute,
    private http: HttpClient) {

    this.novedadForm = this.fb.group({
      titulo: [this.novedadSelect.titulo || '', Validators.required],
      subtitulo: [this.novedadSelect.subtitulo || '', Validators.required],
      descripcion: [this.novedadSelect.descripcion || '', Validators.required],
      visibilidad: [this.novedadSelect.visibilidad],
      desde: [this.novedadSelect.desde || '', Validators.required],
      hasta: [this.novedadSelect.hasta || '', Validators.required],
      imagen: [this.novedadSelect.imagen_path || '', Validators.required],
      sucursales: [this.novedadSelect.sucursales || ''],
    });

    this.sucursalService.getAllLight().then((data: any) => {
      this.sucursales = data.data;
    });

    if (this.route.snapshot.paramMap.get("id") != null) {
      this.modeEdit = true;
      this.loadNovedad();
    }
  }

  ngOnInit(): void {
  }

  isGenerica() {
    if (this.novedadForm.controls.visibilidad.value) {
      this.generica = true;
      return !this.novedadForm.controls.visibilidad.value
    } else {
      this.generica = false;
      return false
    }
  }

  loadNovedad() {
    this.idNovedadEdit = this.route.snapshot.paramMap.get("id");
    this.novedadService.getNovedad(this.idNovedadEdit).then(result => {
      this.novedadSelect = result.data;
      let sucursalesIds = this.novedadSelect.sucursales.map(x => x.id);
      this.http.get(this.novedadSelect.imagen_path, { responseType: 'blob' }).subscribe((data2: Blob) => {
        var c: any = data2;
        c.lastModifiedDate = new Date();
        c.filename = 'image';
        this.imageFile = {
          link: this.novedadSelect.imagen_path,
          file: <File>data2,
          name: 'imagen'
        };
        this.novedadForm.patchValue({
          titulo: this.novedadSelect.titulo,
          subtitulo: this.novedadSelect.subtitulo,
          descripcion: this.novedadSelect.descripcion,
          visibilidad: this.novedadSelect.visibilidad,
          desde: this.novedadSelect.desde,
          hasta: this.novedadSelect.hasta,
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
        this.novedadForm.controls['imagen'].setValue(this.imageFile.file);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  nuevaNovedad() {
    this.normalizeDates();
    swal.fire({title:'Creando!',
              text: 'Aguarde un momento por favor...',
              icon: 'info',
              allowOutsideClick: false
    });
    swal.showLoading();
    this.novedadService.newNovedad(this.novedadForm).
      then((result: any) => {
        if (result.code == 201) {
          swal.fire(
            'Creación!',
            'Se ha creado una nueva novedad!',
            'success'
          ).then(result => {
            this.router.navigate(['/novedades-list/']);
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

  actualizarNovedad() {
    this.normalizeDates();
    swal.fire({title:'Actualizando!',
              text: 'Aguarde un momento por favor...',
              icon: 'info',
              allowOutsideClick: false
    });
    swal.showLoading();
    this.novedadService.updateNovedad(this.novedadForm, this.novedadSelect.id).then(response => {
      swal.fire(
        'Actualizada!',
        'La novedad ha sido actualizada.',
        'success'
      ).then(result=>{
        this.router.navigate(['/novedades-list']);
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

  errorMessage(err: HttpErrorResponse) {
    if (err.status === 0) {
      return 'No se encuentra conexión a internet'
    } else {
      return err.error.errors
    }
  }

  addCustomUser = (term) => ({ id: term, name: term });

  normalizeDates() {
    const formato = 'dd/MM/yyyy HH:mm';
    const desde = this.novedadForm.controls['desde'].value;
    const hasta = this.novedadForm.controls['hasta'].value;
    const locale = 'en-US';
    const formattedDesde = desde instanceof Date ? formatDate(desde, formato, locale) : desde;
    const formattedHasta = hasta instanceof Date ? formatDate(hasta, formato, locale) : hasta;
    this.novedadForm.controls['desde'].setValue(formattedDesde);
    this.novedadForm.controls['hasta'].setValue(formattedHasta);
  }

}
