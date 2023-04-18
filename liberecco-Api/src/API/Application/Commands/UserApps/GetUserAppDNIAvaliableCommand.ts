import Validator from '../../../Common/Validator';
import { Command } from 'simple-command-bus';

export class GetUserAppByUid{

}

export default class GetUserAppDNIAvaliableCommand extends Command {

  dni : string;
  

  private validator: Validator;

  constructor(dni : string) {
    super();
    this.dni = dni;

    
  }

  getDNI() {
    return this.dni;
  }
}
