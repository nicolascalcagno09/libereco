import { GeneralService } from './general.service';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageProvider } from '../providers/local-storage/local-storage.provider';
import { UsuarioModel } from 'app/models/endpoints/Usuario';
import { FormGroup } from '@angular/forms';
import { AuthenticationService } from '../auth/authentication.service';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService extends GeneralService {



    private getPasswordResetUrl: string = environment.apiBase + '/users/password/reset';
    url: string = environment.apiBase + '/usuarios';
    url1: string = environment.apiBase;

    constructor(
        private http: HttpClient,
        private localStorageProvider: LocalStorageProvider,
        private auth: AuthenticationService
    ) {
        super(localStorageProvider);

    }

    async getAll(): Promise<any> {
        return await this.http.get(this.url1 + '/users').toPromise();
    }

    async getUsuario(idUser: string): Promise<any> {
        return await this.http.get(this.url1 + '/users/' + idUser).toPromise();
    }


    async newUsuario(usuarioForm: FormGroup): Promise<any> {
        return new Promise((resolve, reject) => {
            this.getHeaders('json').then(headers => {
                let body = {
                    'nombre': usuarioForm.get('nombre').value,
                    'email': usuarioForm.get('email').value,
                    'password': usuarioForm.get('password').value,
                    'perfil': usuarioForm.get('perfil').value,
                    'sucursal': { 'id': usuarioForm.get('sucursal').value }
                };
                console.log(body)
                this.http.post(this.url1 + '/users/', body, { headers })
                    .toPromise().then(response => {
                        resolve(response);
                });
            });

        });
    }

    async deleteUser(usuario: UsuarioModel.Usuario) {
        return new Promise((resolve, reject) => {
            super.getHeaders('json').then(headers => {
                this.http.delete(this.url1 + '/users/' + usuario.id, { headers })
                    .toPromise().then(response => {
                        resolve(response);
                    }).catch(error => {
                        resolve(error)
                    });
            });
        });

    }

    async updateUsuario(usuarioForm: FormGroup, id: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.getHeaders('json').then(headers => {
                let body = {
                    'nombre': usuarioForm.get('nombre').value,
                    'email': usuarioForm.get('email').value,
                    'password': usuarioForm.get('password').value,
                    'perfil': usuarioForm.get('perfil').value,
                    'sucursal': { 'id': usuarioForm.get('sucursal').value }
                };
                console.log(body)
                this.http.put(this.url1 + '/users/' + id, body, { headers }).toPromise().then(response => {
                    resolve(response);
                });
            });

        });
    }

    async updatePassword(oldPassword: string, newPassword): Promise<any> {
        let currentToken = await this.auth.getCurrentToken();
        let currentUserId = await this.auth.getCurrentUserId();
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: currentToken });
        let body = {
          user_id: currentUserId,
          old_password: oldPassword,
          new_password: newPassword
        }
        return new Promise((resolve, reject) => {
          this.http.post(this.getPasswordResetUrl, body, { headers }).toPromise().then(response => {
            resolve(response);
          }).catch(error => {
            reject(error)
          });
        });
    
      }

}