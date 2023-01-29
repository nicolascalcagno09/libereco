import { Injectable } from '@angular/core';
import {  HttpHeaders } from '@angular/common/http';
import { LocalStorageProvider } from '../providers/local-storage/local-storage.provider';

@Injectable({
    providedIn: 'root'
})
export class GeneralService {

    


    constructor(
        private localStorageProvider2: LocalStorageProvider
    ) { }

    getHeaders(content?: string): Promise<HttpHeaders> {
        return new Promise((resolve, reject) => {
            this.localStorageProvider2.get(this.localStorageProvider2.KEYS.ACCESS_TOKEN).then((token: any) => {
                let headers;
                if (token) {
                    if (content == 'json') {
                        headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
                    } else {
                        headers = new HttpHeaders({ 'Authorization': token });
                    }
                    resolve(headers)
                } else {
                    resolve(null);
                }

            });

        });

    }


}


