import {Injectable} from "@angular/core";
import * as CryptoJS from 'crypto-js';


const secretKey = "YourSecretKeyForEncryption&Descryption";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageProvider {


  public KEYS = {
    USERNAME: 'username',
    ACCESS_TOKEN: 'access_token',
    USER_ID: 'user_id',
    USER: 'user',
    REFRESH_TOKEN: 'refreshToken',
    DICTIONARY_ACCESS: 'dictionaryAcess',
    EXPIRES_AT: 'expires_at'
  };

  public set(key: string, value: any) {
    return new Promise((resolve, reject) => {
      localStorage.setItem(this.encryptKey(key), this.encrypt(value));
      resolve();
    });
  }

  public get(key: string) {
    return new Promise((resolve, reject) => {
      let value = localStorage.getItem(this.encryptKey(key));
      if (typeof value != 'undefined' && value != null) {
        resolve(this.decrypt(value));
      } else {
        resolve('');
      }
    });
  }

  public remove(key: string) {
    return new Promise((resolve, reject) => {
      localStorage.removeItem(this.decrypt(key));
      resolve();
    });
  }

  public clear() {
    return new Promise((resolve, reject) => {
      localStorage.clear();
      resolve();
    });
  }

  encrypt(value : string) : string{
    return btoa(CryptoJS.AES.encrypt(value.toString(), secretKey.trim()).toString());
  }

  encryptKey(value : string) : string{
    return btoa(value.toString());
  }

  decrypt(textToDecrypt : string){
    return CryptoJS.AES.decrypt(atob(textToDecrypt), secretKey.trim()).toString(CryptoJS.enc.Utf8);
  }

  decryptKey(textToDecrypt : string){
    return atob(textToDecrypt);
  }
}
