import NotFoundEntityException from '../../Exceptions/NotFoundEntityException';
import User from '../../Domain/Entities/User';
import IUserRepository from '../../Domain/Repositories/IUserRepository';
import UserRepository from '../../../../Persistence/Repositories/UserRepository';
import { getRepository, Repository } from 'typeorm';

/**
 * @package UserServices
 * @author Martin Wehren
 * @email <tinwehren@gmail.com>
 */
export default class UserServices {
  private repo: Repository<User>;
  private userRepository: IUserRepository;

  constructor() {
    this.userRepository = new UserRepository()
  }

  public async getAll() {
    this.repo = getRepository(User)
    return await this.repo.createQueryBuilder('user')
    .leftJoin('user.sucursal', 'sucursal')
    .addSelect(['sucursal.id', 'sucursal.localidad', 'sucursal.direccion'])
    .orderBy('user.id', 'ASC')
    .getMany()
  }

  public async getById(id: number, exception = false) {
    this.repo = getRepository(User);
    const user = await this.repo.findOne({ where: { id }, relations: ['sucursal']});

    if (!user && !exception) {
      throw new NotFoundEntityException(`User with id: ${id} not found`);
    }

    return user;
  }

  public async store(user: User) {
    return await this.userRepository.persist(user);
  }

  public async destroy(id: number) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundEntityException(`User with id: ${id} not found`);
    }

    const result = await this.userRepository.destroy(id);

    if (!result && !result.affected) {
      throw new Error(`User with id: ${id} cannot be deleted`);
    }

    return result.affected;
  }

  public async getByEmail(email: string) {
    const user = await this.userRepository.findByEmail(email);
    return user;
  }

  public async getByToken(token: string) {
    const user = await this.userRepository.findByToken(token);

    if (!user) {
      throw new NotFoundEntityException(`User with token: ${token} not found`);
    }

    return user;
  }



  public async getByIds(ids: number[]) {
    this.repo = getRepository(User);
    return await this.repo.findByIds(ids, { relations: ['usersRegisterTime'] });
  }

  public async getByIdsWithStartWorkTime(ids: number[]) {
    this.repo = getRepository(User);

    let listIdsString = ids.join(',');

    return await this.repo.query("SELECT kUser.*, TIME_FORMAT(kUserTime.inputDate, '%H:%i') AS `start_time` FROM krack_user kUser LEFT JOIN krack_users_register_time kUserTime ON kUser.id = kUserTime.userId INNER JOIN (SELECT MAX(id) AS id, userId FROM krack_users_register_time GROUP BY userId ) AS max_user_register_time ON max_user_register_time.id = kUserTime.id WHERE kUser.id IN (" + listIdsString + ")");
  }
}
