import CreateSaborCommand from '../Application/Commands/Sabors/CreateSaborCommand';
import GetAllSaborsCommand from '../Application/Commands/Sabors/GetAllSaborsCommand';
import GetSingleSaborCommand from '../Application/Commands/Sabors/GetSingleSaborCommand';
import UpdateSaborCommand from '../Application/Commands/Sabors/UpdateSaborCommand';
import DeleteSaborCommand from '../Application/Commands/Sabors/DeleteSaborCommand';

import InvalidArgumentException from '../Application/Exceptions/InvalidArgumentException';
import NotFoundEntityException from '../Application/Exceptions/NotFoundEntityException'

import { success, error } from '../Common/Result';
import Validator from '../Common/Validator';
import CommandBus from '../Application/Commands/CommandBus';
import * as _ from 'lodash';
import SetSabroActiveStatusCommand from '../Application/Commands/Sabors/SetSabroActiveStatusCommand';
import GetAllActivosSaborsCommand from '../Application/Commands/Sabors/GetAllActivosSaborsCommand';
import GetAllSaborsByOrdenCommand from '../Application/Commands/Sabors/GetAllSaborsByOrdenCommand';
import GetAllSaborsActivosByOrdenCommand from '../Application/Commands/Sabors/GetAllSaborsActivosByOrdenCommand';

export default class SaborController {
  private validator: Validator;

  constructor() {
    this.validator = new Validator();
  }

  public async index(request, response, next) {
    try {
      const command = new GetAllSaborsCommand();
      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'Sabor list retrieve', 200));
    } catch (e) {
      e.collection = 'Sabor';
      next(e);
    }
  }

  public async store(request, response, next) {
    try {

      let body = Object.assign(request.fields, request.files); // contains non-file fields, // contains files

      const command = new CreateSaborCommand(body);

      const result = await CommandBus.handle(command);

      return response.status(201).json(success(result, 'Sabor created', 201));
    } catch (e) {
      next(e)
    }
  }

  public async show(request, response, next) {
    try {
      if (!request.params.id) {
        throw new InvalidArgumentException("Sabor's Id is required");
      }

      const command = new GetSingleSaborCommand(request.params.id);

      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'Sabor retrieved', 200));
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
      const command = new UpdateSaborCommand(_.assign(body, { id: request.params.id }));

      const affected = await CommandBus.handle(command);

      if (affected.raw.affectedRows && affected.raw.changedRows) {
        // Container has been updated successfully
        httpResponseCode = 200;
      } else if (affected.raw.affectedRows && !affected.raw.changedRows) {
        // Container exists but was not modify
        httpResponseCode = 409;
      } else if (!affected.raw.affectedRows && !affected.raw.changedRows) {
        // No container has been found
        throw new NotFoundEntityException(`Sabor with Id ${command.getId()} not found`);
      } else if (!affected.raw.affectedRows && affected.raw.changedRows) {
        // Imposible combination, just to cover all posibilities
        httpResponseCode = 501;
      }

      /* This response can be status 204 No-Content without body */
      return response.status(httpResponseCode).json({
        data: {},
        message: affected.raw.message, // 'Container modified',
        code: httpResponseCode,
      });

      // return response.status(200).json(success(result, 'Sabor updated', 200));
    } catch (e) {
      next(e);
    }
  }

  public async destroy(request, response, next) {
    try {
      const command = new DeleteSaborCommand(request.params.id);
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
        throw new NotFoundEntityException(`Sabor with Id ${command.getId()} not found`);
      } else if (!affected.raw.affectedRows && affected.raw.changedRows) {
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

  public async setActiveStatus(request, response, next) {
    try {
      const command = new SetSabroActiveStatusCommand(request.body);

      const result = await CommandBus.handle(command);

      return response.status(201).json(success(result, 'TipoSabor created', 201));
    } catch (e) {
      next(e)
    }
  }

  public async allActivos(request, response, next) {
    try {
      const command = new GetAllActivosSaborsCommand();
      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'Sabor list retrieve', 200));
    } catch (e) {
      e.collection = 'Sabor';
      next(e);
    }
  }

  public async byOrden(request, response, next) {
    try {
      const command = new GetAllSaborsByOrdenCommand();
      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'Sabor list retrieve', 200));
    } catch (e) {
      e.collection = 'Sabor';
      next(e);
    }
  }

  public async allActivosByOrden(request, response, next) {
    try {
      const command = new GetAllSaborsActivosByOrdenCommand();
      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'Sabor list retrieve', 200));
    } catch (e) {
      e.collection = 'Sabor';
      next(e);
    }
  }
}
