/**
* @author Prixel
*
* Template for the delete command. It wraps the data needed for the Handler
**/
import Validator from '../../../Common/Validator';
import { Command } from 'simple-command-bus';

export default class DeleteCuponCommand extends Command {

  id : number;
  userId : number;

  private validator: Validator;

  constructor(id : number,userId : number) {
    super();
    this.id = id;
    this.userId = userId;
  }

  getId(){
    return this.id;
  }

  getUserId(){
    return this.userId;
  }
}
