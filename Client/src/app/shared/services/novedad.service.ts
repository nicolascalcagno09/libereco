import { FormGroup } from '@angular/forms';
import { Novedad } from '../model/novedad.model';
import { GeneralService } from './general.service';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { LocalStorageProvider } from '../providers/local-storage/local-storage.provider';

@Injectable({
    providedIn: 'root'
})
export class NovedadService extends GeneralService {

    url: string = environment.apiBase + '/novedades/';

    constructor(
        private http: HttpClient,
        private localStorageProvider: LocalStorageProvider
    ) {
        super(localStorageProvider);

    }

    async getAll(): Promise<any> {
        return await this.http.get(this.url).toPromise();
    }

    async getNovedad(id): Promise<any> {
        return await this.http.get(this.url + id).toPromise();
    }

    async newNovedad(novedadForm: FormGroup): Promise<any> {
        console.log("imagen novedad --> " + novedadForm.get('imagen').value)
        return new Promise((resolve, reject) => {
            this.getHeaders().then(headers => {
                const formData = new FormData();
                formData.append('titulo', novedadForm.get('titulo').value);
                formData.append('subtitulo', novedadForm.get('subtitulo').value);
                formData.append('descripcion', novedadForm.get('descripcion').value);
                formData.append('visibilidad', novedadForm.get('visibilidad').value);
                formData.append('desde', novedadForm.get('desde').value);
                formData.append('hasta', novedadForm.get('hasta').value);
                formData.append('fileImagenPath', novedadForm.get('imagen').value);
                formData.append('activo', 'true');
                if(novedadForm.get('visibilidad').value){
                    formData.append('sucursales',  JSON.stringify(''));
                }else{
                    formData.append('sucursales', JSON.stringify(novedadForm.get('sucursales').value));
                }
                console.log('headers', headers)
                console.log('url', this.url);
                this.http.post(this.url, formData, { headers })
                    .toPromise().then(response => {
                        resolve(response);
                    });
            });
        });
    }

    async updateNovedad(novedadForm: FormGroup, id: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.getHeaders().then(headers => {
                const formData = new FormData();
                formData.append('titulo', novedadForm.get('titulo').value);
                formData.append('subtitulo', novedadForm.get('subtitulo').value);
                formData.append('descripcion', novedadForm.get('descripcion').value);
                formData.append('visibilidad', novedadForm.get('visibilidad').value);
                formData.append('desde', novedadForm.get('desde').value);
                formData.append('hasta', novedadForm.get('hasta').value);
                formData.append('fileImagenPath', novedadForm.get('imagen').value);
                formData.append('activo', 'true');
                if(novedadForm.get('visibilidad').value){
                    formData.append('sucursales',  JSON.stringify(''));
                }else{
                    formData.append('sucursales', JSON.stringify(novedadForm.get('sucursales').value));
                }
                console.log('headers', headers)
                console.log('url', this.url);
                this.http.put(this.url + id, formData, { headers })
                    .toPromise().then(response => {
                        resolve(response);
                    });
            });
        });
    }
    async deleteNovedad(novedad: Novedad): Promise<any> {
        return new Promise((resolve, reject) => {
            this.getHeaders().then(headers => {
                this.http.delete(this.url + novedad.id, { headers }).toPromise().then(response => {
                    resolve(response);
                });
            });
        });
    }
}