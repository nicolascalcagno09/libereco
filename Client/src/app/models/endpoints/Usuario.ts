import { Sucursal } from 'app/shared/model/sucursal.model';

export namespace UsuarioModel {
  export interface Usuario {
    id?: number;
    email?: string;
    nombre: string;
    password?: string;
    address?: string;
    employeId?: number;
    hasWarehouse?: boolean;
    activo?: boolean;
    perfil?: string;
    sucursal?: Sucursal;
  }

  export interface ResponseIndex {
    data: Usuario[];
  }
  export interface ResponseStore {
    data: {
      id: number;
      email: string;
      nombre: string;
    };
    message: string;
    code: number;
  }

  export interface ResponseShow {
    data: {
      id: number;
      email: string;
      nombre: string;
      warehouse?: {
        id: number;
      };
      permits: [{
        id: number;
        warehouse: {
          nombre: string;
          id: number;
        },
        roles: [{
          id: number;
          rol: {
            id: number;
            nombre: string;
          }
        }]
      }]
    };
    message: string;
    code: number;
  }

  export interface ResponseUpdate {
    data: {
      id: number;
      email: string;
      nombre: string;
    };
    message: string;
    code: number;
  }

  export interface ResponseDestroy {
    data: number;
    message: string;
    code: number;
  }

  export interface ErrorResponseIndex {
    statusCode: number;
    status: number;
    code: number;
    message: string;
    nombre: string;
  }
}
