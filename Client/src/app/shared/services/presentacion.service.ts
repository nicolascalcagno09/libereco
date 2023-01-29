import { Presentacion } from 'app/shared/model/presentacion.model';
import { GeneralService } from './general.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageProvider } from '../providers/local-storage/local-storage.provider';
import { environment } from 'environments/environment';
import { FormGroup } from '@angular/forms';


@Injectable({
    providedIn: 'root'
})
export class PresentacionService extends GeneralService {

    url: string = environment.apiBase + '/presentaciones/';

    constructor(
        private http: HttpClient,
        private localStorageProvider: LocalStorageProvider
    ) {
        super(localStorageProvider);

    }

    async getAll(): Promise<any> {
        return await this.http.get(this.url).toPromise();
    }

    async getAllByOrden(): Promise<any> {
        return await this.http.get(this.url + 'by-orden').toPromise();
    }
    
    async getPresentacion(id): Promise<any> {
        return await this.http.get(this.url + id).toPromise();
    }

    async newPresentacion(presentacionForm: FormGroup): Promise<any> {
        return new Promise((resolve, reject) => {
            this.getHeaders().then(headers => {
                const formData = new FormData();
                console.log(presentacionForm.get('titulo').value);
                formData.append('titulo', presentacionForm.get('titulo').value);
                formData.append('orden', presentacionForm.get('orden').value);
                formData.append('fileImagenPath', presentacionForm.get('imagen').value);
                formData.append('descripcion', presentacionForm.get('descripcion').value);
                formData.append('precio', presentacionForm.get('precio').value);
                formData.append('productoId', presentacionForm.get('producto').value)
                formData.append('activo', 'true');
                console.log('headers', headers)
                console.log('url', this.url);
                formData.forEach(data => {

                    console.log('data =>', data.toString());
                })
                this.http.post(this.url, formData, { headers })
                    .toPromise().then(response => {
                        resolve(response);
                    });
            });
        });
    }

    async updatePresentacion(presentacionForm: any, presentacionId: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.getHeaders().then(headers => {
                const formData = new FormData();
                formData.append('titulo', presentacionForm.get('titulo').value);
                formData.append('orden', presentacionForm.get('orden').value);
                formData.append('fileImagenPath', presentacionForm.get('imagen').value);
                formData.append('descripcion', presentacionForm.get('descripcion').value);
                formData.append('precio', presentacionForm.get('precio').value);
                formData.append('producto', presentacionForm.get('producto').value)
                formData.append('activo', 'true');
                console.log('headers', headers)
                console.log('url', this.url + presentacionId);
                formData.forEach(data => {

                    console.log('data =>', data.toString());
                })
                this.http.put(this.url + presentacionId, formData, { headers })
                    .toPromise().then(response => {
                        resolve(response);
                    });
            });

        });
    }

    updatePresentacionActivo(presentacion: Presentacion, activo:boolean) {
        return new Promise((resolve, reject) => {
            this.getHeaders().then(headers => {
                let body = {
                    'id': presentacion.id,
                    'activo': activo
                }
                console.log(body);
                this.http.post(this.url + 'active', body, { headers }).toPromise().then(response => {
                    resolve(response);
                });
            });
        });
    }

    async deletePresentacion(presentacion: Presentacion): Promise<any> {
        return new Promise((resolve, reject) => {
            this.getHeaders().then(headers => {
                this.http.delete(this.url + presentacion.id, { headers }).toPromise().then(response => {
                    resolve(response);
                });
            });
        });
    }

}