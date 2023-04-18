import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import BaseEntity from './BaseEntity';
import Sucursal from './Sucursal';
import Presentacion from './Presentacion';

@Entity()
export default class SucursalPresentacion extends BaseEntity {

  @PrimaryGeneratedColumn()
  private id: number;

  @ManyToOne(type => Sucursal, { onDelete: 'CASCADE' })
  @JoinColumn()
  sucursal: Sucursal;

  @ManyToOne(type => Presentacion, { onDelete: 'CASCADE' })
  @JoinColumn()
  presentacion: Presentacion;

  @Column({ type: "float" })
  precio: number;

  @Column()
  fecha: Date;

  @Column()
  aprobado: boolean;

  setId(id: number) {
    this.id = id;
  }

  getId(): number {
    return this.id;
  }

}
