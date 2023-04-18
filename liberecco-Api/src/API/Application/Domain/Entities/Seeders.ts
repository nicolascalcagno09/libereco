import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

import BaseEntity from './BaseEntity';

@Entity({ synchronize: true })
export default class Seeders extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }

  getId(): number {
    return this.id;
  }
}
