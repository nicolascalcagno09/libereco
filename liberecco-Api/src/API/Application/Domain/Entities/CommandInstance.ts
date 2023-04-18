import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeUpdate,
  BeforeInsert,
} from 'typeorm';
const DEFAULT_REFRESH_MILISECONDS_INTERVAL = 10000;
import BaseEntity from './BaseEntity';
import * as _ from 'lodash';
import CommandInstanceServices from '../../Services/CommandInstances/CommandInstanceServices';


const DEFAULT_MINUTES_TO_EXPIRE = 5;

@Entity({synchronize: true})
export default class CommandInstance extends BaseEntity {

  @PrimaryGeneratedColumn()
  private id: number;

  @Column()
  private command: string;

  @Column()
  pid : number;

  @Column({precision : 6})
  private expirationDate : Date;

  @BeforeUpdate()
  @BeforeInsert()
  public async refreshExpirationDate(msToIncrease = DEFAULT_REFRESH_MILISECONDS_INTERVAL){
    const commandInstanceServices = new CommandInstanceServices();
    const date = new Date();
    date.setMilliseconds(date.getMilliseconds() + msToIncrease );
    date.setMinutes(date.getMinutes() + DEFAULT_MINUTES_TO_EXPIRE );
    this.expirationDate = date;
  }

  setId(id: number) {
    this.id = id;
  }

  getId(): number {
    return this.id;
  }

}
