import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';

import BaseEntity from './BaseEntity';
import TipoSabor from './TipoSabor';

@Entity()
export default class Sabor extends BaseEntity {

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

  @ManyToOne(type => TipoSabor)
  tipoSabor: TipoSabor;

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

  getTipoSabor(): TipoSabor {
    return this.tipoSabor;
  }

  setTipoSabor(value: TipoSabor) {
    this.tipoSabor = value;
  }

  getOrden(): number {
    return this.orden;
  }

  setOrden(value: number): void {
    this.orden = value;
  }
}
