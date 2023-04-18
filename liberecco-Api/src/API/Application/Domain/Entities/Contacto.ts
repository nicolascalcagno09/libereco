import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';

import BaseEntity from './BaseEntity';
import Sucursal from './Sucursal';

@Entity()
export default class Contacto extends BaseEntity {

  @PrimaryGeneratedColumn()
  private id: number;

  @Column()
  correoElectronico: string;

  @Column()
  apellido: string;

  @Column()
  nombre: string;

  @Column()
  motivoConsulta: string;

  @ManyToOne(type => Sucursal)
  sucursal: Sucursal;

  @Column()
  porqueElegisLibereco: string;

  @Column()
  atencionEnLocal: string;

  @Column()
  limpiezaEnLocal: string;

  @Column()
  comoTeSentisteEnElLocal: string;

  @Column("text")
  sugerencias: string;

  @Column()
  productoPreferido: string;

  @Column()
  saboresParaAgregar: string;

  @Column()
  tePodemosContactar: boolean;

  @Column("text")
  consulta: string;

  @Column()
  telefono: string;

  @Column({default: false})
  leida: boolean;

  @Column()
  localidadDeInteres: string;

  @Column()
  localidadDondeReside: string;     

  @Column()
  tieneExperienciaManejoComercios: boolean;    

  @Column()
  tieneExperienciaManejoPersonal: boolean;   

  @Column()
  dedicacionActual: string; 

  @Column()
  montoDisponibleParaInversion: number;    

  @Column()
  porqueDeberiaSerElPropietario: string;

  @Column()
  destacado: boolean;

  getCorreoElectronico(): string {
    return this.correoElectronico;
  }

  setCorreoElectronico(value: string): void {
    this.correoElectronico = value;
  } 

  getApellido(): string {
    return this.apellido;
  }

  setApellido(value: string): void {
    this.apellido = value;
  } 

  getNombre(): string {
    return this.nombre;
  }

  setNombre(value: string): void {
    this.nombre = value;
  } 

  getMotivoDeConsulta(): string {
    return this.motivoConsulta;
  }

  setMotivoDeConsulta(value: string): void {
    this.motivoConsulta = value;
  } 

  getPorqueElegisLibereco(): string {
    return this.porqueElegisLibereco;
  }

  setPorqueElegisLibereco(value: string): void {
    this.porqueElegisLibereco = value;
  } 

  setAtencionEnLocal(value: string): void {
    this.atencionEnLocal = value;
  } 

  getAtencionEnLocal(): string {
    return this.atencionEnLocal;
  }

  getLimpiezaEnLocal(): string {
    return this.limpiezaEnLocal;
  }

  setLimpiezaEnLocal(value: string): void {
    this.limpiezaEnLocal = value;
  } 

  getComoTeSentisteEnElLocal(): string {
    return this.comoTeSentisteEnElLocal;
  }

  setComoTeSentisteEnElLocal(value: string): void {
    this.comoTeSentisteEnElLocal = value;
  }

  getSugerencias(): string {
    return this.sugerencias;
  }

  setSugerencias(value: string): void {
    this.sugerencias = value;
  } 

  getProductoPreferido(): string {
    return this.productoPreferido;
  }

  setProductoPreferido(value: string): void {
    this.productoPreferido = value;
  } 
  
  getSaboresParaAgregar(): string {
    return this.saboresParaAgregar;
  }

  setSaboresParaAgregar(value: string): void {
    this.saboresParaAgregar = value;
  } 

  getTePodemosContactar(): boolean {
    return this.tePodemosContactar;
  }

  setTePodemosContactar(value: boolean): void {
    this.tePodemosContactar = value;
  } 

  setId(id: number){
    this.id = id;
  }

  getId() : number{
    return this.id;
  }

  getConsulta(): string {
    return this.consulta;
  }

  setConsulta(value: string): void {
    this.consulta = value;
  }

  isLeida(): boolean {
    return this.leida;
  }

  setLeida(value: boolean): void {
    this.leida = value;
  } 

  getDescatado(): boolean {
    return this.destacado;
  }

  setDescatado(value: boolean): void {
    this.destacado = value;
  } 
}
