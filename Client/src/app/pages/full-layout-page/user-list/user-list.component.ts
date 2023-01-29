import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'app/models/endpoints/Usuario';
import { UsuarioService } from 'app/shared/services/usuario.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import swal from 'sweetalert2';



@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  usuarios: Array<UsuarioModel.Usuario> = [];
  loadingIndicator: boolean = true;
  reorderable: boolean = true;
  usuarioSelect: UsuarioModel.Usuario = {} as UsuarioModel.Usuario;

  constructor(
    private userService: UsuarioService,
    private modalService: NgbModal,
    private router: Router
  ) {
    this.updateUsuarios();
  }

  ngOnInit() {
  }


  updateUsuarios() {
    this.userService.getAll().then(result => {
      this.usuarios = [...result.data];
    });
  }

  eliminarUsuario(usuario: UsuarioModel.Usuario) {
    swal.fire({
      title: 'Estás seguro?',
      text: 'Se borrará el Usuario, y no será posible recuperarlo!',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then(result => {
      if (result.value) {
        this.userService.deleteUser(usuario).then(response => {
          this.updateUsuarios();
          swal.fire(
            'Eliminado!',
            'El usuario ha sido eliminado.',
            'success'
          )
        })
      }
    })
  }

  verDetalles(content, row) {
    this.userService.getUsuario(row.id).then(usuario => {
      this.usuarioSelect = usuario.data;
      this.modalService.open(content, { size: 'lg', windowClass: 'dark-modal' });

    });

  }

  

  getNames(array: Array<any>): string {
    let result: string ='';
    if(array){
      array.forEach(element => {
        result = result + ', ' + element.nombre;
      });
    }
    return result.replace(' ,','');
  }

  editarUsuario(usuario: UsuarioModel.Usuario) {
    this.router.navigate(['/usuarios-new/', usuario.id]);
  }
}
