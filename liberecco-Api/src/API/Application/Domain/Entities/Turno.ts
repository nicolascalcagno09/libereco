import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';

import BaseEntity from './BaseEntity';
import Sucursal from './Sucursal';

@Entity()
export default class Turno extends BaseEntity {

  @PrimaryGeneratedColumn()
  private id: number;

  @Column()
  diaDeLaSemana: number;

  @Column()
  abierto: boolean;

  @Column()
  horarioDeCorrido: boolean;

  @Column()
  inicioManiana: string;

  @Column()
  finManiana: string;

  @ManyToOne(type => Sucursal)
  sucursal: Sucursal;

  @Column()
  inicioTarde: string;

  @Column()
  finTarde: string;

  setId(id: number){
    this.id = id;
  }

  getId() : number{
    return this.id;
  }

  setDiaDeLaSemana(dia: number): void {
    this.diaDeLaSemana = dia;
  }

  getDiaDeLaSemana(){
    return this.diaDeLaSemana;
  }

  setAbierto(value: boolean): void {
    this.abierto = value;
  }

  getAbierto() {
    return this.abierto;
  }

  setHorarioDeCorrido(value: boolean): void {
    this.horarioDeCorrido = value;
  }

  getHorarioDeCorrido() {
    return this.horarioDeCorrido;
  }

  setInicioManiana(value: string): void {
    this.inicioManiana = value;
  }

  getInicioManiana() {
    return this.inicioManiana;
  }

  setFinManiana(value: string): void {
    this.finManiana = value;
  }

  getFinManiana() {
    return this.finManiana;
  }

  setInicioTarde(value: string): void {
    this.inicioTarde = value;
  }

  getInicioTarde() {
    return this.inicioTarde;
  }

  setFinTarde(value: string): void {
    this.finTarde = value;
  }

  getFinTarde() {
    return this.finTarde;
  }
}
