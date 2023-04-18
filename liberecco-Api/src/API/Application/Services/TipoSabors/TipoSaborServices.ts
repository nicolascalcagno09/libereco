import NotFoundEntityException from '../../Exceptions/NotFoundEntityException';
import TipoSabor from '../../Domain/Entities/TipoSabor';
import { getRepository, Repository } from 'typeorm';

/**
 * @package TipoSaborServices
 * @author Prixel
 * @email <contacto@prixel.com>
 */
export default class TipoSaborServices {
  private tipoSaborRepository: Repository<TipoSabor>;

  constructor() {
  }

  public async getAll() {
    this.tipoSaborRepository = getRepository(TipoSabor);
    return await this.tipoSaborRepository.find({ order: { nombre: 'ASC' } });
  }

  public async findOne(conditions) {
    this.tipoSaborRepository = getRepository(TipoSabor);
    return await this.tipoSaborRepository.findOne(conditions);
  }

  public async getById(id: number) {
    this.tipoSaborRepository = getRepository(TipoSabor);
    const tipoSabor = await this.tipoSaborRepository.findOne({ where: { id } });

    if (!tipoSabor) {
      throw new NotFoundEntityException(`TipoSabor with id: ${id} not found`);
    }

    return tipoSabor;
  }

  public async store(tipoSabor: TipoSabor) {
    this.tipoSaborRepository = getRepository(TipoSabor);
    return await this.tipoSaborRepository.save(tipoSabor);
  }

  public async update(tipoSabor: TipoSabor) {
    this.tipoSaborRepository = getRepository(TipoSabor);

    const affected = await this.tipoSaborRepository.createQueryBuilder()
      .update(TipoSabor)
      .set(tipoSabor)
      .where('id = :id', { id: tipoSabor.getId() })
      .execute();

    return affected;
  }

  public async destroy(id: number) {
    this.tipoSaborRepository = getRepository(TipoSabor);
    const affected = await this.tipoSaborRepository.delete(id);

    return affected;
  }

  public async getAllTiposConSabores() {
    this.tipoSaborRepository = getRepository(TipoSabor);
    return await this.tipoSaborRepository.find({relations: ['sabores']});
  }

  public async getAllTiposConSaboresActivos() {
    this.tipoSaborRepository = getRepository(TipoSabor);
    return await this.tipoSaborRepository.createQueryBuilder("tipoSabor")
      .leftJoinAndSelect("tipoSabor.sabores", "sabor")
      .where('sabor.activo IS TRUE')
      .orderBy('sabor.orden', 'ASC')
      .addOrderBy('sabor.titulo', 'ASC')
      .getMany();
  }
}
