import CreateContactoCommand from '../Application/Commands/Contactos/CreateContactoCommand';
import GetAllContactosCommand from '../Application/Commands/Contactos/GetAllContactosCommand';
import GetSingleContactoCommand from '../Application/Commands/Contactos/GetSingleContactoCommand';
import UpdateContactoCommand from '../Application/Commands/Contactos/UpdateContactoCommand';
import DeleteContactoCommand from '../Application/Commands/Contactos/DeleteContactoCommand';

import InvalidArgumentException from '../Application/Exceptions/InvalidArgumentException';
import NotFoundEntityException from '../Application/Exceptions/NotFoundEntityException'

import { success, error } from '../Common/Result';
import Validator from '../Common/Validator';
import CommandBus from '../Application/Commands/CommandBus';
import * as _ from 'lodash';
import GetAllContactosBySucursalCommand from '../Application/Commands/Contactos/GetAllContactosBySucursalCommand';
import SetContactoLeidaCommand from '../Application/Commands/Contactos/SetContactoLeidaCommand';
import GetAllContactosLeidasCommand from '../Application/Commands/Contactos/GetAllContactosLeidasCommand';
import GetAllContactosNoLeidasBySucursalCommand from '../Application/Commands/Contactos/GetAllContactosNoLeidasBySucursalCommand';
import GetAllContactosDestacadosCommand from '../Application/Commands/Contactos/GetAllContactosDestacadosCommand';
import GetAllContactosDestacadosBySucursalCommand from '../Application/Commands/Contactos/GetAllContactosDestacadosBySucursalCommand ';
import SetContactoDestacadoCommand from '../Application/Commands/Contactos/SetContactoDestacadoCommand';

export default class ContactoController {
  private validator: Validator;

  constructor() {
    this.validator = new Validator();
  }

  public async index(request, response, next) {
    try {
      const command = new GetAllContactosCommand();
      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'Contacto list retrieve', 200));
    } catch (e) {
      e.collection = 'Contacto';
      next(e);
    }
  }

  public async store(request, response, next) {
    try {
      const command = new CreateContactoCommand(request.body);

      const result = await CommandBus.handle(command);

      return response.status(201).json(success(result, 'Contacto created', 201));
    } catch (e) {
      next(e)
    }
  }

  public async show(request, response, next) {
    try {
      if (!request.params.id) {
        throw new InvalidArgumentException("Contacto's Id is required");
      }

      const command = new GetSingleContactoCommand(request.params.id);

      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'Contacto retrieved', 200));
    } catch (e) {
      next(e);
    }
  }

  public async update(request, response, next) {
    try {
      // const command = new UpdateModelCommand( _.assign(request.body, {id: request.params.id}) );
      // const affected = await CommandBus.handle(command);
      let httpResponseCode;


      const command = new UpdateContactoCommand(  _.assign(request.body, {id: request.params.id})  );

      const affected = await CommandBus.handle(command);

      if (affected.raw.affectedRows && affected.raw.changedRows) {
        // Container has been updated successfully
        httpResponseCode = 200;
      } else if (affected.raw.affectedRows && !affected.raw.changedRows) {
        // Container exists but was not modify
        httpResponseCode = 409;
      } else if (!affected.raw.affectedRows && !affected.raw.changedRows) {
        // No container has been found
        throw new NotFoundEntityException(`Contacto with Id ${command.getId()} not found`);
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

      // return response.status(200).json(success(result, 'Contacto updated', 200));
    } catch (e) {
      next(e);
    }
  }

  public async destroy(request, response, next) {
    try {
      const command = new DeleteContactoCommand( request.params.id );
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
        throw new NotFoundEntityException(`Contacto with Id ${command.getId()} not found`);
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
        throw new InvalidArgumentException("Sucursal Id is required");
      }

      const command = new GetAllContactosBySucursalCommand(request.params.id);
      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'Contacto list retrieve', 200));
    } catch (e) {
      e.collection = 'Contacto';
      next(e);
    }
  }

  public async setLeida(request, response, next) {
    try {
      const command = new SetContactoLeidaCommand(request.body);

      const result = await CommandBus.handle(command);

      return response.status(201).json(success(result, 'Updated Contacto', 201));
    } catch (e) {
      next(e)
    }
  }

  public async allLeidas(request, response, next) {
    try {
      const command = new GetAllContactosLeidasCommand();
      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'Contacto list retrieve', 200));
    } catch (e) {
      e.collection = 'Contacto';
      next(e);
    }
  }

  public async allNoLeidasBySucursal(request, response, next) {
    try {
      if (!request.params.id) {
        throw new InvalidArgumentException("Sucursal Id is required");
      }

      const command = new GetAllContactosNoLeidasBySucursalCommand(request.params.id);
      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'Contacto list retrieve', 200));
    } catch (e) {
      e.collection = 'Contacto';
      next(e);
    }
  }

  public async allDestacados(request, response, next) {
    try {
      const command = new GetAllContactosDestacadosCommand();
      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'Contacto list retrieve', 200));
    } catch (e) {
      e.collection = 'Contacto';
      next(e);
    }
  }

  public async destacadosBySucursal(request, response, next) {
    try {
      if (!request.params.id) {
        throw new InvalidArgumentException("Sucursal Id is required");
      }

      const command = new GetAllContactosDestacadosBySucursalCommand(request.params.id);
      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'Contacto list retrieve', 200));
    } catch (e) {
      e.collection = 'Contacto';
      next(e);
    }
  }

  public async setDestacado(request, response, next) {
    try {
      const command = new SetContactoDestacadoCommand(request.body);

      const result = await CommandBus.handle(command);

      return response.status(201).json(success(result, 'Updated Contacto', 201));
    } catch (e) {
      next(e)
    }
  }
}
