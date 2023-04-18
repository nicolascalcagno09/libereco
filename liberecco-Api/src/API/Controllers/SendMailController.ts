import { success, error } from '../Common/Result';
import Validator from '../Common/Validator';
import CommandBus from '../Application/Commands/CommandBus';
import * as _ from 'lodash';
import SendMailCommand from '../Application/Commands/Mail/SendMailCommand';

export default class SendMailController {
  private validator: Validator;

  constructor() {
    this.validator = new Validator();
  }

  public async send(request, response, next) {
    try {
      const command = new SendMailCommand(request.body);

      const result = await CommandBus.handle(command);

      return response.status(201).json(success(result, 'Visitas created', 201));
    } catch (e) {
      next(e)
    }
  }

  
}