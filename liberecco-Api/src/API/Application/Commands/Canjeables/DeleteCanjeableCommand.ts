/**
* @author Prixel
*
* Template for the delete command. It wraps the data needed for the Handler
**/
import Validator from '../../../Common/Validator';
import { Command } from 'simple-command-bus';

export default class DeleteCanjeableCommand extends Command {

  id : number;

  private validator: Validator;

  constructor(id : number) {
    super();
    this.id = id;
  }

  getId(){
    return this.id;
  }
}
