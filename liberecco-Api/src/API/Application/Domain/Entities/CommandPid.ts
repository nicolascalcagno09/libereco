import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import BaseEntity from './BaseEntity';

@Entity({synchronize: true})
export default class CommandPid extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pid: number;

  @Column()
  alive: number
  
  @Column()
  softDeleted: number

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @BeforeUpdate()
  @BeforeInsert()
  setUpdatedAt(date? : Date) {
    let setDate = date;
    if (typeof date === 'undefined') {
      setDate = new Date();
    }
    this.updatedAt = setDate;
  }

  getId(): number {
    return this.id;
  }

  getPid(): number {
    return this.pid;
  }
  setPid(pid: number): void {
    this.pid = pid;
  }
  
  getAlive(): number {
    return this.alive;
  }
  setAlive(alive: number): void {
    this.alive = alive;
  }
  
  getSoftDeleted(): number {
    return this.softDeleted;
  }
  setSoftDeleted(softDeleted: number): void {
    this.softDeleted = softDeleted;
  }
}
