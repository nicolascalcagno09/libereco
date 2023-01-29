import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationProviderService } from 'app/shared/services/validation-provider.service'
import { UsuarioService } from 'app/shared/services/usuario.service';
import { AuthenticationService } from 'app/shared/auth/authentication.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  form: FormGroup;
  changingPassword: boolean = false;
  onErrorResponse: boolean
  onErrorResponseMsg: string;
  constructor(private router: Router, private formBuilder: FormBuilder, 
              private userService: UsuarioService, private auth: AuthenticationService) {
                
    this.form = this.formBuilder.group({
      oldPassword: [
        "",
        Validators.compose([
          Validators.minLength(5),
          Validators.required
        ])
      ],
      newPassword: [
        "",
        Validators.compose([
          Validators.minLength(5),
          Validators.required
        ])
      ],
      confirmPassword: [
        "",
        Validators.compose([
          Validators.minLength(5),
          Validators.required
        ])
      ],
    }, {
      validator: ValidationProviderService.MatchPassword
    });
  }

  ngOnInit() {
  }

  changePassword() {
    this.changingPassword = true;
    this.userService.updatePassword(this.form.controls['oldPassword'].value, this.form.controls['newPassword'].value).then(result => {
      this.form.reset();
      this.logout();
    }).catch(err => {
      if (err.status === 401) {
        this.onErrorResponse = true;
        this.changingPassword = false;
        this.onErrorResponseMsg = 'La contraseña actual ingresada es incorrecta.'
      } 
      if (err.status >= 404) {
        this.onErrorResponse = true;
        this.changingPassword = false;
        this.onErrorResponseMsg = 'Ocurrió un error. Comuníquese con el administrador.'
      }
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
