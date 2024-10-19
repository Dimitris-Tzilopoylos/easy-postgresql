export = Postgres;

declare class Postgres {
  connectionConfig: {
    host?: string;
    port?: string | number;
    user?: string;
    password?: string;
    schema?: string;
    database?: string;
    min?: number;
    max?: number;
  };

  relations?:
    | Array<(typeof Relation)[]>
    | Array<{
        from_table: string;
        from_column: string;
        to_table: string;
        to_column: string;
        type: "object" | "array";
        alias: string;
        schema?: string;
      }>;

  options?: {
    createFiles?: boolean;
    skipIfDirectoryExists?: boolean;
    dirname: string;
    useESM: boolean;
    extension: "js" | "mjs" | "ts";
  };

  constructor({
    connectionConfig,
    relations,
    options,
  }: {
    connectionConfig: {
      host?: string;
      port?: string | number;
      user?: string;
      password?: string;
      schema?: string;
      database?: string;
      min?: number;
      max?: number;
    };
    relations?:
      | Array<(typeof Relation)[]>
      | Array<{
          from_table: string;
          from_column: string;
          to_table: string;
          to_column: string;
          type: "object" | "array";
          alias: string;
          schema?: string;
        }>;
    options?: {
      createFiles?: boolean;
      skipIfDirectoryExists?: boolean;
      dirname: string;
      useESM: boolean;
      extension: "js" | "mjs" | "ts";
    };
  });

  init(): Promise<void>;
  query(sql: string, args?: any[], connection?: any): Promise<any>;
  model(
    table: string,
    connection?: any,
    schema?: string
  ): {
    find: Model["find"];
    findOne: Model["findOne"];
    create: Model["create"];
    createMany: Model["createMany"];
    createTX: Model["createTX"];
    createManyTX: Model["createManyTX"];
    update: Model["update"];
    delete: Model["delete"];
    aggregate: Model["aggregate"];
    withTransaction: Model["withTransaction"];
    select: Model["select"];
    selectOne: Model["selectOne"];
    instance: typeof Model;
  };
  enablePOSTGIS(value: boolean): void;
  pool(): any;
  withConnection(cb: (conn: any) => Promise<any | void>): Promise<any | void>;
}

import Relation = require("./relation");
import Model = require("./model");
