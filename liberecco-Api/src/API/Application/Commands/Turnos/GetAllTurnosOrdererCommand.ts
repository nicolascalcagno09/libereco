import { Command } from 'simple-command-bus';
import Validator from '../../../Common/Validator';

export default class GetAllTurnosOrdererCommand extends Command {

  id : number;
  

  private validator: Validator;

  constructor(id : number) {
    super();
    this.id = id;

    
  }

  getId() {
    return this.id;
  }
}
