import { Producto } from '../model/producto.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class SaborService {

    url: string = environment.apiBase + '/sabores/';

    constructor(
        private http: HttpClient,
    ) {

    }

    async getAll(): Promise<any> {
        return await this.http.get(this.url).toPromise();
    }
}