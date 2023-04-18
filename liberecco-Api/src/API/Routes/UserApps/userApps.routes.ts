import * as express from 'express';
import UserAppController from '../../Controllers/UserAppController';

const router = express.Router();

const userAppController = new UserAppController();

// Index
router.get('/', (req, res, next) => {
  userAppController.index(req, res, next);
});

// Create
router.post('/', (req, res, next) => {
  userAppController.store(req, res, next);
});

// Show
router.get('/:id([0-9]+)', (req, res, next) => {
  userAppController.show(req, res, next);
});

// Update
router.put('/:id([0-9]+)', (req, res, next) => {
  userAppController.update(req, res, next);
});

// Delete
router.delete('/:id([0-9]+)', (req, res, next) => {
  userAppController.destroy(req, res, next);
});

// show by uid (firebase auth)
router.get('/:uid', (req, res, next) => {
  userAppController.userByUid(req, res, next);
});

// Update
router.put('/uid/:uid', (req, res, next) => {
  userAppController.updateByUid(req, res, next);
});

// Validate DNI
router.get('/dni/:dni([0-9]+)', (req, res, next) => {
  userAppController.getDniAvaliable(req, res, next);
});

export default router;
