import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

import BaseEntity from './BaseEntity';
import Sabor from './Sabor';

@Entity()
export default class TipoSabor extends BaseEntity {

  @PrimaryGeneratedColumn()
  private id: number;

  @Column()
  nombre: string;

  @OneToMany(type => Sabor, sabores => sabores.tipoSabor)
  sabores: Sabor[];

  setReference(nombre: string): void {
    this.nombre = nombre;
  }

  setId(id: number){
    this.id = id;
  }

  getId() : number{
    return this.id;
  }

  setNombre(nombre: string) {
    this.nombre = nombre;
  }

  getNombre() {
    return this.nombre;
  }
}
