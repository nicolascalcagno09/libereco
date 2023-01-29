import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'app/models/endpoints/Usuario';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from 'app/shared/services/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert2';
import { Sucursal } from 'app/shared/model/sucursal.model';
import { SucursalService } from 'app/shared/services/sucursal.service';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.scss']
})
export class UserNewComponent implements OnInit {



  usuarioForm: FormGroup;
  usuarioSelect: UsuarioModel.Usuario = {} as UsuarioModel.Usuario;
  isEdit: boolean = false;
  idUserEdit: string = null;
  sucursales: Array<Sucursal> = [ ]
  perfiles = ['Administrador', 'Sucursal']

  validation_messages = {
    'nombre': [
      { type: 'required', message: 'Nombre requerido.' }
    ],
    'email': [
      { type: 'required', message: 'Email requerida.' }
    ],
    'password': [
      { type: 'required', message: 'Contraseña requerida.' }
    ],
    'perfil': [
      { type: 'required', message: 'Perfil requerida.' }
    ],

  };
  constructor(
    private fb: FormBuilder,
    private userService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
    private sucursalService: SucursalService,
    private http: HttpClient) {
    this.usuarioForm = this.fb.group({
      nombre: [this.usuarioSelect.nombre || '', Validators.required],
      email: [this.usuarioSelect.email || '', Validators.required],
      password: [this.usuarioSelect.password || '', Validators.required],
      perfil: [this.usuarioSelect.perfil || null],
      sucursal: [this.usuarioSelect.sucursal || null],
    });

    if (this.route.snapshot.paramMap.get("id") != null) {
      this.isEdit = true;
      this.loadUsuario();
    }

    this.sucursalService.getAllLight().then((data:any) =>{
      this.sucursales = data.data.map((i) => { i.direccion = i.direccion + ' ' + i.localidad; return i; });
    });

  }

  ngOnInit() {
  }

  addCustomUser = (term) => ({ id: term, name: term });


  loadUsuario() {
    this.idUserEdit = this.route.snapshot.paramMap.get("id");
    this.userService.getUsuario(this.idUserEdit).then(result => {
      this.usuarioSelect = result.data;
      this.usuarioForm.patchValue({
        nombre: this.usuarioSelect.nombre,
        email: this.usuarioSelect.email,
        password: this.usuarioSelect.password,
        perfil: this.usuarioSelect.perfil,
        sucursal: this.usuarioSelect.sucursal
      });
    });
  }

  nuevoUsuario() {
    this.userService.newUsuario(this.usuarioForm).then(response => {
      swal.fire(
        'Creado!',
        'Nuevo usuario creado.',
        'success'
      )
      this.usuarioForm.reset();
    });
  }

  actualizarUsuario() {
    let usuario = this.usuarioForm.value;
    console.log(usuario)
    usuario.id = this.usuarioSelect.id;
    this.userService.updateUsuario(this.usuarioForm, usuario.id).then(result => {
      if (result != 400) {
        this.router.navigate(['/usuarios-list/']);
      } else {
        swal.fire(
          'Error!',
          'El usuario no ha sido creado. Verifique que sus datos sean correctos',
          'error'
        )
      }
    });
  }

}
