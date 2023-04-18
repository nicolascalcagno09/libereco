import * as _ from 'lodash';
import { OrderbyTypes } from '../Enums/OrderbyTypes';

export default class Orderby {
  private type: number;
  private sort: string = 'id';
  private order: string;

  constructor(object?: Object) {
    _.assign(this, object);
  }
  setType(type: number){
    this.type = type;
  }

  getType(): number {
    return this.type;
  }

  setOrder(order: string){
    this.order = order;
  }

  getOrder(): string {
    return this.order ? this.order : 'asc';
  }

  getOrderForQuery(): 'ASC' | 'DESC' {
    let orderForQuery : OrderbyTypes = OrderbyTypes[this.getOrder().toUpperCase()];
    return orderForQuery;
  }

  getSort(): string {
    return this.sort ? this.sort : 'id';
  }

  setSort(value: string) {
    this.sort = value;
  }
}