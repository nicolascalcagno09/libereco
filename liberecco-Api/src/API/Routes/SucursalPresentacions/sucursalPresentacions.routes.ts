import * as express from 'express';
import SucursalPresentacionController from '../../Controllers/SucursalPresentacionController';

const router = express.Router();

const sucursalPresentacionController = new SucursalPresentacionController();

// Index
router.get('/', (req, res, next) => {
  sucursalPresentacionController.index(req, res, next);
});

// Create
router.post('/', (req, res, next) => {
  sucursalPresentacionController.store(req, res, next);
});

// Show
router.get('/:id([0-9]+)', (req, res, next) => {
  sucursalPresentacionController.show(req, res, next);
});

// Update
router.put('/:id([0-9]+)', (req, res, next) => {
  sucursalPresentacionController.update(req, res, next);
});

// Delete
router.delete('/:id([0-9]+)', (req, res, next) => {
  sucursalPresentacionController.destroy(req, res, next);
});

export default router;
