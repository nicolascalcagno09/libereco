export enum OrderbyTypes {
  ASC = 'ASC',
  DESC = 'DESC',
}

/**
 *  @swagger
 *
 *  definitions:
 *    OrderByTypes:
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
 *    DataResponseOrderByTypes:
 *      type: object
 *      properties:
 *        data:
 *          type: array
 *          items:
 *            $ref: '#/definitions/OrderByTypes'
 *        message:
 *          type: string
 *        code:
 *          type: integer
 */

export const orderbyTypes = [
  {
    id: OrderbyTypes.ASC,
    name: 'ASC',
  },
  {
    id: OrderbyTypes.DESC,
    name: 'DESC',
  },
];

export const orderbyTypesValid = [
  OrderbyTypes.ASC,
  OrderbyTypes.DESC,
  OrderbyTypes.ASC.toLowerCase(),
  OrderbyTypes.DESC.toLowerCase(),
];
