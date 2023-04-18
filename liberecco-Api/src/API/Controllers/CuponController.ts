import CreateCuponCommand from '../Application/Commands/Cupons/CreateCuponCommand';
import GetAllCuponsCommand from '../Application/Commands/Cupons/GetAllCuponsCommand';
import GetSingleCuponCommand from '../Application/Commands/Cupons/GetSingleCuponCommand';
import UpdateCuponCommand from '../Application/Commands/Cupons/UpdateCuponCommand';
import DeleteCuponCommand from '../Application/Commands/Cupons/DeleteCuponCommand';

import InvalidArgumentException from '../Application/Exceptions/InvalidArgumentException';
import NotFoundEntityException from '../Application/Exceptions/NotFoundEntityException'

import { success, error } from '../Common/Result';
import Validator from '../Common/Validator';
import CommandBus from '../Application/Commands/CommandBus';
import * as _ from 'lodash';
import GenerateCuponCommand from '../Application/Commands/Cupons/GenerateCuponCommand';
import ScanCuponCommand from '../Application/Commands/Cupons/ScanCuponCommand';
import GetSingleCuponByUserIdCommand from '../Application/Commands/Cupons/GetSingleCuponByUserIdCommand';
import GetAllCuponBySucursalIdCommand from '../Application/Commands/Cupons/GetAllCuponBySucursalIdCommand';
import GetAllCuponByUserScanIdCommand from '../Application/Commands/Cupons/GetAllCuponByUserScanIdCommand';

export default class CuponController {
  private validator: Validator;

  constructor() {
    this.validator = new Validator();
  }

  public async index(request, response, next) {
    try {
      const command = new GetAllCuponsCommand();
      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'Cupon list retrieve', 200));
    } catch (e) {
      e.collection = 'Cupon';
      next(e);
    }
  }

  public async store(request, response, next) {
    try {
      const command = new CreateCuponCommand(request.body);

      const result = await CommandBus.handle(command);

      return response.status(201).json(success(result, 'Cupon created', 201));
    } catch (e) {
      next(e)
    }
  }

  public async generate(request, response, next) {
    try {
      const command = new GenerateCuponCommand(request.body);

      const result = await CommandBus.handle(command);

      return response.status(201).json(success(result, 'Cupon created', 201));
    } catch (e) {
      next(e)
    }
  }

  public async scan(request, response, next) {
    try {
      const command = new ScanCuponCommand(request.body);

      const result = await CommandBus.handle(command);

      return response.status(201).json(success(result, 'Cupon created', 201));
    } catch (e) {
      next(e)
    }
  }

  public async show(request, response, next) {
    try {
      if (!request.params.id) {
        throw new InvalidArgumentException("Cupon's Id is required");
      }

      const command = new GetSingleCuponCommand(request.params.id);

      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'Cupon retrieved', 200));
    } catch (e) {
      next(e);
    }
  }

  public async update(request, response, next) {
    try {
      // const command = new UpdateModelCommand( _.assign(request.body, {id: request.params.id}) );
      // const affected = await CommandBus.handle(command);
      let httpResponseCode;


      const command = new UpdateCuponCommand(  _.assign(request.body, {id: request.params.id})  );

      const affected = await CommandBus.handle(command);

      if (affected.raw.affectedRows && affected.raw.changedRows) {
        // Container has been updated successfully
        httpResponseCode = 200;
      } else if (affected.raw.affectedRows && !affected.raw.changedRows) {
        // Container exists but was not modify
        httpResponseCode = 409;
      } else if (!affected.raw.affectedRows && !affected.raw.changedRows) {
        // No container has been found
        throw new NotFoundEntityException(`Cupon with Id ${command.getId()} not found`);
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

      // return response.status(200).json(success(result, 'Cupon updated', 200));
    } catch (e) {
      next(e);
    }
  }

  public async destroy(request, response, next) {
    try {

      if (!request.params.id) {
        throw new InvalidArgumentException("Cupon's Id is required");
      }

      if (!request.params.userId) {
        throw new InvalidArgumentException("User's Id is required");
      }

      const command = new DeleteCuponCommand( request.params.id, request.params.userId );
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
        throw new NotFoundEntityException(`Cupon with Id ${command.getId()} not found`);
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
        throw new InvalidArgumentException("Cupon's Id is required");
      }

      const command = new GetSingleCuponByUserIdCommand(request.params.id, request.query.filters);

      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'Cupon retrieved', 200));
    } catch (e) {
      next(e);
    }
  }

  public async allBySucursal(request, response, next) {
    try {
      if (!request.params.id) {
        throw new InvalidArgumentException("Sucursal Id is required");
      }

      const command = new GetAllCuponBySucursalIdCommand(request.params.id);
      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'Cupones list retrieve', 200));
    } catch (e) {
      e.collection = 'Turno';
      next(e);
    }
  }

  public async allByUserScan(request, response, next) {
    try {
      if (!request.params.id) {
        throw new InvalidArgumentException("User Id is required");
      }

      const command = new GetAllCuponByUserScanIdCommand(request.params.id,request.query.filters);
      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'Cupones list retrieve', 200));
    } catch (e) {
      e.collection = 'Turno';
      next(e);
    }
  }

}
