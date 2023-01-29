export interface Turno {
    id?: number,
    tipo?: number,
    diaDeLaSemana?: number,
    abierto?: boolean,
    horarioDeCorrido?: boolean,
    inicioManiana?: string,
    finManiana?: string,
    inicioTarde?: string,
    finTarde?: string
}