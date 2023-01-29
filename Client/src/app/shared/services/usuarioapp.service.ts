import { FormGroup } from '@angular/forms';
import { UsuarioApp } from '../model/usuarioapp.model';
import { GeneralService } from './general.service';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { LocalStorageProvider } from '../providers/local-storage/local-storage.provider';

@Injectable({
    providedIn: 'root'
})
export class UsuarioappService extends GeneralService {

    url: string = environment.apiBase + '/users-app/';

    constructor(
        private http: HttpClient,
        private localStorageProvider: LocalStorageProvider
    ) {
        super(localStorageProvider);

    }

    async getAll(): Promise<any> {
        return await this.http.get(this.url).toPromise();
    }
}