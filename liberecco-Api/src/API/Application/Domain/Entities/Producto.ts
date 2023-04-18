import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

import BaseEntity from './BaseEntity';
import Sabor from './Sabor';
import Presentacion from './Presentacion';

@Entity()
export default class Producto extends BaseEntity {

  @PrimaryGeneratedColumn()
  private id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column()
  activo: boolean;

  @ManyToMany(type => Sabor, { eager: true, cascade: true })
  @JoinTable({ name: "producto_sabores" })
  sabores: Sabor[];

  @Column()
  sabor_nombre: string;

  @Column()
  tiene_sabores: boolean;

  @OneToMany(type => Presentacion, presentaciones => presentaciones.producto)
  presentaciones: Presentacion[];

  @Column()
  orden: number;

  getNombre(): string {
    return this.nombre;
  }

  setNombre(value: string): void {
    this.nombre = value;
  }

  setId(id: number) {
    this.id = id;
  }

  getId(): number {
    return this.id;
  }

  setDescripcion(descripcion: string) {
    this.descripcion = descripcion;
  }

  getDescripcion(): string {
    return this.descripcion;
  }

  setActivo(activo: boolean) {
    this.activo = activo;
  }

  getActivo() {
    return this.activo;
  }

  getSabores() {
    return this.sabores;
  }

  setTieneSabor(tieneSabores: boolean) {
    this.tiene_sabores = tieneSabores;
  }

  getTieneSabores() {
    return this.tiene_sabores;
  }

  setSaborNombre(sabor_nombre: string) {
    this.sabor_nombre = sabor_nombre
  }

  getSaborNombre() {
    return this.sabor_nombre;
  }

  getOrden(): number {
    return this.orden;
  }

  setOrden(value: number): void {
    this.orden = value;
  }

}
