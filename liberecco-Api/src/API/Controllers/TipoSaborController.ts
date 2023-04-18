import CreateTipoSaborCommand from '../Application/Commands/TipoSabors/CreateTipoSaborCommand';
import GetAllTipoSaborsCommand from '../Application/Commands/TipoSabors/GetAllTipoSaborsCommand';
import GetSingleTipoSaborCommand from '../Application/Commands/TipoSabors/GetSingleTipoSaborCommand';
import UpdateTipoSaborCommand from '../Application/Commands/TipoSabors/UpdateTipoSaborCommand';
import DeleteTipoSaborCommand from '../Application/Commands/TipoSabors/DeleteTipoSaborCommand';

import InvalidArgumentException from '../Application/Exceptions/InvalidArgumentException';
import NotFoundEntityException from '../Application/Exceptions/NotFoundEntityException'

import { success, error } from '../Common/Result';
import Validator from '../Common/Validator';
import CommandBus from '../Application/Commands/CommandBus';
import * as _ from 'lodash';
import GetAllSaboresByTiposCommand from '../Application/Commands/TipoSabors/GetAllTiposBySabores';
import GetAllTiposBySaboresActivosCommand from '../Application/Commands/TipoSabors/GetAllTiposBySaboresActivosCommand';

export default class TipoSaborController {
  private validator: Validator;

  constructor() {
    this.validator = new Validator();
  }

  public async index(request, response, next) {
    try {
      const command = new GetAllTipoSaborsCommand();
      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'TipoSabor list retrieve', 200));
    } catch (e) {
      e.collection = 'TipoSabor';
      next(e);
    }
  }

  public async store(request, response, next) {
    try {
      const command = new CreateTipoSaborCommand(request.body);

      const result = await CommandBus.handle(command);

      return response.status(201).json(success(result, 'TipoSabor created', 201));
    } catch (e) {
      next(e)
    }
  }

  public async show(request, response, next) {
    try {
      if (!request.params.id) {
        throw new InvalidArgumentException("TipoSabor's Id is required");
      }

      const command = new GetSingleTipoSaborCommand(request.params.id);

      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'TipoSabor retrieved', 200));
    } catch (e) {
      next(e);
    }
  }

  public async update(request, response, next) {
    try {
      // const command = new UpdateModelCommand( _.assign(request.body, {id: request.params.id}) );
      // const affected = await CommandBus.handle(command);
      let httpResponseCode;


      const command = new UpdateTipoSaborCommand(  _.assign(request.body, {id: request.params.id})  );

      const affected = await CommandBus.handle(command);

      if (affected.raw.affectedRows && affected.raw.changedRows) {
        // Container has been updated successfully
        httpResponseCode = 200;
      } else if (affected.raw.affectedRows && !affected.raw.changedRows) {
        // Container exists but was not modify
        httpResponseCode = 409;
      } else if (!affected.raw.affectedRows && !affected.raw.changedRows) {
        // No container has been found
        throw new NotFoundEntityException(`TipoSabor with Id ${command.getId()} not found`);
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

      // return response.status(200).json(success(result, 'TipoSabor updated', 200));
    } catch (e) {
      next(e);
    }
  }

  public async destroy(request, response, next) {
    try {
      const command = new DeleteTipoSaborCommand( request.params.id );
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
        throw new NotFoundEntityException(`TipoSabor with Id ${command.getId()} not found`);
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

  public async indexConTipoSabor(request, response, next) {
    try {
      const command = new GetAllSaboresByTiposCommand();
      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'Tipo sabor list retrieve', 200));
    } catch (e) {
      e.collection = 'Tipo Sabor';
      next(e);
    }
  }

  public async indexConTipoSaborAllActivos(request, response, next) {
    try {
      const command = new GetAllTiposBySaboresActivosCommand();
      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'Tipo sabor list retrieve', 200));
    } catch (e) {
      e.collection = 'Tipo Sabor';
      next(e);
    }
  }
}
