const oauth2Configuration = {
  model: require('../Application/Services/OAuth2TokenServices/OAuth2TokenServices'),
  accessTokenLifetime: 1 * 60 * 60,
  refreshTokenLifetime: (1 * 60 * 60) * 2,
};

export default oauth2Configuration;
