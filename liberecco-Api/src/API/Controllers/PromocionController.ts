import CreatePromocionCommand from '../Application/Commands/Promocions/CreatePromocionCommand';
import GetAllPromocionsCommand from '../Application/Commands/Promocions/GetAllPromocionsCommand';
import GetSinglePromocionCommand from '../Application/Commands/Promocions/GetSinglePromocionCommand';
import UpdatePromocionCommand from '../Application/Commands/Promocions/UpdatePromocionCommand';
import DeletePromocionCommand from '../Application/Commands/Promocions/DeletePromocionCommand';

import InvalidArgumentException from '../Application/Exceptions/InvalidArgumentException';
import NotFoundEntityException from '../Application/Exceptions/NotFoundEntityException'

import { success, error } from '../Common/Result';
import Validator from '../Common/Validator';
import CommandBus from '../Application/Commands/CommandBus';
import * as _ from 'lodash';
import GetAllBySucursalPromocionCommand from '../Application/Commands/Promocions/GetAllBySucursalPromocionCommand';
import GetAllGenericsPromocionsCommand from '../Application/Commands/Promocions/GetAllGenericsPromocionsCommand';

export default class PromocionController {
  private validator: Validator;

  constructor() {
    this.validator = new Validator();
  }

  public async index(request, response, next) {
    try {
      const command = new GetAllPromocionsCommand();
      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'Promocion list retrieve', 200));
    } catch (e) {
      e.collection = 'Promocion';
      next(e);
    }
  }

  public async store(request, response, next) {
    try {
      let body = Object.assign(request.fields, request.files); // contains non-file fields, // contains files
      const command = new CreatePromocionCommand(body);

      const result = await CommandBus.handle(command);
      delete result.sucursales;
      return response.status(201).json(success(result, 'Promocion created', 201));
    } catch (e) {
      next(e)
    }
  }

  public async show(request, response, next) {
    try {
      if (!request.params.id) {
        throw new InvalidArgumentException("Promocion's Id is required");
      }

      const command = new GetSinglePromocionCommand(request.params.id);

      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'Promocion retrieved', 200));
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

      const command = new UpdatePromocionCommand(  _.assign(body, {id: request.params.id})  );

      const result = await CommandBus.handle(command);
      delete result.sucursales;
      return response.status(201).json(success(result, 'Promocion updated', 201));

      // return response.status(200).json(success(result, 'Servicio updated', 200));
    } catch (e) {
      next(e);
    }
  }

  public async destroy(request, response, next) {
    try {
      const command = new DeletePromocionCommand( request.params.id );
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
        throw new NotFoundEntityException(`Promocion with Id ${command.getId()} not found`);
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
        throw new InvalidArgumentException("Promocion's Id is required");
      }

      const command = new GetAllBySucursalPromocionCommand(request.params.id, request.query.usuarioId);
      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'Promocion list retrieve', 200));
    } catch (e) {
      e.collection = 'Promocion';
      next(e);
    }
  }

  public async allGenerics(request, response, next) {
    try {     

      const command = new GetAllGenericsPromocionsCommand();
      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'Promociones list retrieve', 200));
    } catch (e) {
      e.collection = 'Promociones';
      next(e);
    }
  }
}
