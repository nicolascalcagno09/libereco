import NotificationController from '../../Controllers/NotificationController';
import * as express from 'express';

const router = express.Router();

const notificationController = new NotificationController();

router.post('/send', (req, res, next) => {
    notificationController.sendPush(req, res, next);
});

router.post('/send/all', (req, res, next) => {
    notificationController.sendPushToAll(req, res, next);
});

export default router;