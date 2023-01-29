import { GeneralService } from './general.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LocalStorageProvider } from '../providers/local-storage/local-storage.provider';
import { environment } from '../../../environments/environment';
import { FormGroup } from '@angular/forms';
import { Sucursal, SucursalResponse } from '../model/sucursal.model';



@Injectable({
    providedIn: 'root'
})
export class SucursalService extends GeneralService {

    url: string = environment.apiBase + '/sucursales/';

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
        return await this.http.get(this.url + 'by-orden').toPromise();
    }

    async getAllActivas(): Promise<any> {
        return await this.http.get(this.url + 'all-activos').toPromise();
    }

    async getSucursal(id): Promise<any> {
        return await this.http.get(environment.apiBase + '/sucursales/' + id).toPromise();
    }

    async getAllLight(): Promise<any> {
        return await this.http.get(this.url+'all/light').toPromise();
    }

    async newSucursal(sucursalForm: FormGroup): Promise<any> {
        return new Promise((resolve, reject) => {
            this.getHeaders().then(headers => {
                const formData = new FormData();
                formData.append('localidad', sucursalForm.get('localidad').value);
                formData.append('orden', sucursalForm.get('orden').value);
                formData.append('fileImagenPath', sucursalForm.get('imagen').value);
                formData.append('fileImagenResponsivePath', sucursalForm.get('imagenResponsive').value);
                formData.append('direccion', sucursalForm.get('direccion').value);
                formData.append('urlamigable', sucursalForm.get('urlamigable').value);
                formData.append('email', sucursalForm.get('email').value);
                formData.append('horarioApertura', sucursalForm.get('horarioApertura').value);
                formData.append('horarioCierre', sucursalForm.get('horarioCierre').value);
                formData.append('horarioInformacion', sucursalForm.get('horarioInformacion').value);
                formData.append('deliveryTiene', 'true');
                formData.append('deliveryTelefono', '');
                formData.append('deliveryCelular', '');
                formData.append('deliveryHorario', '');
                formData.append('deliveryCosto', '');
                formData.append('facebook', sucursalForm.get('facebook').value);
                formData.append('latitud', sucursalForm.get('latitud').value);
                formData.append('longitud', sucursalForm.get('longitud').value);
                formData.append('instagram', sucursalForm.get('instagram').value);
                formData.append('activo', 'true');
                console.log('headers', headers)
                console.log('url', this.url);
                this.http.post(this.url, formData, { headers })
                    .toPromise().then(response => {
                        resolve(response);
                    });
            });
        });
    }

    async deleteSucursal(sucursal: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.getHeaders().then(headers => {
                this.http.delete(this.url + sucursal.id, { headers }).toPromise().then(response => {
                    resolve(response);
                });
            });
        });
    }

    updateSucursalActivo(sucursal: Sucursal, activo: boolean) {
        return new Promise((resolve, reject) => {
            this.getHeaders().then(headers => {
                let body = {
                    'id': sucursal.id,
                    'activo': activo
                }
                console.log(body);
                this.http.post(this.url + 'active', body, { headers }).toPromise().then(response => {
                    resolve(response);
                });
            });
        });
    }

    updateProductos(productos: any) {
        return new Promise((resolve, reject) => {
            this.getHeaders('json').then(headers => {
                this.http.post(this.url + 'productos', productos, { headers }).toPromise().then(response => {
                    resolve(response);
                }).catch((err: HttpErrorResponse) => {
                    reject(err);
                });
            });
        });
    }

    async updateSucursal(sucursalForm: FormGroup, sucursalId: string) {
        return new Promise((resolve, reject) => {
            this.getHeaders().then(headers => {
                const formData = new FormData();
                formData.append('localidad', sucursalForm.get('localidad').value);
                formData.append('orden', sucursalForm.get('orden').value);
                formData.append('fileImagenPath', sucursalForm.get('imagen').value);
                formData.append('fileImagenResponsivePath', sucursalForm.get('imagenResponsive').value);
                formData.append('direccion', sucursalForm.get('direccion').value);
                formData.append('urlamigable', sucursalForm.get('urlamigable').value);
                formData.append('email', sucursalForm.get('email').value);
                formData.append('horarioApertura', sucursalForm.get('horarioApertura').value);
                formData.append('horarioCierre', sucursalForm.get('horarioCierre').value);
                formData.append('horarioInformacion', sucursalForm.get('horarioInformacion').value);
                formData.append('deliveryTiene', sucursalForm.get('deliveryTiene').value);
                formData.append('deliveryTelefono', sucursalForm.get('deliveryTelefono').value);
                formData.append('deliveryCelular', sucursalForm.get('deliveryCelular').value);
                formData.append('deliveryHorario', sucursalForm.get('deliveryHorario').value);
                formData.append('deliveryCosto', sucursalForm.get('deliveryCosto').value);
                formData.append('facebook', sucursalForm.get('facebook').value);
                formData.append('latitud', sucursalForm.get('latitud').value);
                formData.append('longitud', sucursalForm.get('longitud').value);
                formData.append('instagram', sucursalForm.get('instagram').value);
                formData.append('activo', 'true');
                console.log('headers', headers)
                console.log('url', this.url);
                this.http.put(this.url + sucursalId, formData, { headers })
                    .toPromise().then(response => {
                        resolve(response);
                    }).catch((err: HttpErrorResponse) => {
                        reject(err);
                    });
            });
        });
    }
}