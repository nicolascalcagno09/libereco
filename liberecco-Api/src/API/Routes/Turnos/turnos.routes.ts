import * as express from 'express';
import TurnoController from '../../Controllers/TurnoController';

const router = express.Router();

const turnoController = new TurnoController();

// Index
router.get('/', (req, res, next) => {
  turnoController.index(req, res, next);
});

// Create
router.post('/', (req, res, next) => {
  turnoController.store(req, res, next);
});

// Show
router.get('/:id([0-9]+)', (req, res, next) => {
  turnoController.show(req, res, next);
});

// Update
router.put('/:id([0-9]+)', (req, res, next) => {
  turnoController.update(req, res, next);
});

// Delete
router.delete('/:id([0-9]+)', (req, res, next) => {
  turnoController.destroy(req, res, next);
});

// Turnos por Sucursal Id
router.get('/by-sucursal/:id([0-9]+)', (req, res, next) => {
  turnoController.allBySucursal(req, res, next);
});

// Turnos ordenados por diaDeSemana y Tipo
router.get('/orderby-dia-and-tipo/:id([0-9]+)', (req, res, next) => {
  turnoController.getAllOrderByDiaAndTipo(req, res, next);
});

export default router;
