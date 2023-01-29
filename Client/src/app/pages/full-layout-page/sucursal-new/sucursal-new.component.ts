import { ProductoService } from './../../../shared/services/producto.service';
import { SucursalService } from './../../../shared/services/sucursal.service';
import { Sucursal } from './../../../shared/model/sucursal.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Presentacion } from 'app/shared/model/presentacion.model';
import { Producto } from 'app/shared/model/producto.model';
import { PresentacionService } from 'app/shared/services/presentacion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SaborCategoria } from 'app/shared/model/sabor.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-sucursal-new',
  templateUrl: './sucursal-new.component.html',
  styleUrls: ['./sucursal-new.component.scss']
})
export class SucursalNewComponent implements OnInit {


  sucursalForm: FormGroup;
  sucursalSelect: Sucursal = {} as Sucursal;
  modeEdit: boolean = false;
  idSucursalEdit: String = null;
  imageFile: { link: string, file: any, name: string };
  imageResponsiveFile: { link: string, file: any, name: string };
  deliveryValue: boolean = false;

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
    'orden': [
      { type: 'required', message: 'Orden requerido.' }
    ],
    'direccion': [
      { type: 'required', message: 'Direccion requerida.' }
    ],
    'urlamigable': [
      { type: 'required', message: 'Url Amigable requerida.' }
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
    'imagenResponsivePath': [
      { type: 'required', message: 'Imagen chica requerida.' }
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
    private productoService: ProductoService
  ) {


    this.loadForm();

    if (this.route.snapshot.paramMap.get("id") != null) {
      this.modeEdit = true;
      this.loadSucursal();
    }

  }

  ngOnInit() {
  }


  loadForm() {
    this.sucursalForm = this.fb.group({
      localidad: [this.sucursalSelect?.localidad || '', Validators.required],
      orden: [this.sucursalSelect?.orden || '', Validators.required],
      direccion: [this.sucursalSelect?.direccion || '', Validators.required],
      urlamigable: [this.sucursalSelect?.urlamigable || '', Validators.required],
      email: [this.sucursalSelect?.email || '', Validators.required],
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
    } else {
      this.deliveryValue = false;
      return false
    }
  }

  nuevo() {
    this.sucursalService.newSucursal(this.sucursalForm).then(response => {
      swal.fire(
        'Creado!',
        'La nueva Sucursal ha sido creada.',
        'success'
      )
        .then(result => {
          this.router.navigate(['/sucursales-list']);
        })
    });
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
          'Actualizado!',
          'La sucursal ha sido actualizada.',
          'success'
        ).then(result => {
          this.router.navigate(['/sucursales-list/']);
        })
      }
    }).catch((err: HttpErrorResponse) => {
      console.log('catch' + JSON.stringify(err));
      swal.fire(
        'Error!',
        'Hubo un error al actualizar: ' + this.errorMessage(err),
        'error'
      ).then(result => {
        this.router.navigate(['/sucursales-list/']);
      })
    })
  };

  errorMessage(err: HttpErrorResponse) {
    return err.error.errors
  }

  loadSucursal() {
    this.idSucursalEdit = this.route.snapshot.paramMap.get("id");
    this.sucursalService.getSucursal(this.idSucursalEdit).then(result => {
      this.sucursalSelect = result.data;
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
  }




}
