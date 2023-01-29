import { FormGroup } from '@angular/forms';
import { Promocion } from '../model/promocion.model';
import { GeneralService } from './general.service';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LocalStorageProvider } from '../providers/local-storage/local-storage.provider';
import { zip } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PromocionService extends GeneralService {

    url: string = environment.apiBase + '/promociones/';

    constructor(
        private http: HttpClient,
        private localStorageProvider: LocalStorageProvider
    ) {
        super(localStorageProvider);

    }

    async getAll(): Promise<any> {
        return await this.http.get(this.url).toPromise();
    }

    async getPromocion(id): Promise<any> {
        return await this.http.get(this.url + id).toPromise();
    }

     async newPromocion(promocionForm: FormGroup): Promise<any> {
        return new Promise((resolve, reject) => {
            this.getHeaders().then(headers => {
                let diasDisponibles = promocionForm.get('diasDisponibles').value;
                diasDisponibles = diasDisponibles.filter(x=>x.enabled).map(x=>{
                    let hora_desde = x.hora_desde instanceof Date ? x.hora_desde.getHours() + ":" + x.hora_desde.getMinutes() : x.hora_desde;
                    let hora_hasta = x.hora_desde instanceof Date ? x.hora_hasta.getHours() + ":" + x.hora_hasta.getMinutes() : x.hora_hasta;
                    let diaDto = { dia: x.dia, hora_desde, hora_hasta}
                    return diaDto;
                });
                const formData = new FormData();
                formData.append('titulo', promocionForm.get('titulo').value);
                formData.append('subtitulo', promocionForm.get('subtitulo').value);
                formData.append('descripcion', promocionForm.get('descripcion').value);
                formData.append('equivalente', promocionForm.get('equivalente').value);
                formData.append('visibilidad', promocionForm.get('visibilidad').value);
                formData.append('puntos', promocionForm.get('puntos').value);
                formData.append('desde', promocionForm.get('desde').value);
                formData.append('hasta', promocionForm.get('hasta').value);
                formData.append('fileImagenPath', promocionForm.get('imagen').value);
                formData.append('activo', 'true');
                if(promocionForm.get('visibilidad').value){
                    formData.append('sucursales',  JSON.stringify(''));
                }else{
                    formData.append('sucursales', JSON.stringify(promocionForm.get('sucursales').value));
                }
                console.log(JSON.stringify(diasDisponibles));
                formData.append('diasDisponibles', JSON.stringify(diasDisponibles));
                formData.append('cantidadCanjeSemanal', promocionForm.get('cantidadCanjeSemanal').value);
                this.http.post(this.url, formData, { headers })
                    .toPromise().then(response => {
                        resolve(response);
                    });
            });
        });
    }

    async updatePromocion(promocionForm: FormGroup, id: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.getHeaders().then(headers => {
                const formData = new FormData();
                let diasDisponibles = promocionForm.get('diasDisponibles').value;
                diasDisponibles = diasDisponibles.filter(x=>x.enabled).map(x=>{
                    let hora_desde = x.hora_desde instanceof Date ? x.hora_desde.getHours() + ":" + x.hora_desde.getMinutes() : x.hora_desde;
                    let hora_hasta = x.hora_hasta instanceof Date ? x.hora_hasta.getHours() + ":" + x.hora_hasta.getMinutes() : x.hora_hasta;
                    let diaDto = { dia: x.dia, hora_desde, hora_hasta}
                    return diaDto;
                });
                formData.append('titulo', promocionForm.get('titulo').value);
                formData.append('subtitulo', promocionForm.get('subtitulo').value);
                formData.append('descripcion', promocionForm.get('descripcion').value);
                formData.append('equivalente', promocionForm.get('equivalente').value);
                formData.append('visibilidad', promocionForm.get('visibilidad').value);
                formData.append('puntos', promocionForm.get('puntos').value);
                formData.append('desde', promocionForm.get('desde').value);
                formData.append('hasta', promocionForm.get('hasta').value);
                formData.append('fileImagenPath', promocionForm.get('imagen').value);
                formData.append('activo', 'true');
                if(promocionForm.get('visibilidad').value){
                    formData.append('sucursales',  JSON.stringify(''));
                }else{
                    formData.append('sucursales', JSON.stringify(promocionForm.get('sucursales').value));
                }
                formData.append('diasDisponibles', JSON.stringify(diasDisponibles));
                formData.append('cantidadCanjeSemanal', promocionForm.get('cantidadCanjeSemanal').value);
                this.http.put(this.url+id, formData, { headers })
                    .toPromise().then(response => {
                        resolve(response);
                    });
            });
        });
    }

    async deletePromocion(promocion: Promocion): Promise<any> {
        return new Promise((resolve, reject) => {
            this.getHeaders().then(headers => {
                this.http.delete(this.url + promocion.id, { headers }).toPromise().then(response => {
                    resolve(response);
                });
            });
        });
    }
}