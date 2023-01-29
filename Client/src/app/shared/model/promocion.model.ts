import { Sucursal } from './sucursal.model';
import { DiaDisponible } from './diaDisponible.model';

export interface Promocion {

    id?: number,
    titulo?: string,
    subtitulo?: string,
    descripcion?: string,
    imagen_path?: string,
    desde?: Date,
    hasta?: Date,
    equivalente?: number,
    puntos?: number,
    basesYCondiciones?: string,
    visibilidad?: boolean
    activo?: boolean,
    sucursales:Array<Sucursal>;
    nro_canje_maximo_sem: number,
    dias_disponibles: Array<DiaDisponible>;
}