import { FormGroup } from '@angular/forms';
import { ArticuloCanjeable } from '../model/articulocanjeable.model';
import { GeneralService } from './general.service';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { LocalStorageProvider } from '../providers/local-storage/local-storage.provider';
import { MatDialogModule } from '@angular/material/dialog';

@Injectable({
    providedIn: 'root'
})
export class ArticulocanjeableService extends GeneralService {

    url: string = environment.apiBase + '/canjeables/';

    constructor(
        private http: HttpClient,
        private localStorageProvider: LocalStorageProvider
    ) {
        super(localStorageProvider);

    }

    async getAll(): Promise<any> {
        return await this.http.get(this.url).toPromise();
    }

    async getCanjeable(id): Promise<any> {
        return await this.http.get(this.url + id).toPromise();
    }

    async newCanjeable(canjeableForm: FormGroup): Promise<any> {
        return new Promise((resolve, reject) => {
            this.getHeaders().then(headers => {
                const formData = new FormData();
                formData.append('titulo', canjeableForm.get('titulo').value);
                formData.append('subtitulo', canjeableForm.get('subtitulo').value);
                formData.append('descripcion', canjeableForm.get('descripcion').value);
                formData.append('puntos', canjeableForm.get('puntos').value);
                formData.append('visibilidad', canjeableForm.get('visibilidad').value);
                formData.append('desde', canjeableForm.controls['desde'].value);
                formData.append('hasta', canjeableForm.get('hasta').value);
                formData.append('fileImagenPath', canjeableForm.get('imagen').value);
                formData.append('activo', 'true');
                if (canjeableForm.get('visibilidad').value) {
                    formData.append('sucursales', JSON.stringify(''));
                } else {
                    formData.append('sucursales', JSON.stringify(canjeableForm.get('sucursales').value));
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

    async updateCanjeable(canjeableForm: FormGroup, id: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.getHeaders().then(headers => {
                const formData = new FormData();
                formData.append('titulo', canjeableForm.get('titulo').value);
                formData.append('subtitulo', canjeableForm.get('subtitulo').value);
                formData.append('descripcion', canjeableForm.get('descripcion').value);
                formData.append('puntos', canjeableForm.get('puntos').value);
                formData.append('visibilidad', canjeableForm.get('visibilidad').value);
                formData.append('desde', canjeableForm.get('desde').value);
                formData.append('hasta', canjeableForm.get('hasta').value);
                formData.append('fileImagenPath', canjeableForm.get('imagen').value);
                formData.append('activo', 'true');
                if (canjeableForm.get('visibilidad').value) {
                    formData.append('sucursales', JSON.stringify(''));
                } else {
                    formData.append('sucursales', JSON.stringify(canjeableForm.get('sucursales').value));
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

    async deleteCanjeanble(canjeable: ArticuloCanjeable): Promise<any> {
        return new Promise((resolve, reject) => {
            this.getHeaders().then(headers => {
                this.http.delete(this.url + canjeable.id, { headers }).toPromise().then(response => {
                    resolve(response);
                });
            });
        });
    }
}