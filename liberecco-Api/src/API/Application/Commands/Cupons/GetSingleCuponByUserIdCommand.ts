import Validator from '../../../Common/Validator';
import { Command } from 'simple-command-bus';

export class GetSingleCupon{

}

export default class GetSingleCuponByUserIdCommand extends Command {

  id: number;
  filters;

  private validator: Validator;

  constructor(id: number, filters?) {
    super();
    this.id = id;
    this.filters = filters;

  }

  getId() {
    return this.id;
  }

  getFilters() { 
    return this.filters;
  }
}
