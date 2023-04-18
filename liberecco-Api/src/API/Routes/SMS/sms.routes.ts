import SMSController from '../../Controllers/SMSController';
import * as express from 'express';

const router = express.Router();

const smsController = new SMSController();

// Index
router.post('/send', (req, res, next) => {
  smsController.send(req, res, next);
});

router.post('/verify', (req, res, next) => {
    smsController.verify(req, res, next);
});

export default router;