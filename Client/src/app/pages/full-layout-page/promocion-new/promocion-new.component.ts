import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Promocion } from 'app/shared/model/promocion.model';
import { SucursalService } from 'app/shared/services/sucursal.service';
import swal from 'sweetalert2';
import { PromocionService } from 'app/shared/services/promocion.service';
import { formatDate } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { ItemsList } from '@ng-select/ng-select/lib/items-list';

@Component({
  selector: 'app-promocion-new',
  templateUrl: './promocion-new.component.html',
  styleUrls: ['./promocion-new.component.scss']
})
export class PromocionNewComponent implements OnInit {

  promocionForm: FormGroup;
  modeEdit: boolean = false;
  todas: boolean = true;
  promocionSelect: Promocion = {} as Promocion;
  imageFile: { link: string, file: any, name: string };
  sucursales: Array<any> = [];
  sucursalesIds: any = [];
  idPromocionEdit: String = null;
  promociones: Array<Promocion> = [];
  generica: boolean = true;
  diasDisponibles = [];
  validation_messages = {
    'titulo': [
      { type: 'required', message: 'Titulo requerido.' }
    ],
    'subtitulo': [
      { type: 'required', message: 'Subtitulo requerido.' }
    ],
    'descripcion': [
      { type: 'required', message: 'Descripcion requerida.' }
    ],
    'equivalente': [
      { type: 'required', message: 'Equivale en kilos requerido.' }
    ],
    'puntos': [
      { type: 'required', message: 'Puntos requerido.' }
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
    'cantidadCanjeSemanal': [
      { type: 'required', message: 'Cantidad de canjes por semana requerido.' }
    ],
  };

  constructor(private fb: FormBuilder,
    private router: Router,
    private sucursalService: SucursalService,
    private promocionService: PromocionService,
    private route: ActivatedRoute,
    private http: HttpClient) {

    this.diasDisponibles = [
      this.fb.group({ "dia": "lunes", "hora_desde": "", "hora_hasta": "", "enabled": false }),
      this.fb.group({ "dia": "martes", "hora_desde": "", "hora_hasta": "", "enabled": false }),
      this.fb.group({ "dia": "miercoles", "hora_desde": "", "hora_hasta": "", "enabled": false }),
      this.fb.group({ "dia": "jueves", "hora_desde": "", "hora_hasta": "", "enabled": false }),
      this.fb.group({ "dia": "viernes", "hora_desde": "", "hora_hasta": "", "enabled": false }),
      this.fb.group({ "dia": "sabado", "hora_desde": "", "hora_hasta": "", "enabled": false }),
      this.fb.group({ "dia": "domingo", "hora_desde": "", "hora_hasta": "", "enabled": false })
    ]

    this.promocionForm = this.fb.group({

      titulo: [this.promocionSelect.titulo || '', Validators.required],
      subtitulo: [this.promocionSelect.subtitulo || '', Validators.required],
      descripcion: [this.promocionSelect.descripcion || '', Validators.required],
      equivalente: [this.promocionSelect.equivalente || '', Validators.required],
      visibilidad: [this.promocionSelect.visibilidad],
      puntos: [this.promocionSelect.puntos || '', Validators.required],
      desde: [this.promocionSelect.desde || '', Validators.required],
      hasta: [this.promocionSelect.hasta || '', Validators.required],
      imagen: [this.promocionSelect.imagen_path || '', Validators.required],
      sucursales: [this.promocionSelect.sucursales || ''],
      cantidadCanjeSemanal: [this.promocionSelect.nro_canje_maximo_sem || '', Validators.required],
      diasDisponibles: this.fb.array(this.diasDisponibles)
    });

    this.sucursalService.getAllLight().then((data: any) => {
      this.sucursales = data.data;
    });

    if (this.route.snapshot.paramMap.get("id") != null) {
      this.modeEdit = true;
      this.loadPromocion();
    }
  }

  ngOnInit(): void {
    registerLocaleData(es);
  }

  loadPromocion() {
    this.idPromocionEdit = this.route.snapshot.paramMap.get("id");
    this.promocionService.getPromocion(this.idPromocionEdit).then(result => {
      this.promocionSelect = result.data;
      this.diasDisponibles = []
      let tmpDiasDisp = [{ "dia": "lunes", "hora_desde": "", "hora_hasta": "", "enabled": false },
                          { "dia": "martes", "hora_desde": "", "hora_hasta": "", "enabled": false },
                          { "dia": "miercoles", "hora_desde": "", "hora_hasta": "", "enabled": false },
                          { "dia": "jueves", "hora_desde": "", "hora_hasta": "", "enabled": false },
                          { "dia": "viernes", "hora_desde": "", "hora_hasta": "", "enabled": false },
                          { "dia": "sabado", "hora_desde": "", "hora_hasta": "", "enabled": false },
                          { "dia": "domingo", "hora_desde": "", "hora_hasta": "", "enabled": false }];

      for (const item of tmpDiasDisp) {
        let find = this.promocionSelect.dias_disponibles.find(x=>x.dia == item.dia);
        if (find) {
          item.hora_desde = find.hora_desde;
          item.hora_hasta = find.hora_hasta;
          item.enabled    = true;
        }
        this.diasDisponibles.push(this.fb.group(item));
      }                    

      let sucursalesIds = this.promocionSelect.sucursales.map(x => x.id);
      this.http.get(this.promocionSelect.imagen_path, { responseType: 'blob' }).subscribe((data2: Blob) => {
        var c: any = data2;
        c.lastModifiedDate = new Date();
        c.filename = 'image';
        this.imageFile = {
          link: this.promocionSelect.imagen_path,
          file: <File>data2,
          name: 'imagen'
        };
        this.promocionForm.patchValue({
          titulo: this.promocionSelect.titulo,
          subtitulo: this.promocionSelect.subtitulo,
          descripcion: this.promocionSelect.descripcion,
          equivalente: this.promocionSelect.equivalente,
          visibilidad: this.promocionSelect.visibilidad,
          puntos: this.promocionSelect.puntos,
          desde: this.promocionSelect.desde,
          hasta: this.promocionSelect.hasta,
          imagen: <File>data2,
          sucursales: sucursalesIds,
          cantidadCanjeSemanal: this.promocionSelect.nro_canje_maximo_sem,
        });
        this.promocionForm.setControl('diasDisponibles', this.fb.array(this.diasDisponibles || []));
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
        this.promocionForm.controls['imagen'].setValue(this.imageFile.file);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  nuevaPromocion() {
    this.normalizeDates();
    swal.fire({title:'Creando!',
              text: 'Aguarde un momento por favor...',
              icon: 'info',
              allowOutsideClick: false
    })
    swal.showLoading()
    this.promocionService.newPromocion(this.promocionForm).
      then((result: any) => {

        if (result.code == 201) {
          swal.fire(
            'Creación!',
            'Se ha creado una nueva promoción!',
            'success'
          ).then(result => {
            this.router.navigate(['/promociones-list/']);
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

  isGenerica() {
    if (this.promocionForm.controls.visibilidad.value) {
      this.generica = true;
      return !this.promocionForm.controls.visibilidad.value
    } else {
      this.generica = false;
      return false
    }
  }

  actualizarPromocion() {
    this.normalizeDates();
    swal.fire({title:'Actualizando!',
              text: 'Aguarde un momento por favor...',
              icon: 'info',
              allowOutsideClick: false
    })
    swal.showLoading()

    this.promocionService.updatePromocion(this.promocionForm, this.promocionSelect.id).then(response => {
      swal.fire(
        'Actualizada!',
        'La promoción ha sido actualizada.',
        'success'
      ).then(result => {
        this.router.navigate(['/promociones-list']);
      })
    });
  }

  sucursalSelect(sucursal) {
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
    const desde = this.promocionForm.controls['desde'].value;
    const hasta = this.promocionForm.controls['hasta'].value;
    const locale = 'en-US';
    const formattedDesde = desde instanceof Date ? formatDate(desde, formato, locale) : desde;
    const formattedHasta = hasta instanceof Date ? formatDate(hasta, formato, locale) : hasta;
    this.promocionForm.controls['desde'].setValue(formattedDesde);
    this.promocionForm.controls['hasta'].setValue(formattedHasta);
  }

  onTimeChange(value: string) {
    console.log(value);
  }

  enableDay(item) {
    item.controls['enabled'].setValue(!item.value.enabled);
  }

  get diasFormArr(): FormArray {
    return this.promocionForm.get('diasDisponibles') as FormArray;
  }

  chequearHoras($event, dia, itemControl) {
    let desde = this.promocionForm.controls['diasDisponibles'].value.find(x=>x.dia == dia)?.hora_desde;
    let hasta = this.promocionForm.controls['diasDisponibles'].value.find(x=>x.dia == dia)?.hora_hasta;
    let desdef = desde instanceof Date ? desde.getHours() + ":" + desde.getMinutes() : desde;
    let hastaf = hasta instanceof Date ? hasta.getHours() + ":" + hasta.getMinutes() : hasta;
    if (desde && hasta && (desdef > hastaf)) {
      swal.fire(
        'Revisar el horario!',
        'Hora Desde no puede ser mayor que Hora Hasta.',
        'warning'
      ).then(result => {
        console.log(itemControl)
        itemControl.controls['hora_hasta'].setValue(desdef);
      })
    }
  }
}
