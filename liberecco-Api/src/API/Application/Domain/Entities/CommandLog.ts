import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

import BaseEntity from './BaseEntity';
import CommandInstanceServices from '../../Services/CommandInstances/CommandInstanceServices';
import CommandInstance from './CommandInstance';

@Entity({synchronize: true})
export default class CommandLog extends BaseEntity {

  @PrimaryGeneratedColumn()
  private id: number;
  
  @Column()
  private pid : number;
  
  @Column()
  private command : string;
  
  @Column('simple-json')
  private commandInput : object;

  /**
  * @function constructor CommandLog constructor
  * @param command Name of the executed command
  * @param log Log data to store
  * @param pid PID identifying the system process
  **/
  constructor( command : string, log : object, pid : number ){
    super( log );
    this.command = command;
    this.commandInput = log;
    this.pid = pid;
  }

  /**
  * @function setPid If no PID is provided, the current process pid is set
  * @param pid System PID
  **/
  setPid( pid? : number ){
    if ( !pid ) { this.pid = process.pid; }
    else { this.pid = pid; }
  }
  
  
  /**
  * @function getCommandInstance
  * The the CommandInstance associated with the Log.
  **/
  async getCommandInstance() : Promise<Array<CommandInstance>>{
    const commandInstanceServices = new CommandInstanceServices();
    const pid = this.pid;
    return await commandInstanceServices.find( { pid } );
  }
}
