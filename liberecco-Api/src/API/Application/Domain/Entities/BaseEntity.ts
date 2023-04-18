import {
  Column,
  BeforeUpdate,
  BaseEntity as TypeORMBaseEntity,
} from 'typeorm';
import * as _ from 'lodash';

/**
 *  @swagger
 *
 *  definitions:
 *    Pagination:
 *      type: object
 *      properties:
 *        page:
 *          type: integer
 *        limit:
 *          type: integer
 */

/**
 *  @swagger
 *
 *  definitions:
 *    Orderby:
 *      type: object
 *      properties:
 *        type:
 *          type: number
 *        order:
 *          type: string
 *          enum: [asc, desc]
 */

/**
 *  @swagger
 *
 *  definitions:
 *    ResponsePagination:
 *      type: object
 *      properties:
 *        page:
 *          type: integer
 *        limit:
 *          type: integer
 *        totalResults:
 *          type: integer
 */

/**
 *  @swagger
 *
 *  definitions:
 *    DataResponseException:
 *      type: object
 *      properties:
 *        code:
 *          type: integer
 *        errors:
 *          type: string
 *        message:
 *          type: string
 */

/**
 *  @swagger
 *
 *  definitions:
 *    DataResponseExceptionBadRequest:
 *      type: object
 *      properties:
 *        code:
 *          type: integer
 *        errors:
 *          type: object
 *        message:
 *          type: string
 */

/**
 *  @swagger
 *
 *  definitions:
 *    DataResponseUpdate:
 *      type: object
 *      properties:
 *        code:
 *          type: integer
 *        data:
 *          type: object
 *        message:
 *          type: string
 */

/**
 *  @swagger
 *
 *  definitions:
 *    ObjectUpdateMultiple:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *        code:
 *          type: integer
 *        message:
 *          type: string
 */

/**
 *  @swagger
 *
 *  definitions:
 *    DataResponseUpdateMultiple:
 *      type: object
 *      properties:
 *        code:
 *          type: integer
 *        data:
 *          type: array
 *          items:
 *            $ref: '#/definitions/ObjectUpdateMultiple'
 *        message:
 *          type: string
 */

/**
 *  @swagger
 *
 *  definitions:
 *    DataResponseDelete:
 *      type: object
 *      properties:
 *        code:
 *          type: integer
 *        data:
 *          type: object
 *        message:
 *          type: string
 */

export default class BaseEntity extends TypeORMBaseEntity{
  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  constructor(object?: Object){
    super();
    _.assign(this, object);
  }

  @BeforeUpdate()
  setUpdatedAt(date? : Date) {
    let setDate = date;
    if (typeof date === 'undefined') {
      setDate = new Date();
    }
    this.updatedAt = setDate;
  }

  toJSON(){
    const result = {};
    const object = this;
    try{
      Object.keys(object).forEach(function(k){
        if (typeof object[k] !== 'function'){
          const matches = k.match(/^__(\w+)__$/);
          // __has__[RELATION]__ is undefined when relation is loaded via query
          // if (matches = k.match(/^__(has_)?(\w+)__$/) && object[k] ){
          if (matches && object[k] ){
            // console.log("Matches", matches, k, object);
            result[matches[1]] = object[matches[0]];
          }else if ( !k.match(/^__\w+?$/)){
            result[k] = object[k];
          }
        }
      });
    }catch(e){console.error(e)}

    return result;
  }
}
