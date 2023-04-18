import { Command } from 'simple-command-bus';
import * as _ from 'lodash';
import QueueableMessage from '../../../Controllers/Schemas/ATLAS/QueueableMessage';
import DisplayAdapter from '../../../Controllers/Schemas/ATLAS/DisplayAdapter';

export default class SendMessageToQueueCommand extends Command {
  protected queue : string;
  protected  message : any;
  protected schema : any;
  
  constructor(queueableMessage: QueueableMessage) {
    super();
    _.assign(this, queueableMessage);
  }
  
  getQueue() : string {
    return this.queue;
  }
  
  getStringMessage() : string {
    return JSON.stringify(this.message);
  }
  
  getMessage() : DisplayAdapter {
    return this.message;
  }
  
  getSchema(){
    return this.schema
  }
  setSchema(schema){
    this.schema = schema;
  }
}