import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  url: string = environment.apiBase + '/contactos/';

  constructor(
    private http: HttpClient,
  ) {
  }

  async newContacto(contacto: any): Promise<any> {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      let json = JSON.stringify(contacto);
      this.http.post(this.url, json, { headers })
        .toPromise().then(response => {
          resolve(response);
        });
    });
  }

  async sendMail(mail: any): Promise<any> {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      let json = JSON.stringify(mail);
      this.http.post(environment.apiBase + '/sendmail/', json, { headers })
        .toPromise().then(response => {
          resolve(response);
        });
    });
  }
}