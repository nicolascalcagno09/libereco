import { Presentacion } from './presentacion.model';
import { Sabor } from './sabor.model';
export interface Producto {

    id?: number,
    nombre?: string,
    descripcion?:string,
    saborNombre?:string,    
    activo?: boolean,
    tieneSabor?:boolean,
    sabores?:Array<Sabor>
    presentaciones?:Array<Presentacion>

}