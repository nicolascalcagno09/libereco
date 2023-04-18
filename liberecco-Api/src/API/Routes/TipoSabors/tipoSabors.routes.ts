import * as express from 'express';
import TipoSaborController from '../../Controllers/TipoSaborController';

const router = express.Router();

const tipoSaborController = new TipoSaborController();

// Index
router.get('/', (req, res, next) => {
  tipoSaborController.index(req, res, next);
});

// Create
router.post('/', (req, res, next) => {
  tipoSaborController.store(req, res, next);
});

// Show
router.get('/:id([0-9]+)', (req, res, next) => {
  tipoSaborController.show(req, res, next);
});

// Update
router.put('/:id([0-9]+)', (req, res, next) => {
  tipoSaborController.update(req, res, next);
});

// Delete
router.delete('/:id([0-9]+)', (req, res, next) => {
  tipoSaborController.destroy(req, res, next);
});

// Index con Tipo de Sabores
router.get('/all-sabores', (req, res, next) => {
  tipoSaborController.indexConTipoSabor(req, res, next);
});

// Index con Tipo de Sabores, sabores activos
router.get('/all-sabores-activos', (req, res, next) => {
  tipoSaborController.indexConTipoSaborAllActivos(req, res, next);
});

export default router;
