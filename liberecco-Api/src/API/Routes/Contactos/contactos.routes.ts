import * as express from 'express';
import ContactoController from '../../Controllers/ContactoController';

const router = express.Router();

const contactoController = new ContactoController();
// Index
router.get('/', (req, res, next) => {
  contactoController.index(req, res, next);
});

// Create
router.post('/', (req, res, next) => {
  contactoController.store(req, res, next);
});

// Show
router.get('/:id([0-9]+)', (req, res, next) => {
  contactoController.show(req, res, next);
});

// Update
router.put('/:id([0-9]+)', (req, res, next) => {
  contactoController.update(req, res, next);
});

// Delete
router.delete('/:id([0-9]+)', (req, res, next) => {
  contactoController.destroy(req, res, next);
});

// Contactos por Sucursal Id
router.get('/by-sucursal/:id([0-9]+)', (req, res, next) => {
  contactoController.allBySucursal(req, res, next);
});

// Update Active Status
router.post('/leida', (req, res, next) => {
  contactoController.setLeida(req, res, next);
});

router.get('/all-no-leidas', (req, res, next) => {
  contactoController.allLeidas(req, res, next);
});

router.get('/no-leidas-by-sucursal/:id([0-9]+)', (req, res, next) => {
  contactoController.allNoLeidasBySucursal(req, res, next);
});

router.get('/all-destacados', (req, res, next) => {
  contactoController.allDestacados(req, res, next);
});

router.get('/destacados-by-sucursal/:id([0-9]+)', (req, res, next) => {
  contactoController.destacadosBySucursal(req, res, next);
});

// Update Destacad
router.post('/destacado', (req, res, next) => {
  contactoController.setDestacado(req, res, next);
});

export default router;
