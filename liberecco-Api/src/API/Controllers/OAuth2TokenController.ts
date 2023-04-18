import oauth2 from '../Config/oauth2';
import oauth2Server from 'oauth2-server';
import { success, error } from '../Common/Result';
import JsonResult from '../Common/JsonResult';
import UserServices from "../Application/Services/Users/UserServices";
import ActionNotAllowedException from '../Application/Exceptions/ActionNotAllowedException';
export default class OAuth2TokenController {
  /**
   * Permisions to access to the frontend links
   * for now all users have all permissions
   * @todo create schema and assign permissions to users based in roles in the system
   */
  private accessPermitionsDictionary = {
    'user-time': null,
    'products': null,
    'labels': null,    
  };

  private userServices: UserServices;

  public async requestAccessToken(request, response, next) {


    this.userServices = new UserServices();

    const oauth = new oauth2Server(oauth2);
    const Request = oauth2Server.Request;
    const Response = oauth2Server.Response;

    if (request.body && !request.body.scope) {
      delete request.body.scope;
    }


    try {
      const token = await oauth.token(new Request(request), new Response(response));
      let user = await token.user;
      /**permission in front*/
      this.accessPermitionsDictionary['user-time'] = !user.hasWarehouse;
      this.accessPermitionsDictionary['products'] = true;
      this.accessPermitionsDictionary['labels'] = true;

      let userComplete:any = await this.userServices.getById(user.id);

      const tokenData = {
        access_token: token.accessToken,
        access_token_expires_at: token.accessTokenExpiresAt,
        refresh_token: token.refreshToken,
        refresh_token_expires_at: token.refreshTokenExpiresAt,
        user: userComplete,
        accessPermitionsDictionary: this.accessPermitionsDictionary
      };

      if(request.query.admin == 'true' && (userComplete.perfil != 'Administrador' && userComplete.perfil != 'Sucursal')) {
        throw new ActionNotAllowedException('Users cannot log in');
      }

      return response.status(200).json(
        success(
          tokenData,
          'Access Token information retrieved',
          200,
        ),
      );
    } catch (error) {
      return response.status(401).json(
        JsonResult(
          {},
          error.message,
          error.code,
        ),
      );
    }
  }

  public async revokeToken(request, response, next) {
    const user = await request.user;
    // const command = new DestroyPermissionsUserCommand(user.id);
    // await commandBus.handle(command);

    await request.token.remove();
    return response.status(200).json(success({}, 'Access token revoked', 200));
  }
}
