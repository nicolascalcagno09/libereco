import * as express from 'express';
import PresentacionController from '../../Controllers/PresentacionController';
const formidableMiddleware = require('express-formidable');

const router = express.Router();

const presentacionController = new PresentacionController();

// Index
router.get('/', (req, res, next) => {
  presentacionController.index(req, res, next);
});

// Create
router.post('/', formidableMiddleware(), (req, res, next) => {
  presentacionController.store(req, res, next);
});

// Show
router.get('/:id([0-9]+)', (req, res, next) => {
  presentacionController.show(req, res, next);
});

// Update
router.put('/:id([0-9]+)', formidableMiddleware(), (req, res, next) => {
  presentacionController.update(req, res, next);
});

// Delete
router.delete('/:id([0-9]+)', (req, res, next) => {
  presentacionController.destroy(req, res, next);
});

// Update Active Status
router.post('/active', (req, res, next) => {
  presentacionController.setActiveStatus(req, res, next);
});

// Index solo activos
router.get('/all-activos', (req, res, next) => {
  presentacionController.allActivos(req, res, next);
});

// Index con orden
router.get('/by-orden', (req, res, next) => {
  presentacionController.allByOrden(req, res, next);
});

// Index activos con orden
router.get('/all-activos/by-orden', (req, res, next) => {
  presentacionController.allActivosByOrden(req, res, next);
});

export default router;
