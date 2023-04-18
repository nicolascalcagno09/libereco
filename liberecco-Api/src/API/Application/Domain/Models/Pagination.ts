import * as _ from 'lodash';

export default class Pagination {
  private page: number;
  private limit: number;

  constructor(object?: Object) {
    _.assign(this, object);
  }

  getPage(): number {
    return this.page > 0 ? this.page : 1;
  }

  getLimit(): number {
    return this.limit > 0 ? this.limit : 999999;
  }
}