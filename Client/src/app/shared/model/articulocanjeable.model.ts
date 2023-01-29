import { Sucursal } from "./sucursal.model";

export interface ArticuloCanjeable {

    id?: number,
    titulo?: string,
    subtitulo?: string,
    descripcion?: string,
    imagen_path?: string,
    visibilidad?: boolean,
    puntos?:number,
    desde?: Date,
    hasta?: Date,
    activo?: boolean,
    sucursales:Array<Sucursal>;

}
