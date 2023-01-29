import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Producto } from 'app/shared/model/producto.model';
import { Sucursal } from 'app/shared/model/sucursal.model';
import { LocalStorageProvider } from 'app/shared/providers/local-storage/local-storage.provider';
import { ProductoService } from 'app/shared/services/producto.service';
import { SucursalService } from 'app/shared/services/sucursal.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.component.html',
  styleUrls: ['./mis-datos.component.scss']
})
export class MisDatosComponent implements OnInit {

  sucursalForm: FormGroup;
  sucursalSelect: Sucursal = {} as Sucursal;
  modeEdit: boolean = false;
  idSucursalEdit: String = null;
  imageFile: { link: string, file: any, name: string };
  deliveryValue: boolean = false;
  imageResponsiveFile: { link: string, file: any, name: string };

  delivery: Array<any> = [
    { 'nombre': 'Si', 'valor': true },
    { 'nombre': 'No', 'valor': false },
  ]

  SaboresEstados: Array<any> = [
    { 'nombre': 'Disponible', 'valor': 'disponible' },
    { 'nombre': 'Sin Stock', 'valor': 'sin_stock' },
    { 'nombre': 'No Disponible', 'valor': 'no_disponible' },
  ]

  validation_messages = {

    'localidad': [
      { type: 'required', message: 'Localidad requerida.' }
    ],
    'direccion': [
      { type: 'required', message: 'Direccion requerida.' }
    ],
    'email': [
      { type: 'required', message: 'Email requerido.' }
    ],
    'horarioApertura': [
      { type: 'required', message: 'Horario de apertura requerido.' }
    ],
    'horarioCierre': [
      { type: 'required', message: ' horario decierre requerido.' }
    ],
    'horarioInformacion': [
      { type: 'required', message: 'informacion de horario requerido.' }
    ],
    'deliveryTelefono': [
      { type: 'required', message: ' telefono de delivery requerido' }
    ],
    'deliveryCelular': [
      { type: 'required', message: ' celular de delivery requerido.' }
    ],
    'deliveryHorario': [
      { type: 'required', message: 'delivery horario requerido.' }
    ],
    'deliveryCosto': [
      { type: 'required', message: 'delivery costo requerido.' }
    ],
    'facebook': [
      { type: 'required', message: 'facebook requerido.' }
    ],
    'instagram': [
      { type: 'required', message: 'instagram requerido.' }
    ],
    // 'encuestaLink': [
    //   { type: 'required', message: 'link encuesta requerido.' }
    // ],
    'latitud': [
      { type: 'required', message: 'latitud requerida.' }
    ],
    'longitud': [
      { type: 'required', message: 'longitud requerida.' }
    ],
    'imagenPath': [
      { type: 'required', message: 'Imagen requerida.' }
    ],
    // 'presentaciones': [
    //   { type: 'required', message: 'presentaciones requeridas.' }
    // ],
    // 'productos': [
    //   { type: 'required', message: 'productos requeridos.' }
    // ],
  };

  //DATAA!!
  productos: Array<Producto> = []

  isEdit: boolean = false;


  constructor(
    private fb: FormBuilder,
    private sucursalService: SucursalService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private productoService: ProductoService,
    private localStorage: LocalStorageProvider

  ) {

    this.loadForm()
    this.loadSucursal();

  }

  ngOnInit() {
  }

  loadForm() {
    this.sucursalForm = this.fb.group({
      localidad: [this.sucursalSelect?.localidad || '', Validators.required],
      direccion: [this.sucursalSelect?.direccion || '', Validators.required],
      orden: [this.sucursalSelect?.orden || '', Validators.required],
      email: [this.sucursalSelect?.email || '', Validators.required],
      urlamigable: [this.sucursalSelect?.urlamigable || '', Validators.required],
      horarioApertura: [this.sucursalSelect?.horario?.apertura || '', Validators.required],
      horarioCierre: [this.sucursalSelect?.horario?.cierre || '', Validators.required],
      horarioInformacion: [this.sucursalSelect?.horario?.informacion || '', Validators.required],
      deliveryTiene: [this.sucursalSelect?.deliveryTiene || false, Validators.required],
      deliveryTelefono: [this.sucursalSelect?.delivery?.telefono || ''],
      deliveryCelular: [this.sucursalSelect?.delivery?.celular || ''],
      deliveryHorario: [{ value: this.sucursalSelect?.delivery?.horario || '', disabled: true }],
      deliveryCosto: [{ value: this.sucursalSelect?.delivery?.costo || '', disabled: true }],
      facebook: [this.sucursalSelect?.facebook || '', Validators.required],
      instagram: [this.sucursalSelect?.instagram || '', Validators.required],
      latitud: [this.sucursalSelect?.latitud || '', Validators.required],
      longitud: [this.sucursalSelect?.longitud || '', Validators.required],
      imagen: [this.sucursalSelect?.imagen_path || '', Validators.required],
      imagenResponsive: [this.sucursalSelect?.imagen_responsive_path || '', Validators.required],
    });
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
        this.sucursalForm.controls['imagen'].setValue(this.imageFile.file);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  imagesResponsivePreview(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (_event: any) => {
        this.imageResponsiveFile = {
          link: _event.target.result,
          file: event.srcElement.files[0],
          name: event.srcElement.files[0].name
        };
        this.sucursalForm.controls['imagenResponsive'].setValue(this.imageResponsiveFile.file);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  hasDelivery() {
    if (this.sucursalForm.controls.deliveryTiene.value) {
      this.deliveryValue = true;
      return !this.sucursalForm.controls.deliveryTiene.value
      console.log("delivery value --> " + this.deliveryValue)
    } else {
      this.deliveryValue = false;
      console.log("delivery value --> " + this.deliveryValue)
      return false
    }
  }



  actualizar() {
    let sucursal = this.sucursalForm.value;
    sucursal.id = this.sucursalSelect.id;
    swal.fire(
      'Actualizando!',
      'actualizando por favor aguarde',
      'info'
    )
    this.sucursalService.updateSucursal(this.sucursalForm, sucursal.id).then(result => {
      if (result != 400) {
        swal.fire(
          'Hecho!',
          'Los Datos han sido actualizados',
          'success'
        ).then(r => this.loadSucursal())
      } else {
        swal.fire(
          'Error!',
          'Error al actualizar. Verifique que sus datos sean correctos',
          'error'
        )
      }
    });
  }

  loadSucursal() {
    this.localStorage.get(this.localStorage.KEYS.USER).then((result: any) => {
      this.sucursalService.getSucursal(JSON.parse(result).sucursal.id).then(result => {
        this.sucursalSelect = result.data;
        console.log(this.sucursalSelect);
        if (this.sucursalSelect.imagen_path != null) {
          this.http.get(this.sucursalSelect.imagen_path, { responseType: 'blob' }).subscribe((data2: Blob) => {
            var c: any = data2;
            c.lastModifiedDate = new Date();
            c.filename = 'image';
            this.imageFile = {
              link: this.sucursalSelect.imagen_path,
              file: <File>data2,
              name: 'imagen'
            };
            this.sucursalForm.controls['imagen'].setValue(this.imageFile.file);
            this.hasDelivery();

          });
        }
        if (this.sucursalSelect.imagen_responsive_path != null) {
          this.http.get(this.sucursalSelect.imagen_responsive_path, { responseType: 'blob' }).subscribe((data3: Blob) => {
            var c: any = data3;
            c.lastModifiedDate = new Date();
            c.filename = 'image_responsive';
            this.imageResponsiveFile = {
              link: this.sucursalSelect.imagen_responsive_path,
              file: <File>data3,
              name: 'imagen_responsive'
            };
            this.sucursalForm.controls['imagenResponsive'].setValue(this.imageResponsiveFile.file);
            this.hasDelivery();
          });
        }
        this.loadForm()
      });
    });

  }
}
