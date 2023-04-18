import Validator from '../../../Common/Validator';
import { Command } from 'simple-command-bus';

export default class GetAllCuponBySucursalIdCommand extends Command {

  id: number;


  private validator: Validator;

  constructor(id: number) {
    super();
    this.id = id;


  }

  getSucursalId() {
    return this.id;
  }
}
