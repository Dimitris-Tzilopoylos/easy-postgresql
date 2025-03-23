export = Model;
declare class Model extends DB {
  constructor(table: any, connection?: any, schema?: any);
  schema?: string;
  table: string;
  relations: Record<string, Relation>;
  columns: Record<string, Column>;
  context: Record<string, any>;
  isAggregate: boolean;
  getModelColumnsCommaSeperatedString(
    alias: any,
    select?: any,
    extras?: { [key: string]: (x: string) => string }
  ): string;
  _mergeRelationalWhere(where?: any, otherWhere?: any): any;
  setContextValue(key: any, value: any): void;
  getContextValue(key: any): any;
  deleteContextValue(key: any): any;
  clearContext(): void;
  get columnsStrNoAlias(): string;
}
import Column from "./column";
import DB = require("./db");
import Relation from "./relation";
import Validation = require("./validation");
