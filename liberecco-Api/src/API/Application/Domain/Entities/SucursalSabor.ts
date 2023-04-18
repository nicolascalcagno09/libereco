import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';

import BaseEntity from './BaseEntity';
import Sabor from './Sabor';
import Sucursal from './Sucursal';

@Entity()
export default class SucursalSabor extends BaseEntity {

  @PrimaryGeneratedColumn()
  private id: number;

  @ManyToOne(type => Sucursal,{ onDelete: 'CASCADE' })
  sucursal: Sucursal;

  @ManyToOne(type => Sabor)
  sabor: Sabor;

  @Column()
  estado: string;

  setId(id: number){
    this.id = id;
  }

  getId() : number{
    return this.id;
  }

  setEstado(estado: string) {
    this.estado = estado;
  }

  getEstado(){
    return this.estado;
  }

}
