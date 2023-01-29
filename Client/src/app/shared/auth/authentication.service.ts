import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from } from 'rxjs';
import {LocalStorageProvider} from "../providers/local-storage/local-storage.provider";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationState = new BehaviorSubject(null);
  dictionaryAcessState = new BehaviorSubject(null);

  constructor(
    private localStorageProvider: LocalStorageProvider
  ) {
    this.getDictionaryAccess();
  }

  /**
 * Get the last sucessfull login username
 * @returns the last username loged from this terminal
 */
  getUsername(): Observable<any> {
    return from(this.localStorageProvider.get(this.localStorageProvider.KEYS.USERNAME));
  }

  async checkToken() {
    return await this.localStorageProvider.get(this.localStorageProvider.KEYS.ACCESS_TOKEN).then(res => {
      if (res) {
        this.authenticationState.next(true);
        return true;
      } else {
        this.authenticationState.next(false);
        return false;
      }
    }, error => {
      return false
    });
  }

  async getDictionaryAccess() {
    return await this.localStorageProvider.get(this.localStorageProvider.KEYS.DICTIONARY_ACCESS).then(access => {
      if (access && typeof access == 'string') {
        access = JSON.parse(access);
      }
      this.dictionaryAcessState.next(access);
    });
  }

  async login(accessToken: string, user?: any, dictionary?, refreshToken?: string, expireDate?:string) {
    if (user) {
      await this.localStorageProvider.set(this.localStorageProvider.KEYS.USER_ID, user.id);
      await this.localStorageProvider.set(this.localStorageProvider.KEYS.USER, JSON.stringify(user));
    }
    if (refreshToken)
      await this.localStorageProvider.set(this.localStorageProvider.KEYS.REFRESH_TOKEN, refreshToken);
    if (dictionary) {
      await this.localStorageProvider.set(this.localStorageProvider.KEYS.DICTIONARY_ACCESS, JSON.stringify(dictionary)).then(() => {
        return this.getDictionaryAccess();
      });
    }
    if (expireDate) {
      await this.localStorageProvider.set(this.localStorageProvider.KEYS.EXPIRES_AT, expireDate);
    }
    return this.localStorageProvider.set(this.localStorageProvider.KEYS.ACCESS_TOKEN, `Bearer ${accessToken}`).then(() => {
      this.authenticationState.next(true);
    });
  }

  logout() {
    this.localStorageProvider.remove(this.localStorageProvider.KEYS.USER_ID);
    this.localStorageProvider.remove(this.localStorageProvider.KEYS.USER);

    return this.localStorageProvider.remove(this.localStorageProvider.KEYS.ACCESS_TOKEN).then((data) => {
      if (this.authenticationState.value) {
        this.authenticationState.next(false);
      }
    });
  }

  isAuthenticated():Promise<boolean> {
    // return this.authenticationState.getValue();
    return new Promise((resolve, reject) => {
      this.getCurrentTokenExpireDate().then(result => {
        resolve( new Date(result) > new Date());
      })
    })    
  }

  getCurrentTokenExpireDate(): Promise<string> {
    return this.localStorageProvider.get(this.localStorageProvider.KEYS.EXPIRES_AT).then(res => {
      if (res && typeof res == 'string') {
        return res;
      } else {
        return null;
      }
    });
  }


  getCurrentToken(): Promise<string> {
    return this.localStorageProvider.get(this.localStorageProvider.KEYS.ACCESS_TOKEN).then(res => {
      if (res && typeof res == 'string') {
        return res;
      } else {
        return null;
      }
    });
  }

  /**
   * @returns the stored refresh token
   */
  getCurrentRefreshToken(): Promise<string> {
    return this.localStorageProvider.get(this.localStorageProvider.KEYS.REFRESH_TOKEN).then(res => {
      if (res && typeof res == 'string') {
        return res;
      } else {
        return null;
      }
    });
  }

  getCurrentUserId(): Promise<number> {
    return this.localStorageProvider.get(this.localStorageProvider.KEYS.USER_ID).then(res => {
      if (res && typeof res == 'string') {
        let resAsInt = parseInt(res);
        if (resAsInt) {
          return resAsInt;
        } else {
          return null;
        }
      } else {
        return null;
      }
    });
  }

  getCurrentUser(): Promise<any> {
    return this.localStorageProvider.get(this.localStorageProvider.KEYS.USER).then(res => {
      if (res && typeof res == 'string') {
        return JSON.parse(res) || null;
      } else {
        return null;
      }
    });
  }  

  async isStoreUser(): Promise<boolean> {
    return (await this.getCurrentUser()).hasWarehouse;
  }
}
