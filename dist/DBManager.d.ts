export = DBManager;
declare class DBManager {
  static createSchema(
    schemaName: string,
    connection?: any,
    existsCheck?: boolean
  ): Promise<{
    up: string;
    down: string;
  }>;
  static dropSchema(
    schemaName: string,
    connection?: any,
    existsCheck?: boolean
  ): Promise<{
    up: string;
    down: string;
  }>;
  static dropTable(
    model: any,
    connection?: any,
    existsCheck?: boolean
  ): Promise<{
    up: string;
    down: string;
  }>;
  static createTable(
    model: any,
    connection?: any,
    existsCheck?: boolean
  ): Promise<{
    up: string;
    down: string;
  }>;
  static createPrimaryKey(
    model: any,
    name: string,
    columns: any[],
    connection?: any
  ): Promise<{
    up: string;
    down: string;
  }>;
  static dropPrimaryKey(
    model: any,
    name: string,
    columns: any[],
    connection?: any
  ): Promise<{
    up: string;
    down: string;
  }>;
  static createForeignKey(
    fromModel: any,
    toModel: any,
    name: string,
    fromColumns: any[],
    toColumns: any[],
    onUpdate?: "cascade" | "no action" | "restrict",
    onDelete?: "cascade" | "no action" | "restrict",
    connection?: any
  ): Promise<{
    up: string;
    down: string;
  }>;
  static dropForeignKey(
    fromModel: any,
    toModel: any,
    name: string,
    fromColumns: any[],
    toColumns: any[],
    onUpdate?: "cascade" | "no action" | "restrict",
    onDelete?: "cascade" | "no action" | "restrict",
    connection?: any
  ): Promise<{
    up: string;
    down: string;
  }>;
  static createUniqueConstraint(
    model: any,
    name: string,
    columns: any[],
    connection?: any
  ): Promise<{
    up: string;
    down: string;
  }>;
  static dropUniqueConstraint(
    model: any,
    name: string,
    columns: any[],
    connection?: any
  ): Promise<{
    up: string;
    down: string;
  }>;
  static createUniqueIndex(
    model: any,
    name: string,
    columns: any[],
    connection?: any
  ): Promise<{
    up: string;
    down: string;
  }>;
  static dropUniqueIndex(
    model: any,
    name: string,
    columns: any[],
    connection?: any
  ): Promise<{
    up: string;
    down: string;
  }>;
  static createIndex(
    model: any,
    name: string,
    columns: any[],
    type: string,
    connection?: any
  ): Promise<{
    up: string;
    down: string;
  }>;
  static dropIndex(
    model: any,
    name: string,
    columns: any[],
    type: string,
    connection?: any
  ): Promise<{
    up: string;
    down: string;
  }>;
  static addCheckConstraint(
    model: any,
    name: string,
    sql: string,
    connection?: any
  ): Promise<{
    up: string;
    down: string;
  }>;
  static dropCheckConstraint(
    model: any,
    name: string,
    sql: string,
    connection?: any
  ): Promise<{
    up: string;
    down: string;
  }>;
  static addColumn(
    model: any,
    column: Column,
    connection?: any
  ): Promise<{
    up: string;
    down: string;
  }>;
  static dropColumn(
    model: any,
    column: Column,
    connection?: any
  ): Promise<{
    up: string;
    down: string;
  }>;
  static renameColumn(
    model: any,
    column: Column,
    newName: string,
    connection?: any
  ): Promise<{
    up: string;
    down: string;
  }>;
  static setColumnDefaultValue(
    model: any,
    column: Column,
    defaultValue: any,
    connection?: any
  ): Promise<{
    up: string;
    down: string;
  }>;
  static dropColumnDefaultValue(
    model: any,
    column: Column,
    connection?: any
  ): Promise<{
    up: string;
    down: string;
  }>;
  static setColumnNotNullable(
    model: any,
    column: Column,
    connection?: any
  ): Promise<{
    up: string;
    down: string;
  }>;
  static setColumnNullable(
    model: any,
    column: Column,
    connection?: any
  ): Promise<{
    up: string;
    down: string;
  }>;
  static toModelSchemaTableAlias(model: any): string;
  static formatConstraintOrIndexColumns(columns: any[]): any[];
  static toForeignKeyAction(type: any, value?: any): string;
  static modelColumnstoSql(model: any): string;
  static modelColumnToSQL(column: any): string;
  static modelColumnConstraints(column: any): string;
  static createIndexes(model: any, connection?: any): void;
  static exec(sql: any, args?: any[], connection?: any): Promise<void>;
  static runBash(depth?: number): Promise<void>;
}
import Column = require("./column");
