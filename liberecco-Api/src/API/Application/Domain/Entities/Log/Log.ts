import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
  JoinColumn,
  BeforeInsert
} from 'typeorm';

import BaseEntity from '../BaseEntity';
import Client from '../Client';
import OAuth2Token from '../OAuth2Token';

import LogRequest from './LogRequest'
import LogResponse from './LogResponse';

/**
* implements K20-299
* Que cada vez que se haga un movimiento en el sistema, ya se guardar o actualizar, eliminar se pueda guardar en esa tabla,
* que proceso se modifico, la hora de la modificacion el usuario y si fue por la AL o por el SGA
*
* Guardar url, que se envia, fecha y hora, peso de la data que se envio, peso de la data que recibio, cuantos segundo duro la ejecucion,
* guardar input o output, crear archivos para imput y output
* y colocarles los nombres que se puedan relacionar en json
* si lo puedes hacer con mongodb esta bien.
**/

@Entity({synchronize: true})
export default class Log extends BaseEntity {

  @PrimaryGeneratedColumn()
  private id: number;

  @ManyToOne(type => Client, client => client.logs )
  @JoinColumn()
  client : Client;

  @ManyToOne(type => OAuth2Token, token => token.logs )
  @JoinColumn()
  token : OAuth2Token;

  @Column()
  url : string;

  @Column()
  method : string;

  @OneToOne(type => LogRequest, request => request.log, { cascade : true, nullable : false } )
  request : LogRequest;

  @Column()
  sendSizeKB : number;

  @OneToOne(type => LogResponse, response => response.log, { cascade : true, nullable : false } )
  response : LogResponse;

  @Column({ type : 'double', nullable: true  })
  elapsedTimeInS : number;
  
  @Column({nullable: true})
  receiveSizeKB : number;

  @Column()
  isAvelon : boolean;

  @BeforeInsert()
  setIsAvelon(){
    this.isAvelon =Boolean(this.url.match(/^\/Avelon/));
  }

  setId(id: number){
    this.id = id;
  }

  getId() : number{
    return this.id;
  }

}
