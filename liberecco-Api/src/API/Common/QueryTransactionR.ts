import { Connection, getConnection, QueryRunner } from 'typeorm';

export default class QueryTransaction {
  private queryRunner: QueryRunner;
  private connection: Connection;

  public constructor() {
    this.connection = getConnection();
  }

  private createQueryRunner() {
    return new Promise<any>(async (resolve, reject) => {
      this.queryRunner = this.connection.createQueryRunner();
      await this.queryRunner.connect();
      await this.queryRunner.startTransaction();

      resolve(this.queryRunner);
    });
  }

  public async getQueryRunner() {
    if (!this.queryRunner) {
      await this.createQueryRunner();
    }
    return this.queryRunner;
  }
}
