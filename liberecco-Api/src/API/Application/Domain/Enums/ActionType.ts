export enum ActionsTypes {
  INTERNAL_WAREHOUSE_POSITIONING_OUTPUT =       1,
  POSITIONING_INTERNAL_WAREHOUSE_ENTRY =        2,
  POSITIONING_NEW_PRODUCT =                     3,
  POSITIONING_NEW_ROLLBACK_PRODUCT =            4,
  POSITIONING_ANOTHER_WAREHOUSE =               5,
  POSITIONING_ANOTHER_ROLLBACK =                6,
  POSITIONING_NEW_RECORD =                      7,
  PIKING =                                      8,
  ROLLBACK_PINKING =                            9,
  POSITIONING_INTERNAL_WAREHOUSE_ROLLBACK =     10,
  PIKING_CONSOLIDATED =                         11,
  ROLLBACK_PIKING_CONSOLIDATED =                12,
  PRODUCT_PICKING_NOT_FOUND =                   13,
  PIKING_STORE =                                14,
  RELABEL_PRODUCT =                             15,
  TRANSFER_FULL_CARRIER_PACKINGS =              16,
  TRANSFER_SELECTIVE_CARRIER_PACKINGS =         17,
  // ADD new CarrierSwitch
  // ADD single CarrierSwitch
}

/**
 *  @swagger
 *
 *  definitions:
 *    ActionType:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *        name:
 *          type: string
 */

/**
 *  @swagger
 *
 *  definitions:
 *    DataResponseActionTypes:
 *      type: object
 *      properties:
 *        data:
 *          type: array
 *          items:
 *            $ref: '#/definitions/ActionType'
 *        message:
 *          type: string
 *        code:
 *          type: integer
 */

export const actionType = [
  {
    id: 1,
    name: 'Posicionamiento almacén interno salida',
  },
  {
    id: 2,
    name: 'Posicionamiento almacén interno entrada',
  },
  {
    id: 3,
    name: 'Posicionamiento nuevo Producto',
  },
  {
    id: 4,
    name: 'Posicionamiento nuevo Producto rollback',
  },
  {
    id: 5,
    name: 'Posicionamiento otro almacen',
  },
  {
    id: 6,
    name: 'Posicionamiento otro rollback',
  },
  {
    id: 7,
    name: 'Posicionamiento nuevo registro',
  },
  {
    id: 8,
    name: 'Piking',
  },
  {
    id: 9,
    name: 'Rollback pinking',
  },
  {
    id: 10,
    name: 'Posicionamiento almacén interno rollback',
  },
  {
    id: 11,
    name: 'Piking consolidado',
  },
  {
    id: 12,
    name: 'Rollback pinking consolidado',
  },
  {
    id: 13,
    name: 'Producto no encontrado en Picking',
  },
  {
    id: 14,
    name: 'Picking tienda',
  },
  {
    id: 15,
    name: 'Reetiquetado de producto',
  },
  {
    id: 16,
    name: 'Transferencia completa entre embalajes',
  },
  {
    id: 17,
    name: 'Transferencia selectiva entre embalajes',
  },
];