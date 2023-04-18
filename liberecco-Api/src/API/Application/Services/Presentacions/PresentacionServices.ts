import NotFoundEntityException from '../../Exceptions/NotFoundEntityException';
import Presentacion from '../../Domain/Entities/Presentacion';
import { getRepository, Repository } from 'typeorm';

/**
 * @package PresentacionServices
 * @author Prixel
 * @email <contacto@prixel.com>
 */
export default class PresentacionServices {
  private presentacionRepository: Repository<Presentacion>;

  constructor() {
  }

  public async getAll() {
    this.presentacionRepository = getRepository(Presentacion);
    return await this.presentacionRepository.find({ relations: ["producto"] });
  }

  public async findOne(conditions) {
    this.presentacionRepository = getRepository(Presentacion);
    return await this.presentacionRepository.findOne(conditions);
  }

  public async getById(id: number) {
    this.presentacionRepository = getRepository(Presentacion);
    const presentacion = await this.presentacionRepository.findOne({ where: { id }, relations: ["producto"] });

    if (!presentacion) {
      throw new NotFoundEntityException(`Presentacion with id: ${id} not found`);
    }

    return presentacion;
  }

  public async store(presentacion: Presentacion) {
    this.presentacionRepository = getRepository(Presentacion);
    return await this.presentacionRepository.save(presentacion);
  }

  public async update(presentacion: Presentacion) {
    this.presentacionRepository = getRepository(Presentacion);

    const affected = await this.presentacionRepository.createQueryBuilder()
      .update(Presentacion)
      .set(presentacion)
      .where('id = :id', { id: presentacion.getId() })
      .execute();

    return affected;
  }

  public async destroy(id: number) {
    this.presentacionRepository = getRepository(Presentacion);
    const affected = await this.presentacionRepository.delete(id);

    return affected;
  }

  public async updateActivoStatus(presentacion: Presentacion) {
    this.presentacionRepository = getRepository(Presentacion);

    const affected = await this.presentacionRepository.createQueryBuilder()
      .update(Presentacion)
      .set({ activo: presentacion.getActivo() })
      .where('id = :id', { id: presentacion.getId() })
      .execute();

    return affected;
  }

  public async getAllActivos() {
    this.presentacionRepository = getRepository(Presentacion);
    return await this.presentacionRepository.find({where: {activo: true}, relations: ["producto"] });
  }

  public async getAllActivosByOrden() {
    this.presentacionRepository = getRepository(Presentacion);
    return await this.presentacionRepository.find({where: {activo : true}, relations: ["producto"], order: { orden: 'ASC' , titulo: 'ASC'} });
  }

  public async getAllByOrden() {
    this.presentacionRepository = getRepository(Presentacion);
    return await this.presentacionRepository.find({ relations: ["producto"], order: { orden: 'ASC' , titulo: 'ASC'} });
  }
}
