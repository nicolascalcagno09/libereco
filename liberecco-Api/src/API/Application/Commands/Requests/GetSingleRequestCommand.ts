import Validator from '../../../Common/Validator';
import { Command } from 'simple-command-bus';

export class GetSingleRequest{

}

export default class GetSingleRequestCommand extends Command {

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
