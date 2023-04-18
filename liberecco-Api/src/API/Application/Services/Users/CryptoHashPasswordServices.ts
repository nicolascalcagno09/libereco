'use strict';
import crypto from 'crypto';

/**
 * @package ResetPasswordServices
 * @author Martin Wehren
 * @email <tinwehren@gmail.com>
 */
export default class CryptoHashPasswordServices {
  public passwordHash(password: string) {
    const salt = crypto.randomBytes(16).toString('hex');

    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

    return {
      hash,
      salt,
    };
  }




  public validPassword(hashSaved, salt, password) {
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return hash === hashSaved;
  }
}