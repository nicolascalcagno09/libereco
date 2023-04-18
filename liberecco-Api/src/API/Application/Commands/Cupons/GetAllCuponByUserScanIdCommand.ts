import Validator from '../../../Common/Validator';
import { Command } from 'simple-command-bus';

export default class GetAllCuponByUserScanIdCommand extends Command {

  id: number;
  filters;

  private validator: Validator;

  constructor(id: number, filters?) {
    super();
    this.id = id;
    this.filters = filters;

  }

  getUserId() {
    return this.id;
  }

  getFilters() { 
    return this.filters;
  }
}
