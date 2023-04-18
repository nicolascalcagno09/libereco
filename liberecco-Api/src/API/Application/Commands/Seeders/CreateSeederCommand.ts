import { Command } from 'simple-command-bus';
import * as _ from 'lodash';
import { QueryRunner } from 'typeorm';

export default class CreateSeederCommand extends Command {
  constructor(body: Object) {
    super();
    _.assign(this, body);
  }
}
