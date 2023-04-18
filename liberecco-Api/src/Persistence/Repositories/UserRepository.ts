import User from '../../API/Application/Domain/Entities/User';
import IUserRepository from '../../API/Application/Domain/Repositories/IUserRepository';
import { getRepository, Repository } from 'typeorm';

export default class UserRepository implements IUserRepository {
  private repo: Repository<User>;

  async findAll() {
    this.repo = getRepository(User);

    return await this.repo.find();
  }

  async findById(id: number) {
    this.repo = getRepository(User);

    return await this.repo.findOne(id);
  }

  async findByToken(token) {
    this.repo = getRepository(User);

    return await this.repo.findOne({ resetPasswordToken: token });
  }

  async findByEmail(email: string) {
    this.repo = getRepository(User);

    return await this.repo.findOne({ email });
  }

  async find(conditions) {
    this.repo = getRepository(User);

    return await this.repo.find(conditions);
  }

  async persist(user: User) {
    this.repo = getRepository(User);

    return await this.repo.save(user);
  }

  async destroy(id: number) {
    this.repo = getRepository(User);

    return await this.repo.delete(id);
  }
}