import { Producto } from './producto.model';

export interface Presentacion {

    id?: number,
    titulo?: string,
    descripcion?:string,
    imagen_path?:string,    
    producto?:Producto,
    activo?: boolean,
    precio?:number,
    selected?:boolean

}