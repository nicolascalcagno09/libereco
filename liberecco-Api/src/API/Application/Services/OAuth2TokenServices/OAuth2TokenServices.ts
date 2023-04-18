import OAuth2Token from '../../Domain/Entities/OAuth2Token';
import Client from '../../Domain/Entities/Client';
import User from '../../Domain/Entities/User';
import CryptoHashPasswordServices from '../Users/CryptoHashPasswordServices';
import NotFoundEntityException from '../../Exceptions/NotFoundEntityException'
/**
 * @package OAuth2TokenServices
 * @author Martin Wehren
 */
module.exports.getAccessToken = async function (bearerToken) {
  return await OAuth2Token.findOne({ where: { accessToken: bearerToken }, relations: ['user'] });
};

module.exports.getUser = async function (username, password) {
  const cryptoService = new CryptoHashPasswordServices();
  const user = await User.findOne({ where: { email: username } });
  if (!user) {
    return false;
  }

  const isValidUser = cryptoService.validPassword(user.getPassword(), user.getSalt(), password);

  if (isValidUser) {
    return user;
  } else {
    return false;
  }
};

module.exports.getClient = async function (clientId, clientSecret) {
  return await Client.findOne({ name: clientId, secret: clientSecret, enabled: true });
};

module.exports.saveToken = async function (token, client, user) {
  token.user = user;
  token.client = client;

  const oAuth2Token = new OAuth2Token(token);
  await oAuth2Token.save();

  return oAuth2Token;
};

module.exports.revokeToken = async function (token, callback) {
  await token.remove();
  return callback(undefined, true);
};

/* TODO: Implement this function to obtain the correct refresh token*/
module.exports.getRefreshToken = async function (refreshToken, callback) {
  return await OAuth2Token.findOne({ where: { refreshToken }, relations: ['client', 'user'] })
    .then((res) => {
      if (res) callback(undefined, res);
      else callback(new NotFoundEntityException('Unauthorized refresh token'));
    })
    .catch((err) => { console.error(err); return callback(err) });
};
