import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';

import BaseEntity from '../BaseEntity';
import Log from './Log';

@Entity({synchronize: true})
export default class LogResponse extends BaseEntity {

  @PrimaryGeneratedColumn()
  private id: number;

  @OneToOne(type=> Log, log=> log.response, {onDelete: 'CASCADE'} )
  @JoinColumn()
  log : Log;

  @CreateDateColumn({type: "timestamp"})
  timestamp: Date;

  @Column('simple-json', { nullable : true })
  body;

  @Column()
  statusCode : number;

  setId(id: number){
    this.id = id;
  }

  getId() : number{
    return this.id;
  }

}
