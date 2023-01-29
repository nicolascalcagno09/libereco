import { FormGroup } from '@angular/forms';
import { Sabor } from '../model/sabor.model';
import { GeneralService } from './general.service';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { LocalStorageProvider } from '../providers/local-storage/local-storage.provider';
import { Contacto } from '../model/contacto.model';

@Injectable({
    providedIn: 'root'
})
export class ContactoService extends GeneralService {

    url: string = environment.apiBase + '/contactos/';

    constructor(
        private http: HttpClient,
        private localStorageProvider: LocalStorageProvider
    ) {
        super(localStorageProvider);

    }

    async getAll(): Promise<any> {
        return await this.http.get(this.url).toPromise();
    }

    async getAllNoLeidos(): Promise<any> {
        return await this.http.get(this.url + 'all-no-leidas').toPromise();
    }

    async getContacto(id): Promise<any> {
        return await this.http.get(environment.apiBase + '/contactos/' + id).toPromise();
    }

    async getAllBySucursal(sucursalId: number): Promise<any> {
        console.log("SUCURSAL --> " + sucursalId)
        return await this.http.get(this.url + 'by-sucursal/' + sucursalId).toPromise();
    }

    async getAllNoLeidosBySucursal(sucursalId: number): Promise<any> {
        return await this.http.get(this.url + 'no-leidas-by-sucursal/' + sucursalId).toPromise();
    }

    async deleteContacto(contacto: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.getHeaders().then(headers => {
                this.http.delete(this.url + contacto.id, { headers }).toPromise().then(response => {
                    resolve(response);
                });
            });
        });
    }

    updateContactoLeido(contacto: Contacto, leida: boolean) {
        return new Promise((resolve, reject) => {
            this.getHeaders().then(headers => {
                let body = {
                    'id': contacto.id,
                    'leida': true
                }
                this.http.post(this.url + 'leida', body, { headers }).toPromise().then(response => {
                    resolve(response);
                });
            });
        });
    }

    updateContactoDestacado(contacto: Contacto, destacado: boolean) {
        return new Promise((resolve, reject) => {
            this.getHeaders().then(headers => {
                let body = {
                    'id': contacto.id,
                    'destacado': destacado
                }
                this.http.post(this.url + 'destacado', body, { headers }).toPromise().then(response => {
                    resolve(response);
                });
            });
        });
    }



}