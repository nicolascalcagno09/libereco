import { Sucursal } from './sucursal.model';

export interface Contacto {

    id?: number,
    correoElectronico?: string,
    apellido?: string,
    nombre?: string,
    telefono?: string,
    motivoConsulta?: string,
    consulta?: string,
    sucursal?: Sucursal
    porqueElegisLibereco?: string,
    atencionEnLocal?: string,
    limpiezaEnLocal?: string,
    comoTeSentisteEnElLocal?: string,
    sugerencias?: string,
    productoPreferido?: string,
    saboresParaAgregar?: string,
    tePodemosContactar?: boolean
    createdAt?: Date
    leida?: boolean,
    destacado?: boolean

    //informacion sobre franquicias
    localidadDeInteres?: string,
    localidadDondeReside?: string,
    tieneExperienciaManejoComercios?: boolean,
    tieneExperienciaManejoPersonal?: boolean,
    dedicacionActual?: string,
    montoDisponibleParaInversion?: number,
    porqueDeberiaSerElPropietario?: string
}