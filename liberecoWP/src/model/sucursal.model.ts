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
    direccion?: string,
    email?: string,
    urlamigable?: string,
    horarioApertura?: string,
    horarioCierre?: string,
    horarioInformacion?: string,
    deliveryTiene?: boolean,
    deliveryTelefono?: string,
    deliveryCelular?: string,
    deliveryHorario?: string,
    deliveryCosto?: string,
    facebook?: string,
    instagram?: string,
    encuestaLink?: string,
    latitud?: string,
    longitud?: string,
    activo?: boolean,
    destacado?: boolean,
    presentaciones?: Array<PresentacionSucursal>,
    productos?: Array<Producto>,
    saboresEstados?: Array<SaborEstado>
    horario?: {
        apertura?: string,
        cierre?: string,
        informacion?: string,
    }
    delivery?: {
        telefono?: string,
        celular?: string,
        horario?: string,
        costo?: string,
    },
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