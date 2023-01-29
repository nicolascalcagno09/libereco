import { Component, OnInit } from '@angular/core';
import { SucursalService } from 'src/services/sucursal.service';
import { ContactoService } from 'src/services/contacto.service';
import { Sucursal } from 'src/model/sucursal.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert2';
import { THIS_EXPR, ThrowStmt } from '@angular/compiler/src/output/output_ast';
import { equal } from 'assert';
import { ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import { Meta, Title } from '@angular/platform-browser';
import { Gtag } from 'angular-gtag';

declare function gtag_report_conversion();

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent implements OnInit {

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
  sucursales: Array<Sucursal> = [];
  formSucursal: boolean = false;
  seleccion: boolean = false;
  franquicia: boolean = false;
  sucursalSelect = {} as Sucursal;

  motivos: Array<any> = [
    { 'nombre': 'Consulta general', 'valor': 'Consulta General' },
    { 'nombre': 'Calificación de Franquicia', 'valor': 'Calificación de franquicia' },
    { 'nombre': 'Información sobre Franquicias', 'valor': 'Información sobre franquicias' },
    { 'nombre': 'Otro', 'valor': 'Otro' }
  ]

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

  validation_messages = {
    'mail': [
      { type: 'required', message: 'Campo requerido' }
    ],
    'apellido': [
      { type: 'required', message: 'Campo requerido' }
    ],
    'nombre': [
      { type: 'required', message: 'Campo requerido' }
    ],
    'motivoConsulta': [
      { type: 'required', message: 'Campo requerido' }
    ],
    'telefono': [
      { type: 'required', message: 'Campo requerido' }
    ]
  };

  constructor(private sucursalService: SucursalService,
    private contactoService: ContactoService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private metaService: Meta,
    private titleService: Title,
    private http: HttpClient,
    private gtag: Gtag) {


    this.franquicia = this.route.snapshot.paramMap.get("franquicia") == 'true' ? true : false;
    sucursalService.getAllActivasByOrden().then(result => {
      this.sucursales = result.data;
    })

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

    this.metaService.removeTag("name='description'")
    this.metaService.removeTag("property='og:site_name'")
    this.metaService.removeTag("property='og:title'")
    this.metaService.removeTag("property='og:type'")
    this.metaService.removeTag("property='og:url'")
    this.metaService.removeTag("name='og:image'")

    this.titleService.setTitle('Contactanos Libereco Helados');
    this.metaService.addTag({ name: 'description', content: "Todo lo que nos puedas aportar nos ayuda a crecer. Contanos tu experiencia Libereco, califica nuestras sucursales o contacta con nosotros" });
    this.metaService.addTag({ property: 'og:site_name', content: 'Contactanos - Libereco Helados' });
    this.metaService.addTag({ property: 'og:title', content: 'Todo lo que nos puedas aportar nos ayuda a crecer. Contanos tu experiencia Libereco, califica nuestras sucursales o contacta con nosotros' });
    this.metaService.addTag({ property: 'og:type', content: 'website' });
    this.metaService.addTag({ property: 'og:url', content: 'https://libereco.com.ar/contacto' });
    this.metaService.addTag({ name: 'og:image', content: 'https://libereco.com.ar/images/imagen-contacto.png' });

    this.buildForm();
  }

  validarConsultaGeneral() {
    if (this.contactoForm.get('apellido').value != '') {
      if (this.contactoForm.get('nombre').value != '') {
        if (this.contactoForm.get('mail').value != '') {
          if (this.contactoForm.get('telefono').value != '') {
            if (this.contactoForm.get('motivoConsulta').value != '') {
              if (this.contactoForm.get('consulta').value != '') {
                this.enviarYGuardar();
              } else {
                swal.fire(
                  'Por favor complete todos los campos e intente nuevamente.',
                  'Debe ingresar su consulta',
                  'error'
                )
              }
            } else {
              swal.fire(
                'Por favor complete todos los campos e intente nuevamente.',
                'Debe seleccionar un motivo de consulta',
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


  onSucursalSelect(value: string) {
    this.sucursalService.getSucursal(value).then(sucursal => {
      this.sucursalSelect = sucursal.data;
    });
  }

  enviarYGuardar() {
    let contacto: any = {
      correoElectronico: this.contactoForm.get('mail').value,
      apellido: this.contactoForm.get('apellido').value,
      nombre: this.contactoForm.get('nombre').value,
      telefono: this.contactoForm.get('telefono').value,
      motivoConsulta: this.contactoForm.get('motivoConsulta').value,
      consulta: this.consultaGeneral ? this.contactoForm.get('consulta').value : '',

      sucursal: this.calificacionDeFranquicias ? this.contactoForm.get('sucursal').value : null,
      porqueElegisLibereco: this.calificacionDeFranquicias ? this.porqueElegisLibereco : '',
      atencionEnLocal: this.calificacionDeFranquicias ? this.atencionEnElLocal : '',
      limpiezaEnLocal: this.calificacionDeFranquicias ? this.limpiezaEnElLocal : '',
      comoTeSentisteEnElLocal: this.calificacionDeFranquicias ? this.comoTeSentisEnLaHeladeria : '',
      sugerencias: this.contactoForm.get('sugerencias').value,
      productoPreferido: this.contactoForm.get('productoPreferido').value,
      saboresParaAgregar: this.contactoForm.get('saboresParaAgregar').value,
      tePodemosContactar: this.calificacionDeFranquicias ? this.tePodemosContactar : '',

      localidadDeInteres: this.informacionSobreFranquicias || this.franquicia ? this.contactoForm.get('localidadDeInteres').value : '',
      localidadDondeReside: this.informacionSobreFranquicias || this.franquicia ? this.contactoForm.get('localidadDondeReside').value : '',
      tieneExperienciaManejoComercios: this.informacionSobreFranquicias || this.franquicia ? this.contactoForm.get('tieneExperienciaManejoComercios').value : '',
      tieneExperienciaManejoPersonal: this.informacionSobreFranquicias || this.franquicia ? this.contactoForm.get('tieneExperienciaManejoPersonal').value : '',
      dedicacionActual: this.informacionSobreFranquicias || this.franquicia ? this.contactoForm.get('dedicacionActual').value : '',
      montoDisponibleParaInversion: this.informacionSobreFranquicias || this.franquicia ? this.contactoForm.get('montoDisponibleParaInversion').value : 0,
      porqueDeberiaSerElPropietario: this.informacionSobreFranquicias || this.franquicia ? this.contactoForm.get('porqueDeberiaSerElPropietario').value : '',
      

      leida: false,
      destacado: false
    }
    this.contactoService.newContacto(contacto).then(respuesta => {
      if (respuesta.code === 201) {
        let mail: any;
        if (this.contactoForm.get('motivoConsulta').value === 'Consulta General') {
          mail = {
            mailTo: 'contacto@liberecohelados.com.ar,ultimasoluciones@gmail.com',
            content: '<p>De: ' + contacto.apellido + ' ' + contacto.nombre + ' <br></p><p>Mail: ' + contacto.correoElectronico + ' <br></p><p>Telefono: ' + contacto.telefono + '<br></p><p>Motivo Consulta: ' + contacto.motivoConsulta + '<br></p><p>Consulta: ' + contacto.consulta + '<br></p>',
            subject: this.contactoForm.get('motivoConsulta').value
          }
        }
        if (this.contactoForm.get('motivoConsulta').value == 'Calificación de franquicia') {
          mail = {
            mailTo: 'contacto@liberecohelados.com.ar,ultimasoluciones@gmail.com,' + this.sucursalSelect.email,
            content: '<p>De: ' + contacto.apellido + ' ' + contacto.nombre + ' <br></p><p>Mail: ' + contacto.correoElectronico + ' <br></p><p>Telefono: ' + contacto.telefono + '<br></p><p>Motivo Consulta: ' + contacto.motivoConsulta + '<br></p><p>Sucursal: ' + this.sucursalSelect.localidad + '<br></p><p>Porqué elegis libereco: ' + contacto.porqueElegisLibereco + '<br></p><p>Atención en el local: ' + contacto.atencionEnLocal + ' puntos<br></p><p>Limpieza en el local: ' + contacto.limpiezaEnLocal + ' puntos<br></p><p>Cómo te sentiste en el local: ' + contacto.comoTeSentisteEnElLocal + ' puntos<br></p><p>¿Alguna sugerencia, reclamo o algo que nos quieras decir? ' + contacto.sugerencias + '<br></p><p>¿Tenes algun sabor o producto preferido? ' + contacto.productoPreferido + '<br></p><p>¿Qué sabores o productos te gustaría que tengamos? ' + contacto.saboresParaAgregar + '<br></p><p>¿Te podemos contactar desde nuestro equipo de atención al cliente? ' + contacto.tePodemosContactar + '<br></p>',
            subject: this.contactoForm.get('motivoConsulta').value
          }
        }
        if (this.contactoForm.get('motivoConsulta').value == 'Información sobre franquicias') {
          console.log("comercio --> " + contacto.tieneExperienciaManejoComercios)
          console.log("personal --> " + contacto.tieneExperienciaManejoPersonal)
          mail = {
            mailTo: 'contacto@liberecohelados.com.ar,ultimasoluciones@gmail.com',
            content: '<p>De: ' + contacto.apellido + ' ' + contacto.nombre + ' <br></p><p>Mail: ' + contacto.correoElectronico + ' <br></p><p>Telefono: ' + contacto.telefono + '<br></p><p>Motivo Consulta: ' + contacto.motivoConsulta + '<br></p></p><p>Localidad de Interés: ' + contacto.localidadDeInteres + '<br></p><p>Localidad donde reside: ' + contacto.localidadDondeReside + '<br></p><p>¿Tiene experiencia en el manejo de comercios?: ' + (contacto.tieneExperienciaManejoComercios=='true' ? "Si":"No") + '<br></p><p>¿Tiene experiencia en el manejo de personal?: ' + (contacto.tieneExperienciaManejoPersonal=='true' ? 'Si' : 'No') + '<br></p><p>Dedicación actual: ' + contacto.dedicacionActual + '<br></p><p>Monto disponible de inversión: ' + contacto.montoDisponibleParaInversion + '<br></p><p>¿Porque cree que deberiamos elegirlo para representar su ciudad?: ' + contacto.porqueDeberiaSerElPropietario + '<br></p>',
            subject: this.contactoForm.get('motivoConsulta').value
          }
        }
        this.contactoService.sendMail(mail);



        gtag_report_conversion();




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
      console.log("Error -->" + error)
      swal.fire(
        'Error al enviar la consulta',
        'Por favor intente nuevamente.',
        'error'
      )
    });
  }

  validarCalificacionFranquicias() {
    if (this.contactoForm.get('apellido').value != '') {
      if (this.contactoForm.get('nombre').value != '') {
        if (this.contactoForm.get('mail').value != '') {
          if (this.contactoForm.get('telefono').value != '') {
            if (this.contactoForm.get('motivoConsulta').value != '') {
              if (this.contactoForm.get('sucursal').value != '') {
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
                  'Debe seleccionar una sucursal',
                  'error'
                )
              }
            } else {
              swal.fire(
                'Por favor complete todos los campos e intente nuevamente.',
                'Debe seleccionar un motivo de consulta',
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

  validarInformacionSobreFranquicias() {
    if (this.contactoForm.get('apellido').value != '') {
      if (this.contactoForm.get('nombre').value != '') {
        if (this.contactoForm.get('mail').value != '') {
          if (this.contactoForm.get('telefono').value != '') {
            if (this.contactoForm.get('motivoConsulta').value != '') {
              if (this.contactoForm.get('localidadDeInteres').value != '') {
                if (this.contactoForm.get('localidadDondeReside').value != '') {
                  if (this.contactoForm.get('tieneExperienciaManejoComercios').value != '') {
                    if (this.contactoForm.get('tieneExperienciaManejoPersonal').value != '') {
                      if (this.contactoForm.get('dedicacionActual').value != '') {
                        if (this.contactoForm.get('montoDisponibleParaInversion').value != '') {
                          if (this.contactoForm.get('porqueDeberiaSerElPropietario').value != '') {
                            this.enviarYGuardar();
                          } else {
                            swal.fire(
                              'Por favor complete todos los campos e intente nuevamente.',
                              'Debe ingresar porque cree que deberiamos elegirlo para respresentar a su ciudad',
                              'error'
                            )
                          }
                        } else {
                          swal.fire(
                            'Por favor complete todos los campos e intente nuevamente.',
                            'Debe ingresar el monto disponible para de inversión',
                            'error'
                          )
                        }
                      } else {
                        swal.fire(
                          'Por favor complete todos los campos e intente nuevamente.',
                          'Debe ingresar su dedicación actual',
                          'error'
                        )
                      }
                    } else {
                      swal.fire(
                        'Por favor complete todos los campos e intente nuevamente.',
                        'Debe seleccionar si tiene experiencia en el manejo del personal',
                        'error'
                      )
                    }
                  } else {
                    swal.fire(
                      'Por favor complete todos los campos e intente nuevamente.',
                      'Debe seleccionar si tiene experiencia en el manejo de comercios',
                      'error'
                    )
                  }
                } else {
                  swal.fire(
                    'Por favor complete todos los campos e intente nuevamente.',
                    'Debe ingresar la localidad donde reside',
                    'error'
                  )
                }
              } else {
                swal.fire(
                  'Por favor complete todos los campos e intente nuevamente.',
                  'Debe ingresar la localidad de interes',
                  'error'
                )
              }
            } else {
              swal.fire(
                'Por favor complete todos los campos e intente nuevamente.',
                'Debe seleccionar un motivo de consulta',
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

  validarCamposGenerales() {
    if (this.contactoForm.get('apellido').value != '') {
      if (this.contactoForm.get('nombre').value != '') {
        if (this.contactoForm.get('mail').value != '') {
          if (this.contactoForm.get('telefono').value != '') {
            if (this.contactoForm.get('motivoConsulta').value != '') {
              return true;
            } else {
              swal.fire(
                'Por favor complete todos los campos e intente nuevamente.',
                'Debe seleccionar un motivo de consulta',
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

  enviar() {
    this.validarCamposGenerales();
    if (this.consultaGeneral) {
      this.validarConsultaGeneral();
    }
    if (this.calificacionDeFranquicias) {
      this.validarCalificacionFranquicias();
    }
    if (this.informacionSobreFranquicias || this.franquicia) {
      this.contactoForm.controls['motivoConsulta'].setValue('Información sobre franquicias');
      this.validarInformacionSobreFranquicias();
    }
  }

  motivoChange(event: any) {
    this.seleccion = true;

    if (this.contactoForm.get('motivoConsulta').value == 'Consulta General') {
      this.calificacionDeFranquicias = false;
      this.otro = false;
      this.informacionSobreFranquicias = false;
      this.consultaGeneral = true;
    }
    if (this.contactoForm.get('motivoConsulta').value == 'Calificación de franquicia') {
      this.consultaGeneral = false;
      this.otro = false;
      this.informacionSobreFranquicias = false;
      this.calificacionDeFranquicias = true;

    }
    if (this.contactoForm.get('motivoConsulta').value == 'Información sobre franquicias') {
      this.consultaGeneral = false;
      this.calificacionDeFranquicias = false;
      this.otro = false;
      this.informacionSobreFranquicias = true;

    }
    if (this.contactoForm.get('motivoConsulta').value == 'Otro') {
      this.consultaGeneral = false;
      this.calificacionDeFranquicias = false;
      this.informacionSobreFranquicias = false;
      this.otro = true;

    }
  }

  goToSeParte() {
    this.router.navigate(['/franquicias'])
  }
}
