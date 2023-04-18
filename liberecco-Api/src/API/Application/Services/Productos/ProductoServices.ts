import NotFoundEntityException from '../../Exceptions/NotFoundEntityException';
import Producto from '../../Domain/Entities/Producto';
import { getRepository, Repository, getConnection } from 'typeorm';
import Sabor from 'API/Application/Domain/Entities/Sabor';

/**
 * @package ProductoServices
 * @author Prixel
 * @email <contacto@prixel.com>
 */
export default class ProductoServices {
  private productoRepository: Repository<Producto>;

  constructor() {
  }

  public async getAll() {
    this.productoRepository = getRepository(Producto);
    return await this.productoRepository.find();
  }

  public async findOne(conditions) {
    this.productoRepository = getRepository(Producto);
    return await this.productoRepository.findOne(conditions);
  }

  public async getById(id: number) {
    this.productoRepository = getRepository(Producto);
    const producto = await this.productoRepository.findOne({ where: { id } });

    if (!producto) {
      throw new NotFoundEntityException(`Producto with id: ${id} not found`);
    }

    return producto;
  }

  public async store(producto: Producto) {
    this.productoRepository = getRepository(Producto);
    return await this.productoRepository.save(producto);
  }

  public async update(producto: Producto) {
    this.productoRepository = getRepository(Producto);

    const affected = await this.productoRepository.createQueryBuilder()
      .update(Producto)
      .set(producto)
      .where('id = :id', { id: producto.getId()})
      .execute();

    return affected;
  }

  public async updateConSabores(producto: Producto, ids?: any[]) {
    this.productoRepository = getRepository(Producto);

    const affected = await this.productoRepository.createQueryBuilder()
      .update(Producto)
      .set(producto)
      .where('id = :id', { id: producto.getId()})
      .execute();

      const actualRelationships = await getConnection()
      .createQueryBuilder()
      .relation(Producto, "sabores")
      .of(producto).loadMany();
      
      await getConnection()
      .createQueryBuilder()
      .relation(Producto, "sabores")
      .of(producto)
      .addAndRemove(ids, actualRelationships);
      
    return affected;
  }

  public async destroy(id: number) {
    this.productoRepository = getRepository(Producto);
    const affected = await this.productoRepository.delete(id);

    return affected;
  }

  public async getAllConPresentaciones() {
    this.productoRepository = getRepository(Producto);
    return await this.productoRepository.find({relations: ['presentaciones']});
  }

  public async updateActivoStatus(producto: Producto) {
    this.productoRepository = getRepository(Producto);

    const affected = await this.productoRepository.createQueryBuilder()
      .update(Producto)
      .set({ activo: producto.getActivo() })
      .where('id = :id', { id: producto.getId() })
      .execute();

    return affected;
  }

  public async getAllActivos() {
    this.productoRepository = getRepository(Producto);
    return await this.productoRepository.find({where: {activo: true}});
  }

  public async getAllActivosConPresentaciones() {
    this.productoRepository = getRepository(Producto);
    return await this.productoRepository.find({where: {activo: true}, relations: ['presentaciones']});
  }

  public async getAllActivosConPresentacionesActivas() {
    this.productoRepository = getRepository(Producto);
    return await this.productoRepository.createQueryBuilder("producto")
      .leftJoinAndSelect("producto.presentaciones", "presentacion", "presentacion.activo = true")
      .leftJoinAndSelect("producto.sabores", "sabor", "sabor.activo = true")
      .where("producto.activo = true")
      .getMany();
  }

  public async getAllActivosByOrden() {
    this.productoRepository = getRepository(Producto);
    return await this.productoRepository.find({where: {activo: true}, order: { orden: 'ASC' , nombre: 'ASC'}});
  }

  public async getAllByOrden() {
    this.productoRepository = getRepository(Producto);
    return await this.productoRepository.find({order: { orden: 'ASC' , nombre: 'ASC'}});
  }

  public async getAllActivosConOrdenConPresentacionesActivasConOrden() {
    this.productoRepository = getRepository(Producto);
    return await this.productoRepository.createQueryBuilder("producto")
      .leftJoinAndSelect("producto.presentaciones", "presentacion", "presentacion.activo = true")
      .leftJoinAndSelect("producto.sabores", "sabor", "sabor.activo = true")
      .where("producto.activo = true")
      .orderBy("producto.orden", "ASC")
      .addOrderBy("presentacion.orden", "ASC")
      .addOrderBy("sabor.orden", "ASC")
      .getMany();
  }

  public async getByIds(ids: number[]) {
    this.productoRepository = getRepository(Producto);
    const productos = await this.productoRepository.findByIds(ids);
    return productos;
  }
}
