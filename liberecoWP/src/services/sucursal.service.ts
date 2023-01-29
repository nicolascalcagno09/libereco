import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Sucursal } from '../model/sucursal.model';
import { environment } from '../environments/environment';



@Injectable({
    providedIn: 'root'
})
export class SucursalService {

    sucursalSelect = {} as Sucursal;

    url: string = environment.apiBase + '/sucursales/';

    constructor(
        private http: HttpClient,
    ) {

    }

    async getAll(): Promise<any> {
        return await this.http.get(this.url).toPromise();
    }

    async getAllActivas(): Promise<any> {
        return await this.http.get(this.url + 'all-activos').toPromise();
    }

    async getAllActivasByOrden(): Promise<any> {
        return await this.http.get(this.url + 'all-activos/by-orden').toPromise();
    }

    async getSucursal(id): Promise<any> {
        return await this.http.get(environment.apiBase + '/sucursales/' + id).toPromise();
    }

    async getSucursalByUrlAmigable(urlAmigable: string): Promise<any> {
        return await this.http.get(environment.apiBase + '/sucursales/' + urlAmigable).toPromise();
    }

    async getTurnosBySucursal(id): Promise<any> {
        return await this.http.get(environment.apiBase + '/turnos/by-sucursal/' + id).toPromise();
    }

}