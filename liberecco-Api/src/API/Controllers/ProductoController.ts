import CreateProductoCommand from '../Application/Commands/Productos/CreateProductoCommand';
import GetAllProductosCommand from '../Application/Commands/Productos/GetAllProductosCommand';
import GetSingleProductoCommand from '../Application/Commands/Productos/GetSingleProductoCommand';
import UpdateProductoCommand from '../Application/Commands/Productos/UpdateProductoCommand';
import DeleteProductoCommand from '../Application/Commands/Productos/DeleteProductoCommand';

import InvalidArgumentException from '../Application/Exceptions/InvalidArgumentException';
import NotFoundEntityException from '../Application/Exceptions/NotFoundEntityException'

import { success, error } from '../Common/Result';
import Validator from '../Common/Validator';
import CommandBus from '../Application/Commands/CommandBus';
import * as _ from 'lodash';
import GetAllProductosPresentCommand from '../Application/Commands/Productos/GetAllProductosPresentCommand';
import SetProductoActiveStatusCommand from '../Application/Commands/Productos/SetProductoActiveStatusCommand';
import GetAllActivosProductosCommand from '../Application/Commands/Productos/GetAllActivosProductosCommand';
import GetAllProductosActivosPresentCommand from '../Application/Commands/Productos/GetAllProductosActivosPresentCommand';
import GetAllProductosActivosPresentActivasCommand from '../Application/Commands/Productos/GetAllProductosActivosPresentActivasCommand';
import GetAllProductosByOrdenCommand from '../Application/Commands/Productos/GetAllProductosByOrdenCommand';
import GetAllProductosActivosByOrdenPresentActivasByOrdenCommand from '../Application/Commands/Productos/GetAllProductosActivosByOrdenPresentActivasByOrdenCommand';

export default class ProductoController {
  private validator: Validator;

  constructor() {
    this.validator = new Validator();
  }

  public async index(request, response, next) {
    try {
      const command = new GetAllProductosCommand();
      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'Producto list retrieve', 200));
    } catch (e) {
      e.collection = 'Producto';
      next(e);
    }
  }

  public async store(request, response, next) {
    try {
      const command = new CreateProductoCommand(request.body);

      const result = await CommandBus.handle(command);

      return response.status(201).json(success(result, 'Producto created', 201));
    } catch (e) {
      next(e)
    }
  }

  public async show(request, response, next) {
    try {
      if (!request.params.id) {
        throw new InvalidArgumentException("Producto's Id is required");
      }

      const command = new GetSingleProductoCommand(request.params.id);

      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'Producto retrieved', 200));
    } catch (e) {
      next(e);
    }
  }

  public async update(request, response, next) {
    try {
      // const command = new UpdateModelCommand( _.assign(request.body, {id: request.params.id}) );
      // const affected = await CommandBus.handle(command);
      let httpResponseCode;


      const command = new UpdateProductoCommand(  _.assign(request.body, {id: request.params.id})  );

      const affected = await CommandBus.handle(command);

      if (affected.raw.affectedRows && affected.raw.changedRows) {
        // Container has been updated successfully
        httpResponseCode = 200;
      } else if (affected.raw.affectedRows && !affected.raw.changedRows) {
        // Container exists but was not modify
        httpResponseCode = 409;
      } else if (!affected.raw.affectedRows && !affected.raw.changedRows) {
        // No container has been found
        throw new NotFoundEntityException(`Producto with Id ${command.getId()} not found`);
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

      // return response.status(200).json(success(result, 'Producto updated', 200));
    } catch (e) {
      next(e);
    }
  }

  public async destroy(request, response, next) {
    try {
      const command = new DeleteProductoCommand( request.params.id );
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
        throw new NotFoundEntityException(`Producto with Id ${command.getId()} not found`);
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

  public async indexConPresentaciones(request, response, next) {
    try {
      const command = new GetAllProductosPresentCommand();
      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'Producto list retrieve', 200));
    } catch (e) {
      e.collection = 'Producto';
      next(e);
    }
  }

  public async setActiveStatus(request, response, next) {
    try {
      const command = new SetProductoActiveStatusCommand(request.body);

      const result = await CommandBus.handle(command);

      return response.status(201).json(success(result, 'Updated Producto', 201));
    } catch (e) {
      next(e)
    }
  }

  public async allActivos(request, response, next) {
    try {
      const command = new GetAllActivosProductosCommand();
      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'Producto list retrieve', 200));
    } catch (e) {
      e.collection = 'Producto';
      next(e);
    }
  }

  public async allActivosConPresentaciones(request, response, next) {
    try {
      const command = new GetAllProductosActivosPresentCommand();
      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'Producto list retrieve', 200));
    } catch (e) {
      e.collection = 'Producto';
      next(e);
    }
  }

  public async allActivosConPresentacionesActivas(request, response, next) {
    try {
      const command = new GetAllProductosActivosPresentActivasCommand();
      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'Producto list retrieve', 200));
    } catch (e) {
      e.collection = 'Producto';
      next(e);
    }
  }

  public async allActivosByOrden(request, response, next) {
    try {
      const command = new GetAllActivosProductosCommand();
      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'Producto list retrieve', 200));
    } catch (e) {
      e.collection = 'Producto';
      next(e);
    }
  }

  public async allByOrden(request, response, next) {
    try {
      const command = new GetAllProductosByOrdenCommand();
      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'Producto list retrieve', 200));
    } catch (e) {
      e.collection = 'Producto';
      next(e);
    }
  }

  public async allActivosConOrdenPresentacionesActivasConOrden(request, response, next) {
    try {
      const command = new GetAllProductosActivosByOrdenPresentActivasByOrdenCommand();
      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'Producto list retrieve', 200));
    } catch (e) {
      e.collection = 'Producto';
      next(e);
    }
  }
}
