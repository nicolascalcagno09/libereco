import NotFoundEntityException from '../../Exceptions/NotFoundEntityException';
import Canjeable from '../../Domain/Entities/Canjeable';
import { getRepository, Repository } from 'typeorm';
import moment from 'moment';
import Cupon from '../../Domain/Entities/Cupon';

/**
 * @package CanjeableServices
 * @author Prixel
 * @email <contacto@prixel.com>
 */
export default class CanjeableServices {
  private canjeableRepository: Repository<Canjeable>;

  constructor() {
  }

  public async getAll() {
    this.canjeableRepository = getRepository(Canjeable);
    return await this.canjeableRepository.find({where: {activo: true}});
  }

  public async findOne(conditions) {
    this.canjeableRepository = getRepository(Canjeable);
    return await this.canjeableRepository.findOne(conditions);
  }

  public async getById(id: number) {
    this.canjeableRepository = getRepository(Canjeable);
    const canjeable = await this.canjeableRepository.findOne({ where: { id, activo: true }, relations: ['sucursales'] });

    if (!canjeable) {
      throw new NotFoundEntityException(`Canjeable with id: ${id} not found`);
    }

    return canjeable;
  }

  public async store(canjeable: Canjeable) {
    this.canjeableRepository = getRepository(Canjeable);
    return await this.canjeableRepository.save(canjeable);
  }

  public async update(canjeable: Canjeable) {
    this.canjeableRepository = getRepository(Canjeable);

    const affected = await this.canjeableRepository.createQueryBuilder()
      .update(Canjeable)
      .set(canjeable)
      .where('id = :id', { id: canjeable.getId() })
      .execute();

    return affected;
  }

  public async delete(id: number) {
    this.canjeableRepository = getRepository(Canjeable);
    const affected = await this.canjeableRepository.createQueryBuilder()
      .update(Canjeable)
      .set({ activo: false })
      .where('id = :id', { id: id })
      .execute();

    return affected;
  }

  public async getOneById(id: number) {
    this.canjeableRepository = getRepository(Canjeable);
    const novedad = await this.canjeableRepository.findOne({ where: { id }, relations: ['sucursales'] });

    if (!novedad) {
      throw new NotFoundEntityException(`Canjeable with id: ${id} not found`);
    }

    return novedad;
  }

  public async getAllNotExpired(userId) {
    this.canjeableRepository = getRepository(Canjeable);

    let before2 =  moment().format();

    let results = await this.canjeableRepository.createQueryBuilder("canjeable")
      .where('hasta >= :before', { before: before2 })
      .andWhere('activo IS TRUE')
      // .andWhere(((qb) => {
      //   const subQuery = qb.subQuery()
      //     .select('*')
      //     .from(Cupon, 'c')
      //     .where('c.canjeableId = canjeable.id')
      //     .andWhere('c.usuarioAppId = :id', { id: userId})
      //     .orderBy("STR_TO_DATE(canjeable.desde, '%d/%m/%Y %T')", "ASC")
      //     .getQuery();
      //   return 'NOT EXISTS ' + subQuery;
      // }))
      .getMany();

    return results;
  }

}
