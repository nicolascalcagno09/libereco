import { Producto } from '../model/producto.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class TipoSaborService {

    url: string = environment.apiBase + '/tipo-sabores/';

    constructor(
        private http: HttpClient,
    ) {

    }

    async getAllConSabores(): Promise<any> {
        return await this.http.get(this.url + 'all-sabores').toPromise();
    }

    //ya los trae ordenados por orden 
    async getAllConSaboresActivos(): Promise<any> {
        return await this.http.get(this.url + 'all-sabores-activos').toPromise();
    }
}