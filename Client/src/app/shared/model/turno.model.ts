import { Sucursal } from './sucursal.model';

export interface Turno {

    id?: number,
    tipo?:string,
    diaDeLaSemana?:number,    
    
    abierto?:boolean,
    horarioDeCorrido?:boolean,
    inicioManiana?: Date,
    finManiana?: Date,
    inicioTarde?: Date,
    finTarde?: Date,

    sucursal?:Sucursal

}