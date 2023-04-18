import * as express from 'express';
import OAuth2Middleware from '../../Middlewares/OAuth2Middleware';
import OAuth2TokenController from '../../Controllers/OAuth2TokenController';

const router = express.Router();
const oAuth2TokenController = new OAuth2TokenController();

/**
 * @swagger
 * /oauth2/access_token:
 *    post:
 *      tags: [
 *          Login
 *      ]
 *      description: Retrive an access token
 *      summary: Login
 *      security:
 *        - basic
 *      consumes:
 *        - application/x-www-form-urlencoded
 *      produces:
 *        - plain/text
 *        - application/json
 *      parameters:
 *        - in: formData
 *          name: user
 *          type: string
 *          required: true
 *          description: The user's email
 *        - in: formData
 *          name: password
 *          type: string
 *          required: true
 *          description: The user's password
 *        - in: formData
 *          name: grant_type
 *          type: string
 *          required: true
 *          default: password
 *          description: Grant access type
 *      responses:
 *        200:
 *          description: Ok
 */

router.post('/access_token', (req, res, next) => oAuth2TokenController.requestAccessToken(req, res, next));

/**
 * @swagger
 * /oauth2/logout:
 *    get:
 *      tags: [
 *          Login
 *      ]
 *      description: Revokes the authenticated user's token
 *      summary: Logout
 *      security:
 *        - api_key
 *      responses:
 *        200:
 *          description: Ok
*/
router.get('/logout', OAuth2Middleware, (req, res, next) => {
  oAuth2TokenController.revokeToken(req, res, next);
});

export default router;
