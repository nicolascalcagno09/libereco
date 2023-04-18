import oauth2 from '../Config/oauth2';
import { userCanRequest } from '../Application/Policies/UserPolicies';
import JsonResult from '../Common/JsonResult';
const oAuth2Server = require('oauth2-server');
const Request = oAuth2Server.Request;
const Response = oAuth2Server.Response;
const oauth = new oAuth2Server(oauth2);
import * as _ from 'lodash';
import { verifyToken } from '../Common/firebase_admin';

export async function authenticateRequest(req, res, next) {
  const request = new Request(req);
  const response = new Response(res);

  const exceptionUrls = [
    '/api/consulta',
    '/api/servicio/filtros',
    '/api/contactos',
    '/api/sendmail'
  ];

  if (request.baseUrl != "/api/oauth2" && request.method === "GET" || _.includes(exceptionUrls, request.originalUrl)) {
    return next();
  }

  try {
    const token = await oauth.authenticate(request, response);
    req.token = token;
    req.user = await token.user;
    return next();
  } catch (error) {
    let user = await verifyToken(request);

    if (user && user != null) {
      req.user = user.payload;
      req.token = user.token;
      return next();
    } else {
      let error = {
        "errors": "Invalid token: access token is invalid",
        "message": "Invalid token: access token is invalid",
        "statusCode": 401
    };
      return next(error);
    }
  }

}

export async function authorizeRequest(req, res, next) {
  const user = await req.user;

  if (await userCanRequest(user, req)) {
    return next();
  }
  const error = new Error('Sorry but... You are not authorized to access this resource')
  _.assign(error, { statusCode: 403 });
  return next(error);
}

export default authenticateRequest;
