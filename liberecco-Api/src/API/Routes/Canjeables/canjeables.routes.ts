import * as express from 'express';
import CanjeableController from '../../Controllers/CanjeableController';
const formidableMiddleware = require('express-formidable');

const router = express.Router();

const canjeableController = new CanjeableController();

// Index
router.get('/', (req, res, next) => {
  canjeableController.index(req, res, next);
});

// Create
router.post('/', formidableMiddleware(), (req, res, next) => {
  canjeableController.store(req, res, next);
});

// Show
router.get('/:id([0-9]+)', (req, res, next) => {
  canjeableController.show(req, res, next);
});

// Update
router.put('/:id([0-9]+)', formidableMiddleware(), (req, res, next) => {
  canjeableController.update(req, res, next);
});

// Delete
router.delete('/:id([0-9]+)', (req, res, next) => {
  canjeableController.destroy(req, res, next);
});

// Show
router.get('/user/:id([0-9]+)', (req, res, next) => {
  canjeableController.showByUserId(req, res, next);
});

export default router;
