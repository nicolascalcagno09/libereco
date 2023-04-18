import * as express from 'express';
import SendMailController from '../../Controllers/SendMailController';

const router = express.Router();

const sendMailController = new SendMailController();

// Create
router.post('/', (req, res, next) => {
    sendMailController.send(req, res, next);
});

export default router;
