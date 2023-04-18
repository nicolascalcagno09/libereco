import Validator from '../../../Common/Validator';
import { Command } from 'simple-command-bus';

export class GetSingleProducto{

}

export default class GetSingleProductoCommand extends Command {

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
