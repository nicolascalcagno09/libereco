import * as express from 'express';
import SaborController from '../../Controllers/SaborController';
const formidableMiddleware = require('express-formidable');

const router = express.Router();

const saborController = new SaborController();

// Index
router.get('/', (req, res, next) => {
  saborController.index(req, res, next);
});

// Create
router.post('/', formidableMiddleware(), (req, res, next) => {
  saborController.store(req, res, next);
});

// Show
router.get('/:id([0-9]+)', (req, res, next) => {
  saborController.show(req, res, next);
});

// Update
router.put('/:id([0-9]+)', formidableMiddleware(), (req, res, next) => {
  saborController.update(req, res, next);
});

// Delete
router.delete('/:id([0-9]+)', (req, res, next) => {
  saborController.destroy(req, res, next);
});

// Update Active Status
router.post('/active', (req, res, next) => {
  saborController.setActiveStatus(req, res, next);
});

// Index solo activos
router.get('/all-activos', (req, res, next) => {
  saborController.allActivos(req, res, next);
});

// Index ordenado
router.get('/by-orden', (req, res, next) => {
  saborController.byOrden(req, res, next);
});

// Index activos by orden
router.get('/all-activos/by-orden', (req, res, next) => {
  saborController.allActivosByOrden(req, res, next);
});

export default router;
