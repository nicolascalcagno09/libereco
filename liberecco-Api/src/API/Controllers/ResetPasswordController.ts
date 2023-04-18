import UserServices from '../Application/Services/Users/UserServices';
import InvalidArgumentException from '../Application/Exceptions/InvalidArgumentException';
import NotFoundEntityException from '../Application/Exceptions/NotFoundEntityException';
import ResetPasswordServices from '../Application/Services/Users/ResetPasswordServices';
import configuration from '../Config/configuration';
import { success, error } from '../Common/Result';
import Validator from '../Common/Validator';
import {
  storeNewResetPasswordSchema,
  getResetPasswordLinkSchema,
} from './Schemas/ResetPasswordSchema';
import { codeErrors } from '../Config/Errors/errors';
import CryptoHashPasswordServices from '../Application/Services/Users/CryptoHashPasswordServices';
import InvalidCurrentPasswordException from '../Application/Exceptions/InvalidCurrentPasswordException';

export default class ResetPasswordController {
  private userServices: UserServices;
  private resetPasswordServices: ResetPasswordServices;
  private validator: Validator;
  private cryptoHashPasswordServices = new CryptoHashPasswordServices();

  constructor() {
    this.userServices = new UserServices();
    this.resetPasswordServices = new ResetPasswordServices();
    this.validator = new Validator();
  }

  public async sendLink(request, response,next) {
    try {
      const error = this.validator.validate(request.body, getResetPasswordLinkSchema);

      if (error) {
        return response.status(400).json(this.validator.validationResult(error.details));
      }

      const user = await this.userServices.getByEmail(request.body.email);
      if (!user ) {
        throw new NotFoundEntityException(`User with email: ${request.body.email} not found`);
      }

      const resetPasswordToken = await this.resetPasswordServices.generateToken(user);

      /* IMPORTANT SECURITY: Must Be send a email for the current user of course */
      const linkForResetPassword = `http://localhost:${configuration.port}/api/users/password/reset?token=${resetPasswordToken}`;
      /* IMPORTANT SECURITY: Must Be send a email for the current user of course */

      return response.status(200).json(
        success(
          linkForResetPassword,
          'Link for recover password retrieved',
          200,
        ),
      );
    } catch (e) {
      if (e instanceof NotFoundEntityException) {
        return response.status(404).json(
          error(
            e.message,
            e.name,
            404,
          ),
        );
      }

      return response.status(500).json(
        error(
          e.message,
          'Error occurred on: Try to retrieve link for recover password',
          500,
        ),
      );
    }
  }

  public async changePassword(request, response,next) {
    try {
      const input = {
        token: request.headers.authorization,
        user_id: request.body.user_id,
        old_password: request.body.old_password,
        new_password: request.body.new_password
      };

      const error = this.validator.validate(input, storeNewResetPasswordSchema);

      if (error) {
        return response.status(400).json(this.validator.validationResult(error.details));
      }

      const user = await this.userServices.getById(request.body.user_id);

      if (!this.cryptoHashPasswordServices.validPassword(user.getPassword(), user.getSalt(), input.old_password)){
        throw new InvalidCurrentPasswordException();
      }

      const saved = await this.resetPasswordServices.changePassword(
        user,
        request.body.new_password,
      );

      return response.status(200).json(
        success(
          saved,
          'User password changed',
          200,
        ),
      );
    } catch (e) {
      if (e instanceof InvalidArgumentException) {
        return response.status(400).json(
          error(
            codeErrors.STRING.ATTRIBUTES.PASSWORD_MATCH,
            e.name,
            400,
          ),
        );
      }

      if (e instanceof NotFoundEntityException) {
        return response.status(404).json(
          error(
            e.message,
            e.name,
            404,
          ),
        );
      }

      if (e instanceof InvalidCurrentPasswordException) {
        return response.status(401).json(
          error(
            codeErrors.STRING.ATTRIBUTES.WRONG_PASSWORD,
            e.name,
            400,
          ),
        );
      }

      return response.status(500).json(
        error(
          e.message,
          'Error occurred on: Try to retrieve list of roles',
          500,
        ),
      );
    }
  }
}