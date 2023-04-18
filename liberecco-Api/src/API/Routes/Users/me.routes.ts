import * as express from 'express';
import UserController from '../../Controllers/UserController';
const router = express.Router();

const userController = new UserController();

/**
 * @swagger
 * /profile:
 *    post:
 *      tags: [
 *          Users
 *       ]
 *      description: Retrives the authenticated user's profile
 *      summary: user profile
 *      security:
 *        - api_key
 *      responses:
 *        200:
 *          description: Ok
 */
router.get('/', (req, res, next) => {
  userController.getProfile(req, res, next);
});

export default router;
