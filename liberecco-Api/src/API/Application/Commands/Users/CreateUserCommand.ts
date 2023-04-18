import Validator from '../../../Common/Validator';
import { Command } from 'simple-command-bus';
import { StoreUserSchema } from '../../../Controllers/Schemas/UserSchema'
import * as _ from 'lodash';
import RequiredFieldException from '../../Exceptions/RequiredFieldException';
import NotFoundEntityException from '../../Exceptions/NotFoundEntityException';
import UserServices from '../../Services/Users/UserServices';

export default class CreateUserCommand extends Command {
  private password;
  private roles;
  private roleId;
  private permits;
  private createPermissions: boolean;

  constructor(body: Object, createPermissions?: boolean) {
    super();

    if (!body) throw Error('Body not found');

    const validator = new Validator();
    const error = validator.validate(body, StoreUserSchema);

    // if (body.hasOwnProperty('roles')) {
    //   Array(body['roles']).forEach(async (item) => {
    //     const roles = await roleServices.getById(item);

    //     if (!roles) {
    //       throw new NotFoundEntityException(`Role with id: ${item} not found`);
    //     }
    //   });
    // }

    if (error) {
      throw new RequiredFieldException(validator.validationResult(error.details));
    }

    this.createPermissions = createPermissions !== undefined ? createPermissions : true;
    _.assign(this, body);
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

  getPermits() {
    return this.permits;
  }
}
