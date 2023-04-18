import CreateCanjeableCommand from '../Application/Commands/Canjeables/CreateCanjeableCommand';
import GetAllCanjeablesCommand from '../Application/Commands/Canjeables/GetAllCanjeablesCommand';
import GetSingleCanjeableCommand from '../Application/Commands/Canjeables/GetSingleCanjeableCommand';
import UpdateCanjeableCommand from '../Application/Commands/Canjeables/UpdateCanjeableCommand';
import DeleteCanjeableCommand from '../Application/Commands/Canjeables/DeleteCanjeableCommand';

import InvalidArgumentException from '../Application/Exceptions/InvalidArgumentException';
import NotFoundEntityException from '../Application/Exceptions/NotFoundEntityException'

import { success, error } from '../Common/Result';
import Validator from '../Common/Validator';
import CommandBus from '../Application/Commands/CommandBus';
import * as _ from 'lodash';

export default class CanjeableController {
  private validator: Validator;

  constructor() {
    this.validator = new Validator();
  }

  public async index(request, response, next) {
    try {
      const command = new GetAllCanjeablesCommand();
      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'Canjeable list retrieve', 200));
    } catch (e) {
      e.collection = 'Canjeable';
      next(e);
    }
  }

  public async store(request, response, next) {
    try {

      let body = Object.assign(request.fields, request.files);
      const command = new CreateCanjeableCommand(body);

      const result = await CommandBus.handle(command);
      delete result.sucursales;
      return response.status(201).json(success(result, 'Canjeable created', 201));
    } catch (e) {
      next(e)
    }
  }

  public async show(request, response, next) {
    try {
      if (!request.params.id) {
        throw new InvalidArgumentException("Canjeable's Id is required");
      }

      const command = new GetSingleCanjeableCommand(request.params.id);

      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'Canjeable retrieved', 200));
    } catch (e) {
      next(e);
    }
  }

  public async update(request, response, next) {
    try {
      // const command = new UpdateModelCommand( _.assign(request.body, {id: request.params.id}) );
      // const affected = await CommandBus.handle(command);
      let httpResponseCode;

      let body = Object.assign(request.fields, request.files);

      const command = new UpdateCanjeableCommand(  _.assign(body, {id: request.params.id})  );

      const result = await CommandBus.handle(command);
      delete result.sucursales;
      return response.status(201).json(success(result, 'Canjeable updated', 201));

      // return response.status(200).json(success(result, 'Servicio updated', 200));
    } catch (e) {
      next(e);
    }
  }

  public async destroy(request, response, next) {
    try {
      const command = new DeleteCanjeableCommand( request.params.id );
      const affected = await CommandBus.handle(command);

      let httpResponseCode;

      if (affected.raw.affectedRows && !affected.raw.changedRows) {
        // Entity deleted
        httpResponseCode = 200;
      } else if (affected.raw.affectedRows && affected.raw.changedRows) {
        // WierdCombination
        httpResponseCode = 200;
      } else if (!affected.raw.affectedRows && !affected.raw.changedRows) {
        // No container has been found
        throw new NotFoundEntityException(`Canjeable with Id ${command.getId()} not found`);
      }else if (!affected.raw.affectedRows && affected.raw.changedRows) {
        // Imposible combination, just to cover all posibilities
        httpResponseCode = 501;
      }

      /* This response can be status 204 No-Content without body */
      return response.status(httpResponseCode).json({
        data: {},
        message: affected.raw.message, // 'Container modified',
        code: httpResponseCode,
      });
    } catch (e) {
      next(e);
    }
  }

  public async showByUserId(request, response, next) {
    try {

      if (!request.params.id) {
        throw new InvalidArgumentException("UserId is required");
      }

      const command = new GetAllCanjeablesCommand(request.params.id);
      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'Canjeable list retrieve', 200));
    } catch (e) {
      e.collection = 'Canjeable';
      next(e);
    }
  }

}
