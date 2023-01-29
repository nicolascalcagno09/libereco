import { SaborCategoria } from './../model/sabor.model';
import { GeneralService } from './general.service';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { LocalStorageProvider } from '../providers/local-storage/local-storage.provider';

@Injectable({
    providedIn: 'root'
})
export class SaborCategoriaService extends GeneralService {

    url: string = environment.apiBase + '/tipo-sabores/';

    constructor(
        private http: HttpClient,
        private localStorageProvider: LocalStorageProvider
    ) {
        super(localStorageProvider);

    }

    async getAll(): Promise<any> {
        return await this.http.get(this.url).toPromise();
    }

    async newSaborCategoria(categoria: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.getHeaders('json').then(headers => {
                let json = JSON.stringify(categoria);
                this.http.post(this.url, json, { headers })
                    .toPromise().then(response => {
                        resolve(response);
                    });
            });
        });
    }

    async updateSaborCategoria(categoria: SaborCategoria): Promise<any> {
        return new Promise((resolve, reject) => {
            this.getHeaders('json').then(headers => {
                let body = JSON.stringify(categoria);
                this.http.put(this.url + categoria.id, body, { headers }).toPromise().then(response => {
                    resolve(response);
                });
            });

        });
    }

    async deleteSaborCategoria(categoria: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.getHeaders().then(headers => {
                this.http.delete(this.url + categoria.id, { headers }).toPromise().then(response => {
                    resolve(response);
                });
            });
        });
    }

    async getSaborCategoria(id): Promise<any> {
        return await this.http.get(this.url + id).toPromise();
    }


}