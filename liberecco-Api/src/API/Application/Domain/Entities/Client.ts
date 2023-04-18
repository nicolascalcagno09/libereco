import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
 // BaseEntity,
  OneToMany,
  JoinTable,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import BaseEntity from './BaseEntity';

import OAuth2Token from './OAuth2Token';
import { ClientTypes } from '../Enums/ClientTypes';
import Log from './Log/Log';

@Entity({synchronize: true})
export default class Client extends BaseEntity {
  @PrimaryGeneratedColumn()
  private id: number;

  @Column()
  name: string;

  @Column()
  secret: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: true })
  enabled: boolean;

  @OneToMany(type => OAuth2Token, token => token.client)
  @JoinTable()
  tokens: OAuth2Token[];

  // Hard coded grants,  MUST be in a table/entity
  grants = ['password', 'refresh_token'];

  @OneToMany(type=> Log, log=> log.client)
  logs : Log[];

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

  constructor(name? : string, secret? : string) {
    super();
    this.name = name;
    this.secret = secret;
  }

  getName() {
    return this.name;
  }

  set nombre(value: string){
    this.nombre = value;
  }

  isSga(): boolean {
    return this.getName() === ClientTypes.SGA;
  }

  isApp(): boolean {
    return this.getName() === ClientTypes.APP;
  }

  isAdmin(): boolean {
    return this.isApp() && this.isSga();
  }
}
