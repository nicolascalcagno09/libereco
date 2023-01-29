import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { AuthenticationService } from '../auth/authentication.service';

@Injectable({
  providedIn: 'root'
})

export class NotificacionService {
  /**routes for services */
  private getIndexUrl: string = environment.apiBase + '/push/send/';

  constructor(
    private http: HttpClient,
    private auth: AuthenticationService,
  ) { }

  async sendGeneralPush(body): Promise<any> {
    let currentToken = await this.auth.getCurrentToken();
    let headers = new HttpHeaders({ 'Authorization': currentToken });
    return new Promise((resolve, reject) => {
      this.http.post(this.getIndexUrl + 'all', body, { headers }).toPromise().then(response => {
        resolve(response);
      }).catch(error => {
        resolve(error)
      });
    });
  }

  async sendPush(body): Promise<any> {
    let currentToken = await this.auth.getCurrentToken();
    let headers = new HttpHeaders({ 'Authorization': currentToken });
    return new Promise((resolve, reject) => {
      this.http.post(this.getIndexUrl, body, { headers }).toPromise().then(response => {
        resolve(response);
      }).catch(error => {
        resolve(error)
      });
    });
  }

}
