import NotFoundEntityException from '../../Exceptions/NotFoundEntityException';
import Sucursal from '../../Domain/Entities/Sucursal';
import { getRepository, Repository, getConnection } from 'typeorm';
import SucursalSabor from '../../Domain/Entities/SucursalSabor';
import SucursalPresentacion from '../../Domain/Entities/SucursalPresentacion';

/**
 * @package SucursalServices
 * @author Prixel
 * @email <contacto@prixel.com>
 */
export default class SucursalServices {
  private sucursalRepository: Repository<Sucursal>;

  constructor() {
  }

  public async getAll() {
    this.sucursalRepository = getRepository(Sucursal);
    return await this.sucursalRepository.find({ relations: ["productos", "usuarios", "presentaciones","sabores", "presentaciones.presentacion","sabores.sabor", "turnos"], order: { localidad: 'ASC' } });
  }

  public async findOne(conditions) {
    this.sucursalRepository = getRepository(Sucursal);
    return await this.sucursalRepository.findOne(conditions);
  }

  /*public async getById(id: number) {
    this.sucursalRepository = getRepository(Sucursal);
    const sucursal = await this.sucursalRepository.findOne({ where: { id }, relations: ["productos", "usuarios", "presentaciones","sabores", "presentaciones.presentacion","sabores.sabor", "turnos"] });

    if (!sucursal) {
      throw new NotFoundEntityException(`Sucursal with id: ${id} not found`);
    }

    return sucursal;
  }*/

  public async getById(id: number) {
    this.sucursalRepository = getRepository(Sucursal);
    return await this.sucursalRepository.createQueryBuilder("sucursal")
      .leftJoinAndSelect("sucursal.productos", "producto")
      .leftJoinAndSelect("sucursal.presentaciones", "presentacion")
      .leftJoinAndSelect("sucursal.sabores", "sabor")
      .leftJoinAndSelect("sucursal.usuarios", "usuario")
      .leftJoinAndSelect("sucursal.turnos", "turno")
      .leftJoinAndSelect("presentacion.presentacion", "pp")
      .leftJoinAndSelect("sabor.sabor", "ss")
      .where("sucursal.id = " + id)
      .orderBy("pp.orden", "ASC")
      .getOne();
  }

  public async store(sucursal: Sucursal) {
    this.sucursalRepository = getRepository(Sucursal);
    return await this.sucursalRepository.save(sucursal);
  }

  public async update(sucursal: Sucursal) {
    this.sucursalRepository = getRepository(Sucursal);

    const affected = await this.sucursalRepository.createQueryBuilder()
      .update(Sucursal)
      .set(sucursal)
      .where('id = :id', { id: sucursal.getId() })
      .execute();

    return affected;
  }

  public async destroy(id: number) {
    this.sucursalRepository = getRepository(Sucursal);
    const affected = await this.sucursalRepository.delete(id);

    return affected;
  }

  public async updateActivoStatus(sucursal: Sucursal) {
    this.sucursalRepository = getRepository(Sucursal);

    const affected = await this.sucursalRepository.createQueryBuilder()
      .update(Sucursal)
      .set({ activo: sucursal.isActivo() })
      .where('id = :id', { id: sucursal.getId() })
      .execute();

    return affected;
  }

  public async storeProductos(sucursal: Sucursal) {
    this.sucursalRepository = getRepository(Sucursal);  

    let save = await this.sucursalRepository.save(sucursal);

    await getConnection().createQueryBuilder().delete().from(SucursalSabor).where("sucursalId IS NULL").execute();
    await getConnection().createQueryBuilder().delete().from(SucursalPresentacion).where("sucursalId IS NULL").execute();

    return save;
  }

  public async getAllActivos() {
    this.sucursalRepository = getRepository(Sucursal);
    return await this.sucursalRepository.find({where: {activo: true}, relations: ["productos", "usuarios", "presentaciones","sabores", "presentaciones.presentacion","sabores.sabor", "turnos"], order: { localidad: 'ASC' } });
  }

  public async getAllByOrden() {
    this.sucursalRepository = getRepository(Sucursal);
    return await this.sucursalRepository.find({ relations: ["productos"], order: { orden: 'ASC' , localidad: 'ASC'} });
  }

  public async getAllActivosByOrden() {
    this.sucursalRepository = getRepository(Sucursal);
    return await this.sucursalRepository.find({where: {activo: true}, order: { orden: 'ASC' , localidad: 'ASC'} });
  }

  public async getByUrlamigable(url: string) {
    this.sucursalRepository = getRepository(Sucursal);
    return await this.sucursalRepository.createQueryBuilder("sucursal")
      .leftJoinAndSelect("sucursal.productos", "producto")
      .leftJoinAndSelect("sucursal.presentaciones", "presentacion")
      .leftJoinAndSelect("sucursal.sabores", "sabor")
      .leftJoinAndSelect("sucursal.usuarios", "usuario")
      .leftJoinAndSelect("sucursal.turnos", "turno")
      .leftJoinAndSelect("presentacion.presentacion", "pp")
      .leftJoinAndSelect("sabor.sabor", "ss")
      .where("sucursal.urlamigable like :urlamigable ", {urlamigable: url })
      .orderBy("pp.orden", "ASC")
      .getOne();
  }

  public async getAllLight() {
    this.sucursalRepository = getRepository(Sucursal)
    return await this.sucursalRepository.createQueryBuilder('sucursal')
    .select(['sucursal.id', 'sucursal.localidad', 'sucursal.direccion', 'sucursal.imagen_path'])
    .where('sucursal.activo = :activo', { activo: true } )
    .orderBy('sucursal.orden', 'ASC')
    .addOrderBy('sucursal.localidad', 'ASC')
    .getMany()
  }
}
