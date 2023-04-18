import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import BaseEntity from './BaseEntity';
import SucursalPresentacion from './SucursalPresentacion';
import Producto from './Producto';

@Entity()
export default class Presentacion extends BaseEntity {

  @PrimaryGeneratedColumn()
  private id: number;

  @Column()
  titulo: string;

  @Column()
  descripcion: string;

  @Column({ nullable: true })
  imagen_path: string;

  @Column()
  activo: boolean;

  @OneToMany(type => SucursalPresentacion, sucursales => sucursales.presentacion, { eager: true, onDelete: 'CASCADE' })
  sucursales: SucursalPresentacion[];

  @ManyToOne(type => Producto)
  producto: Producto;

  @Column({type: "float"})
  precio: number;

  @Column()
  orden: number;

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

  getSucursales() {
    return this.sucursales;
  }

  setProducto(producto: Producto) {
    this.producto = producto;
  }

  getProducto(): Producto{
    return this.producto;
  }
  setPrecio(precio: number) {
    this.precio = precio;
  }

  getPrecio() {
    return this.precio;
  }

  getOrden(): number {
    return this.orden;
  }

  setOrden(value: number): void {
    this.orden = value;
  }
}
