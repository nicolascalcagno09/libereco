import * as express from 'express';
import ProductoController from '../../Controllers/ProductoController';

const router = express.Router();

const productoController = new ProductoController();

// Index
router.get('/', (req, res, next) => {
  productoController.index(req, res, next);
});

// Create
router.post('/', (req, res, next) => {
  productoController.store(req, res, next);
});

// Show
router.get('/:id([0-9]+)', (req, res, next) => {
  productoController.show(req, res, next);
});

// Update
router.put('/:id([0-9]+)', (req, res, next) => {
  productoController.update(req, res, next);
});

// Delete
router.delete('/:id([0-9]+)', (req, res, next) => {
  productoController.destroy(req, res, next);
});

// Index con Presentaciones
router.get('/presentaciones', (req, res, next) => {
  productoController.indexConPresentaciones(req, res, next);
});

// Update Active Status
router.post('/active', (req, res, next) => {
  productoController.setActiveStatus(req, res, next);
});

// Index solo activos
router.get('/all-activos', (req, res, next) => {
  productoController.allActivos(req, res, next);
});

// Index solo activos con Presentaciones
router.get('/all-activos/presentaciones', (req, res, next) => {
  productoController.allActivosConPresentaciones(req, res, next);
});

// Index solo activos con Presentaciones activas
router.get('/all-activos/presentaciones-activas', (req, res, next) => {
  productoController.allActivosConPresentacionesActivas(req, res, next);
});

// Index activos by orden
router.get('/all-activos/by-orden', (req, res, next) => {
  productoController.allActivosByOrden(req, res, next);
});

// Index by orden
router.get('/all/by-orden', (req, res, next) => {
  productoController.allByOrden(req, res, next);
});

// Index solo activos con Presentaciones activas. Ambas ordenadas por orden.
router.get('/all-activos-by-orden/presentaciones-activas-by-orden', (req, res, next) => {
  productoController.allActivosConOrdenPresentacionesActivasConOrden(req, res, next);
});

export default router;
