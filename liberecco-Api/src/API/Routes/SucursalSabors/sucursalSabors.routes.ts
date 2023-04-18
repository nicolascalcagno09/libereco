import * as express from 'express';
import SucursalSaborController from '../../Controllers/SucursalSaborController';

const router = express.Router();

const sucursalSaborController = new SucursalSaborController();

// Index
router.get('/', (req, res, next) => {
  sucursalSaborController.index(req, res, next);
});

// Create
router.post('/', (req, res, next) => {
  sucursalSaborController.store(req, res, next);
});

// Show
router.get('/:id([0-9]+)', (req, res, next) => {
  sucursalSaborController.show(req, res, next);
});

// Update
router.put('/:id([0-9]+)', (req, res, next) => {
  sucursalSaborController.update(req, res, next);
});

// Delete
router.delete('/:id([0-9]+)', (req, res, next) => {
  sucursalSaborController.destroy(req, res, next);
});

export default router;
