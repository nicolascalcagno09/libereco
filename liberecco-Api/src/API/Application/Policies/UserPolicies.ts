import User from '../Domain/Entities/User';
const Request = require('oauth2-server').Request;


export async function userCanRequest(user: User, req) {
  try {

    const client = await req.token.client;
    return true;

  } catch (error) {
    return false;
  }
}
