import Validator from '../../../Common/Validator';
import { Command } from 'simple-command-bus';
import RequiredFieldException from '../../Exceptions/RequiredFieldException'
import * as _ from 'lodash';

export default class UpsertTipoSaborCommand extends Command {
  private id;

  constructor(body : Object) {
    super();
    _.assign(this, body);
  }

  getId(){
    return this.id;
  }

}
