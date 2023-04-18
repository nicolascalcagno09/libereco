import CreateSucursalCommand from '../Application/Commands/Sucursals/CreateSucursalCommand';
import GetAllSucursalsCommand from '../Application/Commands/Sucursals/GetAllSucursalsCommand';
import GetSingleSucursalCommand from '../Application/Commands/Sucursals/GetSingleSucursalCommand';
import UpdateSucursalCommand from '../Application/Commands/Sucursals/UpdateSucursalCommand';
import DeleteSucursalCommand from '../Application/Commands/Sucursals/DeleteSucursalCommand';

import InvalidArgumentException from '../Application/Exceptions/InvalidArgumentException';
import NotFoundEntityException from '../Application/Exceptions/NotFoundEntityException'

import { success, error } from '../Common/Result';
import Validator from '../Common/Validator';
import CommandBus from '../Application/Commands/CommandBus';
import * as _ from 'lodash';
import SetSucursalActiveStatusCommand from '../Application/Commands/Sucursals/SetSucursalActiveStatusCommand';
import CreateSucursalProductosCommand from '../Application/Commands/Sucursals/CreateSucursalProductosCommand';
import GetAllActivosSucursalsCommand from '../Application/Commands/Sucursals/GetAllActivosSucursalsCommand';
import GetAllActivosSucursalsByOrdenCommand from '../Application/Commands/Sucursals/GetAllActivosSucursalsByOrdenCommand';
import GetAllSucursalsByOrdenCommand from '../Application/Commands/Sucursals/GetAllSucursalsByOrdenCommand';
import GetSingleSucursalByUrlCommand from '../Application/Commands/Sucursals/GetSingleSucursalByUrlCommand';
import GetAllSucursalsLightCommand from '../Application/Commands/Sucursals/GetAllSucursalsLightCommand';

export default class SucursalController {
  private validator: Validator;

  constructor() {
    this.validator = new Validator();
  }

  public async index(request, response, next) {
    try {
      const command = new GetAllSucursalsCommand();
      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'Sucursal list retrieve', 200));
    } catch (e) {
      e.collection = 'Sucursal';
      next(e);
    }
  }

  public async store(request, response, next) {
    try {
      let body = Object.assign(request.fields, request.files); // contains non-file fields, // contains files
      const command = new CreateSucursalCommand(body);

      const result = await CommandBus.handle(command);

      return response.status(201).json(success(result, 'Sucursal created', 201));
    } catch (e) {
      next(e)
    }
  }

  public async show(request, response, next) {
    try {
      if (!request.params.id) {
        throw new InvalidArgumentException("Sucursal's Id is required");
      }

      const command = new GetSingleSucursalCommand(request.params.id);

      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'Sucursal retrieved', 200));
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

      const command = new UpdateSucursalCommand(  _.assign(body, {id: request.params.id})  );

      const affected = await CommandBus.handle(command);

      if (affected.raw.affectedRows && affected.raw.changedRows) {
        // Container has been updated successfully
        httpResponseCode = 200;
      } else if (affected.raw.affectedRows && !affected.raw.changedRows) {
        // Container exists but was not modify
        httpResponseCode = 409;
      } else if (!affected.raw.affectedRows && !affected.raw.changedRows) {
        // No container has been found
        throw new NotFoundEntityException(`Sucursal with Id ${command.getId()} not found`);
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

      // return response.status(200).json(success(result, 'Sucursal updated', 200));
    } catch (e) {
      next(e);
    }
  }
  

  public async destroy(request, response, next) {
    try {
      const command = new DeleteSucursalCommand( request.params.id );
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
        throw new NotFoundEntityException(`Sucursal with Id ${command.getId()} not found`);
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
      const command = new SetSucursalActiveStatusCommand(request.body);

      const result = await CommandBus.handle(command);

      return response.status(201).json(success(result, 'Sucursal Updated', 201));
    } catch (e) {
      next(e)
    }
  }

  public async storeProductos(request, response, next) {
    try {
      const command = new CreateSucursalProductosCommand(request.body);

      const result = await CommandBus.handle(command);

      return response.status(201).json(success(result, 'Sucursal created', 201));
    } catch (e) {
      next(e)
    }
  }

  public async allActivos(request, response, next) {
    try {
      const command = new GetAllActivosSucursalsCommand();
      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'Sucursal list retrieve', 200));
    } catch (e) {
      e.collection = 'Sucursal';
      next(e);
    }
  }

  public async allActivosByOrden(request, response, next) {
    try {
      const command = new GetAllActivosSucursalsByOrdenCommand();
      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'Sucursal list retrieve', 200));
    } catch (e) {
      e.collection = 'Sucursal';
      next(e);
    }
  }

  public async allByOrden(request, response, next) {
    try {
      const command = new GetAllSucursalsByOrdenCommand();
      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'Sucursal list retrieve', 200));
    } catch (e) {
      e.collection = 'Sucursal';
      next(e);
    }
  }

  public async sucursalByUrlamigable(request, response, next) {
    try {
      if (!request.params.urlamigable) {
        throw new InvalidArgumentException("Sucursal's urlamigable is required");
      }

      const command = new GetSingleSucursalByUrlCommand(request.params.urlamigable);

      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'Sucursal retrieved', 200));
    } catch (e) {
      next(e);
    }
  }

  public async allLightData(request, response, next) {
    try {
      const command = new GetAllSucursalsLightCommand();
      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'Sucursal list retrieve', 200));
    } catch (e) {
      e.collection = 'Sucursal';
      next(e);
    }
  }
}
