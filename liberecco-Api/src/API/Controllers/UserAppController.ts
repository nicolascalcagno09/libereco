import CreateUserAppCommand from '../Application/Commands/UserApps/CreateUserAppCommand';
import GetAllUserAppsCommand from '../Application/Commands/UserApps/GetAllUserAppsCommand';
import GetSingleUserAppCommand from '../Application/Commands/UserApps/GetSingleUserAppCommand';
import UpdateUserAppCommand from '../Application/Commands/UserApps/UpdateUserAppCommand';
import DeleteUserAppCommand from '../Application/Commands/UserApps/DeleteUserAppCommand';

import InvalidArgumentException from '../Application/Exceptions/InvalidArgumentException';
import NotFoundEntityException from '../Application/Exceptions/NotFoundEntityException'

import { success, error } from '../Common/Result';
import Validator from '../Common/Validator';
import CommandBus from '../Application/Commands/CommandBus';
import * as _ from 'lodash';
import GetUserAppByUidCommand from '../Application/Commands/UserApps/GetUserAppByUidCommand';
import UpdateUserAppByUidCommand from '../Application/Commands/UserApps/UpdateUserAppByUidCommand';
import GetUserAppDNIAvaliableCommand from '../Application/Commands/UserApps/GetUserAppDNIAvaliableCommand';

export default class UserAppController {
  private validator: Validator;

  constructor() {
    this.validator = new Validator();
  }

  public async index(request, response, next) {
    try {
      const command = new GetAllUserAppsCommand();
      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'UserApp list retrieve', 200));
    } catch (e) {
      e.collection = 'UserApp';
      next(e);
    }
  }

  public async store(request, response, next) {
    try {
      const command = new CreateUserAppCommand(request.body);

      const result = await CommandBus.handle(command);

      return response.status(201).json(success(result, 'UserApp created', 201));
    } catch (e) {
      next(e)
    }
  }

  public async show(request, response, next) {
    try {
      if (!request.params.id) {
        throw new InvalidArgumentException("UserApp's Id is required");
      }

      const command = new GetSingleUserAppCommand(request.params.id);

      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'UserApp retrieved', 200));
    } catch (e) {
      next(e);
    }
  }

  public async update(request, response, next) {
    try {
      // const command = new UpdateModelCommand( _.assign(request.body, {id: request.params.id}) );
      // const affected = await CommandBus.handle(command);
      let httpResponseCode;


      const command = new UpdateUserAppCommand(  _.assign(request.body, {id: request.params.id})  );

      const affected = await CommandBus.handle(command);

      if (affected.raw.affectedRows && affected.raw.changedRows) {
        // Container has been updated successfully
        httpResponseCode = 200;
      } else if (affected.raw.affectedRows && !affected.raw.changedRows) {
        // Container exists but was not modify
        httpResponseCode = 409;
      } else if (!affected.raw.affectedRows && !affected.raw.changedRows) {
        // No container has been found
        throw new NotFoundEntityException(`UserApp with Id ${command.getId()} not found`);
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

      // return response.status(200).json(success(result, 'UserApp updated', 200));
    } catch (e) {
      next(e);
    }
  }

  public async destroy(request, response, next) {
    try {
      const command = new DeleteUserAppCommand( request.params.id );
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
        throw new NotFoundEntityException(`UserApp with Id ${command.getId()} not found`);
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

  public async userByUid(request, response, next) {
    try {
      if (!request.params.uid) {
        throw new InvalidArgumentException("UserApp's UID is required");
      }

      const command = new GetUserAppByUidCommand(request.params.uid);

      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'UserApp retrieved', 200));
    } catch (e) {
      next(e);
    }
  }

  public async updateByUid(request, response, next) {
    try {
      // const command = new UpdateModelCommand( _.assign(request.body, {id: request.params.id}) );
      // const affected = await CommandBus.handle(command);
      let httpResponseCode;


      const command = new UpdateUserAppByUidCommand(  _.assign(request.body, {uid: request.params.uid})  );

      const affected = await CommandBus.handle(command);

      if (affected.raw.affectedRows && affected.raw.changedRows) {
        // Container has been updated successfully
        httpResponseCode = 200;
      } else if (affected.raw.affectedRows && !affected.raw.changedRows) {
        // Container exists but was not modify
        httpResponseCode = 409;
      } else if (!affected.raw.affectedRows && !affected.raw.changedRows) {
        // No container has been found
        throw new NotFoundEntityException(`UserApp with UID ${command.getUid()} not found`);
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

      // return response.status(200).json(success(result, 'UserApp updated', 200));
    } catch (e) {
      next(e);
    }
  }

  public async getDniAvaliable(request, response, next) {
    try {
      if (!request.params.dni) {
        throw new InvalidArgumentException("UserApp's DNI is required");
      }

      const command = new GetUserAppDNIAvaliableCommand(request.params.dni);

      const result = await CommandBus.handle(command);

      return response.status(200).json(success(result, 'UserApp retrieved', 200));
    } catch (e) {
      next(e);
    }
  }
}
