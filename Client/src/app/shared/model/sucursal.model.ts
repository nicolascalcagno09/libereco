import { Sabor } from './sabor.model';
import { Producto } from './producto.model';
import { Presentacion } from './presentacion.model';


export interface PresentacionSucursal {
    presentacion: Presentacion,
    precio: number,
    fecha: Date,
    aprobado: boolean,
}

export interface SaborEstado {
    sabor: Sabor,
    estado: string
}

export interface Sucursal {
    id?: number,
    localidad?: string,
    orden?: number,
    direccion?: string,
    urlamigable?: string,
    email?: string,
    horario?: {
        apertura?: string,
        cierre?: string,
        informacion?: string,
    }
    deliveryTiene?: boolean,
    delivery?: {
        telefono?: string,
        celular?: string,
        horario?: string,
        costo?: string,
    }
    facebook?: string,
    instagram?: string,
    encuestaLink?: string,
    latitud?: string,
    longitud?: string,
    activo?: boolean,
    presentaciones?: Array<PresentacionSucursal>,
    productos?: Array<Producto>,
    saboresEstados?: Array<SaborEstado>
    imagen_path?: string,
    imagen_responsive_path?: string,
}

export interface SucursalResponse {

    id?: number,
    localidad?: string,
    direccion?: string,
    email?: string,
    horario?: {
        apertura?: string,
        cierre?: string,
        informacion?: string,
    };
    delivery: {
        telefono?: string,
        celular?: string,
        horario?: string,
        costo?: string,
    }
    deliveryTiene?: boolean,
    deliveryCosto?: string,
    facebook?: string,
    instagram?: string,
    encuestaLink?: string,
    latitud?: string,
    longitud?: string,
    activo?: boolean,
    presentaciones?: Array<PresentacionSucursal>,
    productos?: Array<Producto>,
    saboresEstados?: Array<SaborEstado>

}