import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import BaseEntity from './BaseEntity';
import Cupon from './Cupon';
import Promocion from './Promocion';
import Sabor from './Sabor';
import Sucursal from './Sucursal';

@Entity()
export default class CuponDiaCanje extends BaseEntity {

  @PrimaryGeneratedColumn()
  private id: number;

  @ManyToOne(type => Cupon)
  cupon: Cupon;

  @Column()
  dia_canje: string;

  @ManyToOne(type => Sucursal, { onDelete: 'CASCADE' })
  @JoinColumn()
  sucursal: Sucursal;

  setDiaCanje(dia: string): void {
      this.dia_canje = dia;
  }

  setId(id: number) {
      this.id = id;
  }

  getId(): number {
      return this.id;
  }

  getDiaCanje() {
      return this.dia_canje;
  }
  
}
