import User from '../Entities/User';

export default interface IUserRepository {
  findById(id: number);
  findByEmail(email: string);
  findByToken(token: string);
  findAll();
  find(conditions);
  persist(user: User);
  destroy(id: number);
}