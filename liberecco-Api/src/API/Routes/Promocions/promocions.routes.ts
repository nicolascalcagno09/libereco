import * as express from 'express';
import PromocionController from '../../Controllers/PromocionController';
const formidableMiddleware = require('express-formidable');

const router = express.Router();

const promocionController = new PromocionController();

// Index
router.get('/', (req, res, next) => {
  promocionController.index(req, res, next);
});

// Create
router.post('/', formidableMiddleware(), (req, res, next) => {
  promocionController.store(req, res, next);
});

// Show
router.get('/:id([0-9]+)', (req, res, next) => {
  promocionController.show(req, res, next);
});

// Update
router.put('/:id([0-9]+)', formidableMiddleware(),(req, res, next) => {
  promocionController.update(req, res, next);
});

// Delete
router.delete('/:id([0-9]+)', (req, res, next) => {
  promocionController.destroy(req, res, next);
});

// all by id sucursal
router.get('/sucursal-id/:id([0-9]+)', (req, res, next) => {
  promocionController.allBySucursal(req, res, next);
});

// all by id sucursal
router.get('/all-generics', (req, res, next) => {
  promocionController.allGenerics(req, res, next);
});

export default router;
