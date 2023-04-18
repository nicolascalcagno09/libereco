import CreateNovedadCommand from '../Application/Commands/Novedads/CreateNovedadCommand';
import GetAllNovedadsCommand from '../Application/Commands/Novedads/GetAllNovedadsCommand';
import GetSingleNovedadCommand from '../Application/Commands/Novedads/GetSingleNovedadCommand';
import UpdateNovedadCommand from '../Application/Commands/Novedads/UpdateNovedadCommand';
import DeleteNovedadCommand from '../Application/Commands/Novedads/DeleteNovedadCommand';

import InvalidArgumentException from '../Application/Exceptions/InvalidArgumentException';
import NotFoundEntityException from '../Application/Exceptions/NotFoundEntityException'

import { success, error } from '../Common/Result';
import Validator from '../Common/Validator';
import CommandBus from '../Application/Commands/CommandBus';
import * as _ from 'lodash';
import GetAllBySucursalNovedadCommand from '../Application/Commands/Novedads/GetAllBySucursalNovedadCommand';
import GetAllGenericsNovedadCommand from '../Application/Commands/Novedads/GetAllGenericsNovedadCommand';

export default class NovedadController {
  private validator: Validator;

  constructor() {
    this.validator = new Validator();
  }

  public async index(request, response, next) {
    try {
      const command = new GetAllNovedadsCommand();
      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'Novedad list retrieve', 200));
    } catch (e) {
      e.collection = 'Novedad';
      next(e);
    }
  }

  public async store(request, response, next) {
    try {
      let body = Object.assign(request.fields, request.files);
      const command = new CreateNovedadCommand(body);

      const result = await CommandBus.handle(command);
      delete result.sucursales;
      return response.status(201).json(success(result, 'Novedad created', 201));
    } catch (e) {
      next(e)
    }
  }

  public async show(request, response, next) {
    try {
      if (!request.params.id) {
        throw new InvalidArgumentException("Novedad's Id is required");
      }

      const command = new GetSingleNovedadCommand(request.params.id);

      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'Novedad retrieved', 200));
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

      const command = new UpdateNovedadCommand(  _.assign(body, {id: request.params.id})  );

      const result = await CommandBus.handle(command);

      return response.status(201).json(success(result, 'Promocion updated', 201));

      // return response.status(200).json(success(result, 'Servicio updated', 200));
    } catch (e) {
      next(e);
    }
  }

  public async destroy(request, response, next) {
    try {
      const command = new DeleteNovedadCommand( request.params.id );
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
        throw new NotFoundEntityException(`Novedad with Id ${command.getId()} not found`);
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

  public async allBySucursal(request, response, next) {
    try {
      if (!request.params.id) {
        throw new InvalidArgumentException("Novedad's Id is required");
      }

      const command = new GetAllBySucursalNovedadCommand(request.params.id);
      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'Novedad list retrieve', 200));
    } catch (e) {
      e.collection = 'Novedad';
      next(e);
    }
  }

  public async allGenerics(request, response, next) {
    try {     

      const command = new GetAllGenericsNovedadCommand();
      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'Novedades list retrieve', 200));
    } catch (e) {
      e.collection = 'Novedades';
      next(e);
    }
  }
}
