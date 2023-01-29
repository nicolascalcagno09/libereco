export interface Sabor {
    id?: number,
    titulo?: string,
    descripcion?:string,
    imagen_path?:string,    
    activo?: boolean,
    tipoSabor?: SaborCategoria,
    orden?: number
}

export interface SaborCategoria{
    id?: string,
    nombre?: string
}