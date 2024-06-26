export = Model;
declare class Model extends DB {
  constructor(table: any, connection?: any, schema?: any);
  schema?: any;
  table: any;
  relations: any;
  columns: any;
  isAggregate: boolean;
  getModelColumnsCommaSeperatedString(
    alias: any,
    select?: any,
    extras?: { [key: string]: (x: string) => string }
  ): string;
  get columnsStrNoAlias(): string;
}
import DB = require("./db");
import Validation = require("./validation");
