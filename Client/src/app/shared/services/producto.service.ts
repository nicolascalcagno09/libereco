import { Producto } from './../model/producto.model';
import { GeneralService } from './general.service';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { LocalStorageProvider } from '../providers/local-storage/local-storage.provider';

@Injectable({
    providedIn: 'root'
})
export class ProductoService extends GeneralService {

    url: string = environment.apiBase + '/productos/';

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
        return await this.http.get(this.url + 'all/by-orden').toPromise();
    }

    async getAllActivos(): Promise<any> {
        return await this.http.get(this.url + 'all-activos').toPromise();
    }

    async newProducto(producto: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.getHeaders('json').then(headers => {
                let json = JSON.stringify(producto);
                this.http.post(this.url, json, { headers })
                    .toPromise().then(response => {
                        resolve(response);
                    });
            });
        });
    }

    async updateProducto(producto: Producto, id:number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.getHeaders('json').then(headers => {
                let body = JSON.stringify(producto);
                this.http.put(this.url + id, body, { headers }).toPromise().then(response => {
                    resolve(response);
                });
            });

        });
    }

    async deleteProducto(producto: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.getHeaders().then(headers => {
                this.http.delete(this.url + producto.id, { headers }).toPromise().then(response => {
                    resolve(response);
                });
            });
        });
    }

    async getProducto(id): Promise<any> {
        return await this.http.get(this.url + id).toPromise();
    }
    async getProductoConPresentaciones(): Promise<any> {
        return await this.http.get(this.url + 'presentaciones').toPromise();
    }

    async getProductoConPresentacionesActivas(): Promise<any> {
        return await this.http.get(this.url + 'all-activos/presentaciones-activas').toPromise();
    }    

    updateProductoActivo(producto: Producto, activo:boolean) {
        return new Promise((resolve, reject) => {
            this.getHeaders().then(headers => {
                let body = {
                    'id': producto.id,
                    'activo': activo
                }
                console.log(body);
                this.http.post(this.url + 'active', body, { headers }).toPromise().then(response => {
                    resolve(response);
                });
            });
        });
    }

   
}