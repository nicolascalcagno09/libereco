import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import BaseEntity from './BaseEntity';
import Canjeable from './Canjeable';
import Promocion from './Promocion';
import User from './User';
import UserApp from './UserApp';
import { CuponType } from '../Enums/CuponType';
import CuponDiaCanje from './CuponDiaCanje';

@Entity()
export default class Cupon extends BaseEntity {

  @PrimaryGeneratedColumn()
  private id: number;

  @Column()
  estado: string;

  @ManyToOne(type => Promocion)
  promocion: Promocion;

  @ManyToOne(type => Canjeable)
  canjeable: Canjeable;

  @ManyToOne(type => UserApp)
  usuarioApp: UserApp;

  @ManyToOne(type => User, { nullable: true })
  usuarioScan: User;

  @Column({ type: 'enum', enum: CuponType })
  type: number;

  @OneToMany(type => CuponDiaCanje, cdc => cdc.cupon, { eager: true, cascade: true })
  dias_canjeados: CuponDiaCanje[];

  getEstado(): string {
    return this.estado;
  }

  setEstado(value: string): void {
    this.estado = value;
  }

  setId(id: number) {
    this.id = id;
  }

  getId(): number {
    return this.id;
  }

}
