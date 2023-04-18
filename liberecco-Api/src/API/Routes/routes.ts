import express from 'express';
import { error } from '../Common/Result';
import ErrorHandler from '../Middlewares/ErrorHandler';
import { logRequest } from '../Middlewares/LoggerMiddleware';
import { authenticateRequest, authorizeRequest } from '../Middlewares/OAuth2Middleware';

import configuration from '../Config/configuration';

import authenticationRoutes from './OAuth2/authentication.routes';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerDefinition from './../Config/swagger.json';
import meRoutes from './Users/me.routes';

import usersRoutes from './Users/users.routes';
import sucursalesRoutes from './Sucursals/sucursals.routes';
import saboresRoutes from './Sabors/sabors.routes'
import presentacionesRoutes from './Presentacions/presentacions.routes'
import productosRoutes from './Productos/productos.routes'
import tipoSaboresRoutes from './TipoSabors/tipoSabors.routes'
import turnosRoutes from './Turnos/turnos.routes'
import contactosRoutes from './Contactos/contactos.routes'
import sendMailRoutes from './Mail/sendmail.routes'
import promocionesRoutes from './Promocions/promocions.routes'
import novedadesRoutes from './Novedads/novedads.routes'
import cuponesRoutes from './Cupons/cupons.routes'
import canjeablesRoutes from './Canjeables/canjeables.routes'
import usersAppRoutes from './UserApps/userApps.routes'
import smsRoutes from './SMS/sms.routes'
import pushRoutes from './Notificaciones/noti.routes'

/*
  Instructions for parameters management on ExpressJS Router
  For query params: req.query
  For route params: req.params.id
  For body params: req.body.name
 */
const router = express.Router();

const specs = swaggerJsdoc({ swaggerDefinition, apis: ['../../API/Routes/**/*'], basePath: swaggerDefinition.basePath });
// All router middleware
router.use(logRequest);

// Public routes
router.use(configuration.static_dir, express.static(configuration.public_dir));
router.use('/uploads', express.static(process.env.PWD + "/lib_uploads"));
router.use('/api/contactos', contactosRoutes);
router.use('/api/sendmail', sendMailRoutes);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  explorer: true,
}));
router.use('/api/sms', smsRoutes);

import SendMessageToQueueCommand from '../Application/Commands/ATLAS/SendMessageToQueueCommand';
import CommandBus from '../Application/Commands/CommandBus';

router.post('/api/atlas-test', async (req, res, next) => {
  // res.setHeader('Content-Type', 'application/json');
  // res.send(specs);
  // await CommandBus.handle(new SendMessageToQueueCommand( {queue: 'ATLASPICKORDERS', message : req.body}) );
  await CommandBus.handle(new SendMessageToQueueCommand(req.body));
  res.send({ response: 'Ok' });
});

router.get('/api-docs.json', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(specs);
});
router.use('/api/oauth2/', authenticationRoutes);

// Authorization required
router.use(authenticateRequest);

router.use('/api/profile', meRoutes);

router.use('/api/users', usersRoutes);

router.use('/api/sucursales', sucursalesRoutes);

router.use('/api/sabores', saboresRoutes);

router.use('/api/tipo-sabores', tipoSaboresRoutes);

router.use('/api/presentaciones', presentacionesRoutes);

router.use('/api/productos', productosRoutes);

router.use('/api/turnos', turnosRoutes);

router.use('/api/promociones', promocionesRoutes);

router.use('/api/novedades', novedadesRoutes);

router.use('/api/cupones', cuponesRoutes);

router.use('/api/canjeables', canjeablesRoutes);

router.use('/api/users-app', usersAppRoutes);

router.use('/api/push', pushRoutes);

// Access Control List Required
router.use(authorizeRequest);

/**
 * Routes for label
 * @todo create schemas, tables, relations, queries, and another routes
 */
router.use(ErrorHandler);

// No routes matched
router.use((req, res, next) => {
  res.status(404).json(
    error(
      'Page not found',
      'Sorry can not find that!',
      404,
    ),
  );
});

// Error handler

export default router;
