import { Sucursal } from './sucursal.model';

export interface Novedad {

    id?: number,
    titulo?: string,
    subtitulo?: string,
    descripcion?: string,
    imagen_path?: string,
    desde?: Date,
    hasta?: Date,
    visibilidad?: boolean,
    activo?: boolean,
    sucursales?:Array<Sucursal>;
}
