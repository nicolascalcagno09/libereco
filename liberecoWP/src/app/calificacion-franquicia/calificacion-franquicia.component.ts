import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SucursalService } from 'src/services/sucursal.service';
import { ContactoService } from 'src/services/contacto.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert2';
import { Sucursal } from 'src/model/sucursal.model';

@Component({
  selector: 'app-calificacion-franquicia',
  templateUrl: './calificacion-franquicia.component.html',
  styleUrls: ['./calificacion-franquicia.component.scss']
})
export class CalificacionFranquiciaComponent implements OnInit {

  contactoForm: FormGroup;
  consultaGeneral: boolean = false;
  calificacionDeFranquicias: boolean = false;
  otro: boolean = false;
  informacionSobreFranquicias: boolean = false;
  limpiezaEnElLocal: String = '-1';
  atencionEnElLocal: String = '-1';
  porqueElegisLibereco: String = '-1';
  comoTeSentisEnLaHeladeria: String = '-1';
  tePodemosContactar: String = '-1';
  formSucursal: boolean = false;
  sucursalSelect = {} as Sucursal;

  porqueElegisLiberecoArray: Array<any> = [
    { 'nombre': 'Calidad y sabor', 'valor': 'calidad' },
    { 'nombre': 'Ubicación o cercanía', 'valor': 'ubicacion' },
    { 'nombre': 'Variedad de sabores', 'valor': 'sabores' },
    { 'nombre': 'Nuestra Atención', 'valor': 'atencion' },
    { 'nombre': 'Otro', 'valor': 'otro' }
  ]

  experiencia: Array<any> = [
    { 'nombre': 'Si', 'valor': 'true' },
    { 'nombre': 'No', 'valor': 'false' },
  ]

  personal: Array<any> = [
    { 'nombre': 'Si', 'valor': 'true' },
    { 'nombre': 'No', 'valor': 'false' },
  ]

  constructor(private sucursalService: SucursalService,
    private contactoService: ContactoService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient) {
    let id = this.route.snapshot.paramMap.get("sucursal");
    this.sucursalService.getSucursal(id).then(sucursal => {
      this.sucursalSelect = sucursal.data;
    });
  }

  porqueElegisLiberecoChange(value) {
    this.porqueElegisLibereco = value
  }

  limpiezaEnElLocalChange(value) {
    this.limpiezaEnElLocal = value
  }

  atencionEnElLocalChange(value) {
    this.atencionEnElLocal = value
  }

  comoTeSentisEnLaHeladeriaChange(value) {
    this.comoTeSentisEnLaHeladeria = value
  }

  tePodemosContactarChange(value) {
    this.tePodemosContactar = value
  }

  ngOnInit(): void {
    setTimeout(() => {
      window.scroll(0, 0);
    }, 100);
    this.buildForm();
  }

  buildForm() {
    this.contactoForm = this.fb.group({
      mail: ['', Validators.required],
      apellido: ['', Validators.required],
      nombre: ['', Validators.required],
      motivoConsulta: ['', Validators.required],
      telefono: ['', Validators.required],
      consulta: [''],
      sucursal: [null || ''],
      porqueElegisLibereco: [''],
      atencionEnLocal: [''],
      limpiezaEnLocal: [''],
      comoTeSentisteEnElLocal: [''],
      tePodemosContactar: [''],
      sugerencias: [''],
      productoPreferido: [''],
      saboresParaAgregar: [''],
      localidadDeInteres: [''],
      localidadDondeReside: [''],
      tieneExperienciaManejoComercios: [''],
      tieneExperienciaManejoPersonal: [''],
      dedicacionActual: [''],
      montoDisponibleParaInversion: [''],
      porqueDeberiaSerElPropietario: ['']
    });
  }

  enviar() {
    this.contactoForm.controls['motivoConsulta'].setValue('Calificación de franquicia');
    this.validar();
  }

  validar() {
    if (this.contactoForm.get('apellido').value != '') {
      if (this.contactoForm.get('nombre').value != '') {
        if (this.contactoForm.get('mail').value != '') {
          if (this.contactoForm.get('telefono').value != '') {
            if (this.porqueElegisLibereco != '-1') {
              if (this.limpiezaEnElLocal != '-1') {
                if (this.atencionEnElLocal != '-1') {
                  if (this.comoTeSentisEnLaHeladeria != '-1') {
                    if (this.tePodemosContactar != '-1') {
                      this.enviarYGuardar();
                    } else {
                      swal.fire(
                        'Por favor complete todos los campos e intente nuevamente.',
                        'Debe seleccionar si te podemos contactar',
                        'error'
                      )
                    }
                  } else {
                    swal.fire(
                      'Por favor complete todos los campos e intente nuevamente.',
                      'Debe seleccionar cómo te sentis en la heladeria',
                      'error'
                    )
                  }
                } else {
                  swal.fire(
                    'Por favor complete todos los campos e intente nuevamente.',
                    'Debe seleccionar cómo fue la atención en el local',
                    'error'
                  )
                }
              } else {
                swal.fire(
                  'Por favor complete todos los campos e intente nuevamente.',
                  'Debe seleccionar como es la limpieza en el local',
                  'error'
                )
              }
            } else {
              swal.fire(
                'Por favor complete todos los campos e intente nuevamente.',
                'Debe seleccionar porqué elegis libereco',
                'error'
              )
            }
          } else {
            swal.fire(
              'Por favor complete todos los campos e intente nuevamente.',
              'Debe ingresar su teléfono',
              'error'
            )
          }
        } else {
          swal.fire(
            'Por favor complete todos los campos e intente nuevamente.',
            'Debe ingresar su correo electrónico',
            'error'
          )
        }
      } else {
        swal.fire(
          'Por favor complete todos los campos e intente nuevamente.',
          'Debe ingresar su nombre',
          'error'
        )
      }
    } else {
      swal.fire(
        'Por favor complete todos los campos e intente nuevamente.',
        'Debe ingresar su apellido',
        'error'
      )
    }
  }

  enviarYGuardar() {
    let contacto: any = {
      correoElectronico: this.contactoForm.get('mail').value,
      apellido: this.contactoForm.get('apellido').value,
      nombre: this.contactoForm.get('nombre').value,
      telefono: this.contactoForm.get('telefono').value,
      motivoConsulta: this.contactoForm.get('motivoConsulta').value,
      consulta: '',

      sucursal: this.sucursalSelect,
      porqueElegisLibereco: this.porqueElegisLibereco,
      atencionEnLocal: this.atencionEnElLocal,
      limpiezaEnLocal: this.limpiezaEnElLocal,
      comoTeSentisteEnElLocal: this.comoTeSentisEnLaHeladeria,
      sugerencias: this.contactoForm.get('sugerencias').value,
      productoPreferido: this.contactoForm.get('productoPreferido').value,
      saboresParaAgregar: this.contactoForm.get('saboresParaAgregar').value,
      tePodemosContactar: this.tePodemosContactar,

      localidadDeInteres: '',
      localidadDondeReside: '',
      tieneExperienciaManejoComercios: '',
      tieneExperienciaManejoPersonal: '',
      dedicacionActual: '',
      montoDisponibleParaInversion: 0,
      porqueDeberiaSerElPropietario: '',

      leida: false,
      destacado: false

    }
    this.contactoService.newContacto(contacto).then(respuesta => {
      if (respuesta.code === 201) {
        let mail: any = {
          mailTo: 'contacto@liberecohelados.com.ar,ultimasoluciones@gmail.com,' + this.sucursalSelect.email,
          content: '<p>De: ' + contacto.apellido + ' ' + contacto.nombre + ' <br></p><p>Mail: ' + contacto.correoElectronico + ' <br></p><p>Telefono: ' + contacto.telefono + '<br></p><p>Motivo Consulta: ' + contacto.motivoConsulta + '<br></p><p>Sucursal: ' + this.sucursalSelect.localidad + '<br></p><p>Porqué elegis libereco: ' + contacto.porqueElegisLibereco + '<br></p><p>Atención en el local: ' + contacto.atencionEnLocal + ' puntos<br></p><p>Limpieza en el local: ' + contacto.limpiezaEnLocal + ' puntos<br></p><p>Cómo te sentiste en el local: ' + contacto.comoTeSentisteEnElLocal + ' puntos<br></p><p>¿Alguna sugerencia, reclamo o algo que nos quieras decir? ' + contacto.sugerencias + '<br></p><p>¿Tenes algun sabor o producto preferido? ' + contacto.productoPreferido + '<br></p><p>¿Qué sabores o productos te gustaría que tengamos? ' + contacto.saboresParaAgregar + '<br></p><p>¿Te podemos contactar desde nuestro equipo de atención al cliente? ' + contacto.tePodemosContactar + '<br></p>',
          subject: this.contactoForm.get('motivoConsulta').value
        }
        this.contactoService.sendMail(mail);
        swal.fire(
          'Consulta enviada con exito',
          'Nos pondremos en contacto pronto.',
          'success'
        )
      } else {
        swal.fire(
          'Error al enviar la consulta',
          'Por favor complete todos los campos e intente nuevamente.',
          'error'
        )
      }

    }).catch(error => {
      swal.fire(
        'Error al enviar la consulta',
        'Por favor intente nuevamente.',
        'error'
      )
    });
  }
}
