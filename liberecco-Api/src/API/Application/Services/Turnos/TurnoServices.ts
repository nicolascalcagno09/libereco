import NotFoundEntityException from '../../Exceptions/NotFoundEntityException';
import Turno from '../../Domain/Entities/Turno';
import { getRepository, Repository } from 'typeorm';

/**
 * @package TurnoServices
 * @author Prixel
 * @email <contacto@prixel.com>
 */
export default class TurnoServices {
  private turnoRepository : Repository<Turno>;

  constructor() {
  }

  public async getAll() {
    this.turnoRepository = getRepository(Turno);
    return await this.turnoRepository.find({ relations: ["sucursal"]});
  }

  public async findOne(conditions) {
    this.turnoRepository = getRepository(Turno);
    return await this.turnoRepository.findOne(conditions);
  }

  public async getById(id: number) {
    this.turnoRepository = getRepository(Turno);
    const turno = await this.turnoRepository.find( { where : { id } , relations: ["sucursal"]} );

    if (!turno ) {
      throw new NotFoundEntityException(`Turno with id: ${id} not found`);
    }

    return turno;
  }

  public async store(turno: Turno) {
    this.turnoRepository = getRepository(Turno);
    return await this.turnoRepository.save(turno);
  }

  public async update(turno: Turno) {
    this.turnoRepository = getRepository(Turno);

    const affected = await this.turnoRepository.createQueryBuilder()
    .update(Turno)
    .set(turno)
    .where('id = :id', { id : turno.getId() })
    .execute();

    return affected;
  }

  public async destroy(id: number) {
    this.turnoRepository = getRepository(Turno);
    const affected = await this.turnoRepository.delete(id);

    return affected;
  }

  public async getTurnosBySucursal(id: number) {
    this.turnoRepository = getRepository(Turno);
    const turnos = await this.turnoRepository.find({ where: { sucursal: { id } } });

    if (!turnos) {
      throw new NotFoundEntityException(`Turnos with sucursal_id: ${id} not found`);
    }

    return turnos;
  }

  public async getAllOrderedByDiaAndTipo(id: number) {
    this.turnoRepository = getRepository(Turno);
    return await this.turnoRepository.find({where: { sucursal: { id } }, relations: ["sucursal"], order: { diaDeLaSemana: 'ASC'} });
  }
}
