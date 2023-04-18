import Validator from '../../../Common/Validator';
import { Command } from 'simple-command-bus';

export class GetSingleSucursal{

}

export default class GetSingleSucursalByUrlCommand extends Command {

  urlamigable : string;
  

  private validator: Validator;

  constructor(url : string) {
    super();
    this.urlamigable = url;

    
  }

  getUrlamigable() {
    return this.urlamigable;
  }
}
