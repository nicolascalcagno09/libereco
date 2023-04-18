import User from '../../Domain/Entities/User';
import crypto from 'crypto';
import UserRepository from '../../../../Persistence/Repositories/UserRepository';
import CryptoHashPasswordServices from './CryptoHashPasswordServices';

/**
 * @package ResetPasswordServices
 * @author Martin Wehren
 * @email <tinwehren@gmail.com>
 */
export default class ResetPasswordServices {
  private userRepository: UserRepository;
  private cryptoServices: CryptoHashPasswordServices;

  constructor() {
    this.userRepository = new UserRepository();
    this.cryptoServices = new CryptoHashPasswordServices();
  }

  public async generateToken(user: User) {
    const token = crypto.randomBytes(32).toString('hex');

    user.setResetPasswordToken(token);

    await this.userRepository.persist(user);

    if (user.hasResetPasswordToken()) {
      return user.getResetPasswordToken();
    }

    return null;
  }

  public async changePassword(user: User, newPassword: string) {
    const password = this.cryptoServices.passwordHash(newPassword);

    user.setPassword(password.hash);
    user.setSalt(password.salt);
    user.setResetPasswordToken('');

    return await this.userRepository.persist(user);
  }
}