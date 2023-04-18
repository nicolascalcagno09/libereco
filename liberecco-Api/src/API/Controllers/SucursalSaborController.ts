import CreateSucursalSaborCommand from '../Application/Commands/SucursalSabors/CreateSucursalSaborCommand';
import GetAllSucursalSaborsCommand from '../Application/Commands/SucursalSabors/GetAllSucursalSaborsCommand';
import GetSingleSucursalSaborCommand from '../Application/Commands/SucursalSabors/GetSingleSucursalSaborCommand';
import UpdateSucursalSaborCommand from '../Application/Commands/SucursalSabors/UpdateSucursalSaborCommand';
import DeleteSucursalSaborCommand from '../Application/Commands/SucursalSabors/DeleteSucursalSaborCommand';

import InvalidArgumentException from '../Application/Exceptions/InvalidArgumentException';
import NotFoundEntityException from '../Application/Exceptions/NotFoundEntityException'

import { success, error } from '../Common/Result';
import Validator from '../Common/Validator';
import CommandBus from '../Application/Commands/CommandBus';
import * as _ from 'lodash';

export default class SucursalSaborController {
  private validator: Validator;

  constructor() {
    this.validator = new Validator();
  }

  public async index(request, response, next) {
    try {
      const command = new GetAllSucursalSaborsCommand();
      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'SucursalSabor list retrieve', 200));
    } catch (e) {
      e.collection = 'SucursalSabor';
      next(e);
    }
  }

  public async store(request, response, next) {
    try {
      const command = new CreateSucursalSaborCommand(request.body);

      const result = await CommandBus.handle(command);

      return response.status(201).json(success(result, 'SucursalSabor created', 201));
    } catch (e) {
      next(e)
    }
  }

  public async show(request, response, next) {
    try {
      if (!request.params.id) {
        throw new InvalidArgumentException("SucursalSabor's Id is required");
      }

      const command = new GetSingleSucursalSaborCommand(request.params.id);

      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'SucursalSabor retrieved', 200));
    } catch (e) {
      next(e);
    }
  }

  public async update(request, response, next) {
    try {
      // const command = new UpdateModelCommand( _.assign(request.body, {id: request.params.id}) );
      // const affected = await CommandBus.handle(command);
      let httpResponseCode;


      const command = new UpdateSucursalSaborCommand(  _.assign(request.body, {id: request.params.id})  );

      const affected = await CommandBus.handle(command);

      if (affected.raw.affectedRows && affected.raw.changedRows) {
        // Container has been updated successfully
        httpResponseCode = 200;
      } else if (affected.raw.affectedRows && !affected.raw.changedRows) {
        // Container exists but was not modify
        httpResponseCode = 409;
      } else if (!affected.raw.affectedRows && !affected.raw.changedRows) {
        // No container has been found
        throw new NotFoundEntityException(`SucursalSabor with Id ${command.getId()} not found`);
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

      // return response.status(200).json(success(result, 'SucursalSabor updated', 200));
    } catch (e) {
      next(e);
    }
  }

  public async destroy(request, response, next) {
    try {
      const command = new DeleteSucursalSaborCommand( request.params.id );
      const affected = await CommandBus.handle(command);

      let httpResponseCode;

      if (affected.raw.affectedRows && !affected.raw.changedRows) {
        // Entity deleted
        httpResponseCode = 200;
      } else if (affected.raw.affectedRows && affected.raw.changedRows) {
        // WierdCombination
        httpResponseCode = 409;
      } else if (!affected.raw.affectedRows && !affected.raw.changedRows) {
        // No container has been found
        throw new NotFoundEntityException(`SucursalSabor with Id ${command.getId()} not found`);
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
}
