export = Model;
declare class Model extends DB {
  constructor(table: any, connection?: any);
  table: any;
  relations: any;
  columns: any;
  isAggregate: boolean;
  getModelColumnsCommaSeperatedString(alias: any, select?: any): string;
  get columnsStrNoAlias(): string;
}
import DB = require("./db");
import Validation = require("./validation");
