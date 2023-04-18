import * as express from 'express';
import CuponController from '../../Controllers/CuponController';

const router = express.Router();

const cuponController = new CuponController();

// Index
router.get('/', (req, res, next) => {
  cuponController.index(req, res, next);
});

// Create
router.post('/', (req, res, next) => {
  cuponController.store(req, res, next);
});

// Create
router.post('/generate', (req, res, next) => {
  cuponController.generate(req, res, next);
});

// Create
router.post('/scan', (req, res, next) => {
  cuponController.scan(req, res, next);
});

// Show
router.get('/:id([0-9]+)', (req, res, next) => {
  cuponController.show(req, res, next);
});

// Update
router.put('/:id([0-9]+)', (req, res, next) => {
  cuponController.update(req, res, next);
});

// Delete
router.delete('/:id([0-9]+)/user/:userId([0-9]+)', (req, res, next) => {
  cuponController.destroy(req, res, next);
});

// Show
router.get('/user/:id([0-9]+)', (req, res, next) => {
  cuponController.showByUserId(req, res, next);
});

// Contactos por Sucursal Id
router.get('/by-sucursal/:id([0-9]+)', (req, res, next) => {
  cuponController.allBySucursal(req, res, next);
});

// Contactos por Sucursal Id
router.get('/by-user-scan/:id([0-9]+)', (req, res, next) => {
  cuponController.allByUserScan(req, res, next);
});

export default router;
