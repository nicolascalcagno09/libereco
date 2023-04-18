import * as express from 'express';
import SucursalController from '../../Controllers/SucursalController';
const formidableMiddleware = require('express-formidable');

const router = express.Router();

const sucursalController = new SucursalController();

// Index
router.get('/', (req, res, next) => {
  sucursalController.index(req, res, next);
});

// Create
router.post('/', formidableMiddleware(), (req, res, next) => {
  sucursalController.store(req, res, next);
});

// Show
router.get('/:id([0-9]+)', (req, res, next) => {
  sucursalController.show(req, res, next);
});

// Update
router.put('/:id([0-9]+)', formidableMiddleware(),(req, res, next) => {
  sucursalController.update(req, res, next);
});

// Delete
router.delete('/:id([0-9]+)', (req, res, next) => {
  sucursalController.destroy(req, res, next);
});

// Update Active Status
router.post('/active', (req, res, next) => {
  sucursalController.setActiveStatus(req, res, next);
});

// Create
router.post('/productos', (req, res, next) => {
  sucursalController.storeProductos(req, res, next);
});

// Index solo activas
router.get('/all-activos', (req, res, next) => {
  sucursalController.allActivos(req, res, next);
});

// Index activos con orden
router.get('/all-activos/by-orden', (req, res, next) => {
  sucursalController.allActivosByOrden(req, res, next);
});

// Index ALL con orden
router.get('/by-orden', (req, res, next) => {
  sucursalController.allByOrden(req, res, next);
});

// Show by URL amigable
router.get('/:urlamigable', (req, res, next) => {
  sucursalController.sucursalByUrlamigable(req, res, next);
});

// Index ALL light - pocos datos
router.get('/all/light', (req, res, next) => {
  sucursalController.allLightData(req, res, next);
});

export default router;
