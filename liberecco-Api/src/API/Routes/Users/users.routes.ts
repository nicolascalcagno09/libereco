import * as express from 'express';
import UserController from '../../Controllers/UserController';
import ResetPasswordController from '../../Controllers/ResetPasswordController';

const router = express.Router();

const userController = new UserController();
const resetPasswordController = new ResetPasswordController();

/**
 * @swagger
 * /users:
 *    get:
 *      tags: [
 *          Users
 *      ]
 *      description: Retrive all users
 *      summary: Get users
 *      security:
 *        - api_key
 *      responses:
 *        200:
 *          description: Ok
 */
router.get('/', (req, res, next) => {
  userController.index(req, res, next);
});

/**
 * @swagger
 * /users:
 *    post:
 *      tags: [
 *          Users
 *      ]
 *      description: Creates a new user
 *      summary: POST User
 *      security:
 *        - api_key
 *      parameters:
 *        - in: body
 *          name: user
 *          description: The user to create
 *          schema:
 *            $ref: '#/definitions/NewUser'
 *      responses:
 *        200:
 *          description: Ok
*/
router.post('/', (req, res, next) => {
  userController.store(req, res, next);
});

/**
 * @swagger
 * /users/{id}:
 *    get:
 *      tags: [
 *          Users
 *      ]
 *      description: Retrives a user
 *      summary: GET single User
 *      security:
 *        - api_key
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The id of the user to retrive
 *      responses:
 *        200:
 *          description: A single user
 *          schema:
 *            $ref: '#/definitions/User'
*/
router.get('/:id([0-9]+)', (req, res, next) => {
  userController.show(req, res, next);
});

/**
 * @swagger
 * /users/{id}:
 *    put:
 *      tags: [
 *          Users
 *      ]
 *      description: Updates a single user
 *      summary: PUT single User
 *      security:
 *        - api_key
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The id of the user to update
 *        - in: body
 *          name: user
 *          schema:
 *            $ref: '#/definitions/User'
 *      responses:
 *        200:
 *          description: A single user
 *          schema:
 *            $ref: '#/definitions/User'
*/
router.put('/:id([0-9]+)', (req, res, next) => {
  userController.update(req, res, next);
});

/**
* @swagger
* /users/{id}:
*    delete:
*      tags: [
*          Users
*      ]
*      description: Removes a single user
*      summary: DELETE User
*      security:
*        - api_key
*      parameters:
*        - in: path
*          name: id
*          description: The id of the user to delete
*      responses:
*        200:
*          description: OK
*/
router.delete('/:id([0-9]+)', (req, res, next) => {
  userController.destroy(req, res, next);
});


/**
 * @swagger
 * /users/{userId}/roles/:
 *    get:
 *      tags: [
 *          Users
 *      ]
 *      description: Retrive a the roles a user has assigned
 *      summary: GET user roles
 *      security:
 *        - api_key
 *      parameters:
 *        - in: path
 *          name: userId
 *          description: The id of the user of interes
 *      responses:
 *        200:
 *          description: OK
 */
//router.get('/:userId([0-9]+)/roles', (req, res, next) => userController.getRoles(req, res, next));

/**
 * @swagger
 * /users/password/email:
 *    post:
 *      tags: [
 *          Users
 *      ]
 *      description: Unknow functionality
 *      summary: The documenter does not know what this end point does. Maybe sends an email to reset the password
 *      security:
 *        - api_key
 *      responses:
 *        200:
 *          description: OK
 */
router.post('/password/email', (req, res, next) => {
  resetPasswordController.sendLink(req, res, next);
});

/**
 * @swagger
 * /users/password/reset:
 *    post:
 *      tags: [
 *          Users
 *      ]
 *      description: Unknow functionality
 *      summary: The documenter does not know what this end point does. Maybe it resets a password
 *      security:
 *        - api_key
 *      responses:
 *        200:
 *          description: OK
 */
router.post('/password/reset', (req, res, next) => {
  resetPasswordController.changePassword(req, res, next);
});

/**
 * @swagger
 * /users/{id}/warehouses/:
 *    get:
 *      tags: [
 *          Users
 *      ]
 *      description: Retrive a the warehouses a user has assigned
 *      summary: GET user warehouses
 *      security:
 *        - api_key
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The id of the user of interes
 *      responses:
 *        200:
 *          description: User´s warehouses retrieved
 *        404:
 *          description: The user with id: {id} doesn´t has warehouses assigned
 *          schema: $ref: '#/definitions/DataResponseNotFoundException'
 */
router.get('/:id([0-9]+)/warehouses', (req, res,next) => userController.getWarehouses(req, res,next));

export default router;
