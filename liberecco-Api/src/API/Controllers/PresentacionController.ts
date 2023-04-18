import CreatePresentacionCommand from '../Application/Commands/Presentacions/CreatePresentacionCommand';
import GetAllPresentacionsCommand from '../Application/Commands/Presentacions/GetAllPresentacionsCommand';
import GetSinglePresentacionCommand from '../Application/Commands/Presentacions/GetSinglePresentacionCommand';
import UpdatePresentacionCommand from '../Application/Commands/Presentacions/UpdatePresentacionCommand';
import DeletePresentacionCommand from '../Application/Commands/Presentacions/DeletePresentacionCommand';

import InvalidArgumentException from '../Application/Exceptions/InvalidArgumentException';
import NotFoundEntityException from '../Application/Exceptions/NotFoundEntityException'

import { success, error } from '../Common/Result';
import Validator from '../Common/Validator';
import CommandBus from '../Application/Commands/CommandBus';
import * as _ from 'lodash';
import SetPresentacionActiveStatusCommand from '../Application/Commands/Presentacions/SetPresentacionActiveStatusCommand';
import GetAllActivosPresentacionsCommand from '../Application/Commands/Presentacions/GetAllActivosPresentacionsCommand';
import GetAllActivosPresentacionsByOrdenCommand from '../Application/Commands/Presentacions/GetAllActivosPresentacionsByOrdenCommand';
import GetAllPresentacionsByOrdenCommand from '../Application/Commands/Presentacions/GetAllPresentacionsByOrdenCommand';

export default class PresentacionController {
  private validator: Validator;

  constructor() {
    this.validator = new Validator();
  }

  public async index(request, response, next) {
    try {
      const command = new GetAllPresentacionsCommand();
      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'Presentacion list retrieve', 200));
    } catch (e) {
      e.collection = 'Presentacion';
      next(e);
    }
  }

  public async store(request, response, next) {
    try {
      let body = Object.assign(request.fields, request.files); // contains non-file fields, // contains files
      const command = new CreatePresentacionCommand(body);

      const result = await CommandBus.handle(command);

      return response.status(201).json(success(result, 'Presentacion created', 201));
    } catch (e) {
      next(e)
    }
  }

  public async show(request, response, next) {
    try {
      if (!request.params.id) {
        throw new InvalidArgumentException("Presentacion's Id is required");
      }

      const command = new GetSinglePresentacionCommand(request.params.id);

      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'Presentacion retrieved', 200));
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

      const command = new UpdatePresentacionCommand(  _.assign(body, {id: request.params.id})  );

      const affected = await CommandBus.handle(command);

      if (affected.raw.affectedRows && affected.raw.changedRows) {
        // Container has been updated successfully
        httpResponseCode = 200;
      } else if (affected.raw.affectedRows && !affected.raw.changedRows) {
        // Container exists but was not modify
        httpResponseCode = 409;
      } else if (!affected.raw.affectedRows && !affected.raw.changedRows) {
        // No container has been found
        throw new NotFoundEntityException(`Presentacion with Id ${command.getId()} not found`);
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

      // return response.status(200).json(success(result, 'Presentacion updated', 200));
    } catch (e) {
      next(e);
    }
  }

  public async destroy(request, response, next) {
    try {
      const command = new DeletePresentacionCommand( request.params.id );
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
        throw new NotFoundEntityException(`Presentacion with Id ${command.getId()} not found`);
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

  public async setActiveStatus(request, response, next) {
    try {
      const command = new SetPresentacionActiveStatusCommand(request.body);

      const result = await CommandBus.handle(command);

      return response.status(201).json(success(result, 'Updated Presentacion', 201));
    } catch (e) {
      next(e)
    }
  }

  public async allActivos(request, response, next) {
    try {
      const command = new GetAllActivosPresentacionsCommand();
      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'Presentacion list retrieve', 200));
    } catch (e) {
      e.collection = 'Presentacion';
      next(e);
    }
  }

  public async allActivosByOrden(request, response, next) {
    try {
      const command = new GetAllActivosPresentacionsByOrdenCommand();
      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'Presentacion list retrieve', 200));
    } catch (e) {
      e.collection = 'Presentacion';
      next(e);
    }
  }

  public async allByOrden(request, response, next) {
    try {
      const command = new GetAllPresentacionsByOrdenCommand();
      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'Presentacion list retrieve', 200));
    } catch (e) {
      e.collection = 'Presentacion';
      next(e);
    }
  }
}
