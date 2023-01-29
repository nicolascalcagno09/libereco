import {
  API,
  HeaderEntity,
  Auth1,
  Body,
  ItemEntity
} from './postman/Api.Team.postman_collection';
import { ServerPostmanEnvironment } from './postman/Server.postman_environment';
// @ts-ignore
import API_COLLECTION from './postman/Api.Team.postman_collection.json';
// @ts-ignore
import ENV_COLLECTION from './postman/Server.postman_environment.json';
import { environment } from 'environments/environment';

const ENV: ServerPostmanEnvironment = ENV_COLLECTION;
const API_BASE: API = API_COLLECTION;

// NOTE take URL from environment.ts in favour from the deprecated postman method
export const URL: string = environment.apiBase.replace(/\/api?$/, '');

export const ACCESS_TOKEN: string = ENV.values.find(
  value => value.key === 'access_token'
).value;

export const PATH: string | any = (collection: string, requestName: string) =>
  URL +
  '/' +
  API_BASE.item
    .find(it => it.name === collection)
    .item.find(it => it.name === requestName)
    .request.url.path.join('/');

export const HEADERS: HeaderEntity[] | any = (
  collection: string,
  requestName: string
) =>
  API_BASE.item
    .find(it => it.name === collection)
    .item.find(it => it.name === requestName).request.header;

export const AUTH: Auth1 | any = (collection: string, requestName: string) =>
  API_BASE.item
    .find(it => it.name === collection)
    .item.find(it => it.name === requestName).request.auth;

export const BODY: Body | any = (collection: string, requestName: string) =>
  API_BASE.item
    .find(it => it.name === collection)
    .item.find(it => it.name === requestName).request.body;

export const COLLECTIONS: ItemEntity[] = API_BASE.item;

export namespace AppInfo {
  export enum ClientSecretSGA {
    Username = 'vin_client_api',
    Password = 'fGx4=yU-j4^jAAjZtV+YTDsm-@R$HAK3'
  }

  export enum Name {
    Sga = 'SGA',
  }
}
