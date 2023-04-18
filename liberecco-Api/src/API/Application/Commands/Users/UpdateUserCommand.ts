import Validator from '../../../Common/Validator';
import { Command } from 'simple-command-bus';
import { UpdateUserSchema } from '../../../Controllers/Schemas/UserSchema'
import RequiredFieldException from '../../Exceptions/RequiredFieldException'
import * as _ from 'lodash';

export default class UpdateUserCommand extends Command {
  private id;
  private password;
  private roleId;
  private roles;

  constructor(body : Object) {
    super();
    const validator = new Validator();
    const error = validator.validate(body, UpdateUserSchema);

    if(error) {
      throw new RequiredFieldException(validator.validationResult(error.details));
    }
    _.assign(this, body);
  }

  getId(){
    return this.id;
  }

  getPassword(){
    return this.password;
  }
  
  getRoleId(){
    return this.roleId;
  }
  
  getRoles(){
    return this.roles;
  }
}
