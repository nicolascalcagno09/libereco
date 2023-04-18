import CreateSucursalPresentacionCommand from '../Application/Commands/SucursalPresentacions/CreateSucursalPresentacionCommand';
import GetAllSucursalPresentacionsCommand from '../Application/Commands/SucursalPresentacions/GetAllSucursalPresentacionsCommand';
import GetSingleSucursalPresentacionCommand from '../Application/Commands/SucursalPresentacions/GetSingleSucursalPresentacionCommand';
import UpdateSucursalPresentacionCommand from '../Application/Commands/SucursalPresentacions/UpdateSucursalPresentacionCommand';
import DeleteSucursalPresentacionCommand from '../Application/Commands/SucursalPresentacions/DeleteSucursalPresentacionCommand';

import InvalidArgumentException from '../Application/Exceptions/InvalidArgumentException';
import NotFoundEntityException from '../Application/Exceptions/NotFoundEntityException'

import { success, error } from '../Common/Result';
import Validator from '../Common/Validator';
import CommandBus from '../Application/Commands/CommandBus';
import * as _ from 'lodash';

export default class SucursalPresentacionController {
  private validator: Validator;

  constructor() {
    this.validator = new Validator();
  }

  public async index(request, response, next) {
    try {
      const command = new GetAllSucursalPresentacionsCommand();
      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'SucursalPresentacion list retrieve', 200));
    } catch (e) {
      e.collection = 'SucursalPresentacion';
      next(e);
    }
  }

  public async store(request, response, next) {
    try {
      const command = new CreateSucursalPresentacionCommand(request.body);

      const result = await CommandBus.handle(command);

      return response.status(201).json(success(result, 'SucursalPresentacion created', 201));
    } catch (e) {
      next(e)
    }
  }

  public async show(request, response, next) {
    try {
      if (!request.params.id) {
        throw new InvalidArgumentException("SucursalPresentacion's Id is required");
      }

      const command = new GetSingleSucursalPresentacionCommand(request.params.id);

      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'SucursalPresentacion retrieved', 200));
    } catch (e) {
      next(e);
    }
  }

  public async update(request, response, next) {
    try {
      // const command = new UpdateModelCommand( _.assign(request.body, {id: request.params.id}) );
      // const affected = await CommandBus.handle(command);
      let httpResponseCode;


      const command = new UpdateSucursalPresentacionCommand(  _.assign(request.body, {id: request.params.id})  );

      const affected = await CommandBus.handle(command);

      if (affected.raw.affectedRows && affected.raw.changedRows) {
        // Container has been updated successfully
        httpResponseCode = 200;
      } else if (affected.raw.affectedRows && !affected.raw.changedRows) {
        // Container exists but was not modify
        httpResponseCode = 409;
      } else if (!affected.raw.affectedRows && !affected.raw.changedRows) {
        // No container has been found
        throw new NotFoundEntityException(`SucursalPresentacion with Id ${command.getId()} not found`);
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

      // return response.status(200).json(success(result, 'SucursalPresentacion updated', 200));
    } catch (e) {
      next(e);
    }
  }

  public async destroy(request, response, next) {
    try {
      const command = new DeleteSucursalPresentacionCommand( request.params.id );
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
        throw new NotFoundEntityException(`SucursalPresentacion with Id ${command.getId()} not found`);
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
