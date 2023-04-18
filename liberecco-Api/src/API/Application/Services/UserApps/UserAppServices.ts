import NotFoundEntityException from '../../Exceptions/NotFoundEntityException';
import UserApp from '../../Domain/Entities/UserApp';
import { getRepository, In, Repository } from 'typeorm';
import ActionNotAllowedException from '../../Exceptions/ActionNotAllowedException';
import * as _ from 'lodash';
import PromocionServices from '../Promocions/PromocionServices';
import Sucursal from '../../Domain/Entities/Sucursal';
import Promocion from '../../Domain/Entities/Promocion';
import { INotification, INotificationPayload } from '../../../Common/GeneratePushNotification';
import NovedadServices from '../Novedads/NovedadServices';
import CanjeableServices from '../Canjeables/CanjeableServices';
import Novedad from '../../Domain/Entities/Novedad';
import Canjeable from '../../Domain/Entities/Canjeable';

/**
 * @package UserAppServices
 * @author Prixel
 * @email <contacto@prixel.com>
 */
export default class UserAppServices {
  private userAppRepository: Repository<UserApp>;
  private promocionServices: PromocionServices;
  private novedadServices: NovedadServices;
  private canjeableServices: CanjeableServices;
  constructor() {
    this.promocionServices = new PromocionServices();
    this.novedadServices = new NovedadServices();
    this.canjeableServices = new CanjeableServices();
  }

  public async getAll() {
    this.userAppRepository = getRepository(UserApp);
    let usersApps = await this.userAppRepository.find({ relations: ['sucursal'] });
    for (const user of usersApps) {
      delete user?.sucursal?.productos;
    }
    return usersApps;
  }

  public async findOne(conditions) {
    this.userAppRepository = getRepository(UserApp);
    return await this.userAppRepository.findOne(conditions);
  }

  public async getById(id: number) {
    this.userAppRepository = getRepository(UserApp);
    const userApp = await this.userAppRepository.findOne({ where: { id } });

    if (!userApp) {
      throw new NotFoundEntityException(`UserApp with id: ${id} not found`);
    }

    return userApp;
  }

  /*Trae el usuario por UID de Firebase*/
  public async getByUid(uid: string) {
    this.userAppRepository = getRepository(UserApp);
    const userApp: any = await this.userAppRepository.findOne({ where: { uid }, relations: ['sucursal'] });

    if (!userApp) {
      throw new NotFoundEntityException(`UserApp with uid: ${uid} not found`);
    }

    if (userApp.sucursal) {
      userApp.sucursal = {
        id: userApp.sucursal.id,
        email: userApp.sucursal.email,
        localidad: userApp.sucursal.localidad

      };
    } else {
      userApp.sucursal = null;
    }

    return userApp;
  }

  public async store(userApp: UserApp) {
    this.userAppRepository = getRepository(UserApp);
    return await this.userAppRepository.save(userApp);
  }

  public async update(userApp: UserApp) {
    this.userAppRepository = getRepository(UserApp);

    const affected = await this.userAppRepository.createQueryBuilder()
      .update(UserApp)
      .set(userApp)
      .where('id = :id', { id: userApp.getId() })
      .execute();

    return affected;
  }

  public async destroy(id: number) {
    this.userAppRepository = getRepository(UserApp);
    const affected = await this.userAppRepository.delete(id);

    return affected;
  }

  public async updateByUid(userApp: UserApp) {
    this.userAppRepository = getRepository(UserApp);

    const affected = await this.userAppRepository.createQueryBuilder()
      .update(UserApp)
      .set(userApp)
      .where('uid = :uid', { uid: userApp.getUid() })
      .execute();

    return affected;
  }

  public async addPoints(userApp: UserApp, points) {
    this.userAppRepository = getRepository(UserApp);

    const affected = await this.userAppRepository.createQueryBuilder()
      .update(UserApp)
      .set({ puntosDisponibles: () => `puntosDisponibles + ${points}` })
      .where('id = :id', { id: userApp.getId() })
      .execute();

    return affected;
  }

  public async substractPoints(userApp: UserApp, points) {
    this.userAppRepository = getRepository(UserApp);

    if (userApp.getPuntosDisponibles() < points) {
      throw new ActionNotAllowedException(`UserApp does not have the required number of points`);
    }

    const affected = await this.userAppRepository.createQueryBuilder()
      .update(UserApp)
      .set({ puntosDisponibles: () => `puntosDisponibles - ${points}` })
      .where('id = :id', { id: userApp.getId() })
      .execute();

    return affected;
  }

  public async validateSubstractPoints(userApp: UserApp, points) {
    this.userAppRepository = getRepository(UserApp);

    if (userApp.getPuntosDisponibles() < points) {
      throw new ActionNotAllowedException(`UserApp does not have the required number of points`);
    }

    return true;
  }

  public async getAllUsersAppTokens() {
    this.userAppRepository = getRepository(UserApp);
    let users = await this.userAppRepository.find({ select: ["pushToken"] });

    let tokens = users.map((user: UserApp) => user.pushToken);
    // Remover duplicados
    let uniqTokens = _.uniqBy(tokens);

    return uniqTokens;
  }

  public async getUsersTokensBySucursalIds(sucursalesIds) {

    let users = await this.userAppRepository.find({ select: ["pushToken"], where: { sucursal: In(sucursalesIds) } });

    let tokens = users.map((user: UserApp) => user.pushToken);
    // Remover duplicados
    let uniqTokens = _.uniqBy(tokens);

    return uniqTokens;
  }

  public async getNotificationDataAndTokenByPromocionId(promocionId) {

    this.userAppRepository = getRepository(UserApp);

    let promocion: Promocion = await this.promocionServices.getById(promocionId);

    let uniqTokens;
    if (promocion.sucursales.length === 0) {
      uniqTokens = await this.getAllUsersAppTokens();
    } else {

      let sucursalesIds = promocion.sucursales.map((suc: Sucursal) => suc.getId());

      uniqTokens = await this.getUsersTokensBySucursalIds(sucursalesIds);
    }

    let notiPayload: INotification = {
      title: "Libereco tiene una nueva promoción para vos.",
      body: promocion.subtitulo,
      subtitle: promocion.titulo
    };

    let INotficationPayload: INotificationPayload = {
      registration_ids: uniqTokens,
      notification: notiPayload
    };

    return INotficationPayload;
  }

  public async getNotificationDataAndTokenByNovedadId(novedadId) {

    this.userAppRepository = getRepository(UserApp);

    let novedad: Novedad = await this.novedadServices.getById(novedadId);

    let uniqTokens;
    if (novedad.sucursales.length === 0) {
      uniqTokens = await this.getAllUsersAppTokens();
    } else {

      let sucursalesIds = novedad.sucursales.map((suc: Sucursal) => suc.getId());

      uniqTokens = await this.getUsersTokensBySucursalIds(sucursalesIds);
    }

    let notiPayload: INotification = {
      title: "Libereco ha cargado una nueva novedad.",
      body: novedad.subtitulo,
      subtitle: novedad.titulo
    };

    let INotficationPayload: INotificationPayload = {
      registration_ids: uniqTokens,
      notification: notiPayload
    };

    return INotficationPayload;
  }

  public async getNotificationDataAndTokenByCanjeableId(canjeableId) {

    this.userAppRepository = getRepository(UserApp);

    let canjeable: Canjeable = await this.canjeableServices.getById(canjeableId);

    let uniqTokens;
    if (canjeable.sucursales.length === 0) {
      uniqTokens = await this.getAllUsersAppTokens();
    } else {

      let sucursalesIds = canjeable.sucursales.map((suc: Sucursal) => suc.getId());

      uniqTokens = await this.getUsersTokensBySucursalIds(sucursalesIds);
    }

    let notiPayload: INotification = {
      title: "Libereco agregó nuevos artículos canjeables.",
      body: canjeable.subtitulo,
      subtitle: canjeable.titulo
    };

    let INotficationPayload: INotificationPayload = {
      registration_ids: uniqTokens,
      notification: notiPayload
    };

    return INotficationPayload;
  }

  public async getByDNI(dni: string) {
    this.userAppRepository = getRepository(UserApp);
    const userApp: any = await this.userAppRepository.findOne({ where: { documento: dni } });

    return userApp;
  }


}

