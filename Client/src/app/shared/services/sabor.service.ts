import { FormGroup } from '@angular/forms';
import { Sabor } from './../model/sabor.model';
import { GeneralService } from './general.service';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { LocalStorageProvider } from '../providers/local-storage/local-storage.provider';

@Injectable({
    providedIn: 'root'
})
export class SaborService extends GeneralService {

    url: string = environment.apiBase + '/sabores/';

    constructor(
        private http: HttpClient,
        private localStorageProvider: LocalStorageProvider
    ) {
        super(localStorageProvider);

    }

    async getAll(): Promise<any> {
        return await this.http.get(this.url).toPromise();
    }

    async getAllActivos(): Promise<any> {
        return await this.http.get(this.url + 'all-activos').toPromise();
    }

    async newSabor(saborForm: FormGroup): Promise<any> {
        return new Promise((resolve, reject) => {
            this.getHeaders().then(headers => {
                const formData = new FormData();
                console.log(saborForm.get('categoria').value);
                formData.append('titulo', saborForm.get('titulo').value);
                formData.append('fileImagenPath', saborForm.get('imagen').value);
                formData.append('descripcion', saborForm.get('descripcion').value);
                formData.append('tipoSaborId', saborForm.get('categoria').value);
                formData.append('orden', saborForm.get('orden').value);
                formData.append('activo', 'true');
                console.log('headers', headers)
                console.log('url', this.url);
                this.http.post(this.url, formData, { headers })
                    .toPromise().then(response => {
                        resolve(response);
                    });
            });
        });
    }

    async updateSabor(saborForm: FormGroup, id: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.getHeaders().then(headers => {
                const formData = new FormData();
                console.log(saborForm.get('titulo').value);
                formData.append('titulo', saborForm.get('titulo').value);
                formData.append('fileImagenPath', saborForm.get('imagen').value);
                formData.append('descripcion', saborForm.get('descripcion').value);
                formData.append('tipoSabor', saborForm.get('categoria').value);
                formData.append('orden', saborForm.get('orden').value);
                formData.append('activo', 'true');
                this.http.put(this.url+id, formData, { headers })
                    .toPromise().then(response => {
                        resolve(response);
                    });
            });
        });
    }

    updateSaborActivo(sabor: Sabor, activo:boolean) {
        return new Promise((resolve, reject) => {
            this.getHeaders().then(headers => {
                let body = {
                    'id': sabor.id,
                    'activo': activo
                }
                console.log(body);
                this.http.post(this.url + 'active', body, { headers }).toPromise().then(response => {
                    resolve(response);
                });
            });
        });
    }


    async deleteSabor(sabor: Sabor): Promise<any> {
        return new Promise((resolve, reject) => {
            this.getHeaders().then(headers => {
                this.http.delete(this.url + sabor.id, { headers }).toPromise().then(response => {
                    resolve(response);
                });
            });
        });
    }

    async getSabor(id): Promise<any> {
        return await this.http.get(this.url + id).toPromise();
    }

   


}