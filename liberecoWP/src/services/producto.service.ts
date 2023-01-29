import { Producto } from './../model/producto.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class ProductoService {

    url: string = environment.apiBase + '/productos/';

    constructor(
        private http: HttpClient,
    ) {

    }

    async getAll(): Promise<any> {
        return await this.http.get(this.url).toPromise();
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

    async getProductosActivosByOrdenConPresentacionesActivasByOrden(): Promise<any> {
        return await this.http.get(this.url + 'all-activos-by-orden/presentaciones-activas-by-orden').toPromise();
    } 
    

    async getAllActivosByOrden(): Promise<any> {
        return await this.http.get(this.url + 'all-activos/by-orden').toPromise();
    }

}