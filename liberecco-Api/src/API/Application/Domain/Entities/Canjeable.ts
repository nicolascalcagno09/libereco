import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
} from 'typeorm';

import BaseEntity from './BaseEntity';
import Sucursal from './Sucursal';
import { CONNREFUSED } from 'dns';

@Entity()
export default class Canjeable extends BaseEntity {

  @PrimaryGeneratedColumn()
  private id: number;

  @ManyToMany(type => Sucursal, sucursal => sucursal.canjeables)
  sucursales: Sucursal[];

  @Column()
  titulo: string;

  @Column()
  subtitulo: string;

  @Column()
  descripcion: string;

  @Column({ nullable: true })
  imagen_path: string;

  @Column()
  desde: string;

  @Column()
  hasta: string;

  @Column()
  activo: boolean;

  @Column()
  puntos: number;

  @Column()
  visibilidad: boolean;

  @Column({ nullable: true, type: "float" })
  equivalente: number;

  setId(id: number) {
    this.id = id;
  }

  getId(): number {
    return this.id;
  }

  setTitulo(titulo: string) {
    this.titulo = titulo;
  }

  getTitulo(): string {
    return this.titulo;
  }

  setSubtitulo(subtitulo: string) {
    this.subtitulo = subtitulo;
  }

  getSubtitulo(): string {
    return this.subtitulo;
  }

  setDescripcion(descripcion: string) {
    this.descripcion = descripcion;
  }

  getDescripcion(): string {
    return this.descripcion;
  }

  setImagenPath(imagenPath: string) {
    this.imagen_path = imagenPath;
  }

  getImagenPath(): string {
    return this.imagen_path;
  }

  setActivo(activo: boolean) {
    this.activo = activo;
  }

  getActivo() {
    return this.activo;
  }

  setDesde(value: string): void {
    this.desde = value;
  }

  getHasta() {
    return this.hasta;
  }

  setHasta(value: string): void {
    this.hasta = value;
  }

  setSucursales(value: Sucursal[]): void {
    this.sucursales = value;
  }

  getSucursales() {
    return this.sucursales;
  }

  getPuntos() {
    return this.puntos;
  }

  setPuntos(puntos: number) {
    this.puntos = puntos;
  }

  setVisibilidad(visibilidad: boolean) {
    this.visibilidad = visibilidad;
  }

  getVisibilidad() {
    return this.visibilidad;
  }

  setEquivalente(equivalente: number) {
    this.equivalente = equivalente;
}

  getEquivalente(): number {
      return this.equivalente;
  }
}
