import { FormGroup } from '@angular/forms';
import { Sabor } from './../model/sabor.model';
import { GeneralService } from './general.service';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { LocalStorageProvider } from '../providers/local-storage/local-storage.provider';

@Injectable({
    providedIn: 'root'
})
export class TurnoService extends GeneralService {

    url: string = environment.apiBase + '/turnos/';

    constructor(
        private http: HttpClient,
        private localStorageProvider: LocalStorageProvider
    ) {
        super(localStorageProvider);

    }

    async getAllBySucursal(sucursalId): Promise<any> {
        console.log("getAllBySucursal --> " + sucursalId)
        return await this.http.get(this.url + 'by-sucursal/' + sucursalId).toPromise();
    }

    async getTurno(id:any): Promise<any> {
        return await this.http.get(this.url + id).toPromise();
    }
   
    async updateTurno(turno: any, id:number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.getHeaders('json').then(headers => {
                let body = JSON.stringify(turno);
                this.http.put(this.url + id, body, { headers }).toPromise().then(response => {
                    resolve(response);
                });
            });

        });
    }

}