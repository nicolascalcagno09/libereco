import * as express from 'express';
import NovedadController from '../../Controllers/NovedadController';
const formidableMiddleware = require('express-formidable');

const router = express.Router();

const novedadController = new NovedadController();

// Index
router.get('/', (req, res, next) => {
  novedadController.index(req, res, next);
});

// Create
router.post('/', formidableMiddleware(), (req, res, next) => {
  novedadController.store(req, res, next);
});

// Show
router.get('/:id([0-9]+)', (req, res, next) => {
  novedadController.show(req, res, next);
});

// Update
router.put('/:id([0-9]+)', formidableMiddleware(), (req, res, next) => {
  novedadController.update(req, res, next);
});

// Delete
router.delete('/:id([0-9]+)', (req, res, next) => {
  novedadController.destroy(req, res, next);
});

// all by id sucursal
router.get('/sucursal-id/:id([0-9]+)', (req, res, next) => {
  novedadController.allBySucursal(req, res, next);
});

// all genericas
router.get('/all-generics', (req, res, next) => {
  novedadController.allGenerics(req, res, next);
});

export default router;
