export = DBManager;

declare enum PgPrivilege {
  SELECT = "SELECT",
  INSERT = "INSERT",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
  TRUNCATE = "TRUNCATE",
  REFERENCES = "REFERENCES",
  TRIGGER = "TRIGGER",
}
declare class DBManager {
  static alterSchemaOwner(
    schemaName: string,
    owner: string,
    connection?: any
  ): Promise<{
    up: string;
    down: string;
  }>;
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
  static alterTableOwner(
    model: any,
    owner: string,
    connection?: any
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
  static enableRLS(
    model: any,
    connection?: any
  ): Promise<{
    up: string;
    down: string;
  }>;
  static disableRLS(
    model: any,
    connection?: any
  ): Promise<{
    up: string;
    down: string;
  }>;
  static enableSchemaRLS(
    schema: string,
    connection?: any
  ): Promise<{
    up: string;
    down: string;
  }>;
  static disableSchemaRLS(
    schema: string,
    connection?: any
  ): Promise<{
    up: string;
    down: string;
  }>;
  static selectPolicy(
    name: string,
    model: any,
    options?: {
      roles?: string[];
      using?: string;
    },
    connection?: any
  ): {
    create: () => Promise<{ up: string; down: string }>;
    drop: () => Promise<{ up: string; down: string }>;
  };
  static insertPolicy(
    name: string,
    model: any,
    options?: {
      roles?: string[];
      using?: string;
      check?: string;
      kind?: "restrictive" | "permissive";
    },
    connection?: any
  ): {
    create: () => Promise<{ up: string; down: string }>;
    drop: () => Promise<{ up: string; down: string }>;
  };
  static updatePolicy(
    name: string,
    model: any,
    options?: {
      roles?: string[];
      using?: string;
      check?: string;
      kind?: "restrictive" | "permissive";
    },
    connection?: any
  ): {
    create: () => Promise<{ up: string; down: string }>;
    drop: () => Promise<{ up: string; down: string }>;
  };
  static deletePolicy(
    name: string,
    model: any,
    options?: {
      roles?: string[];
      using?: string;
      check?: string;
      kind?: "restrictive" | "permissive";
    },
    connection?: any
  ): {
    create: () => Promise<{ up: string; down: string }>;
    drop: () => Promise<{ up: string; down: string }>;
  };
  static allPolicy(
    name: string,
    model: any,
    options?: {
      roles?: string[];
      using?: string;
      check?: string;
      kind?: "restrictive" | "permissive";
    },
    connection?: any
  ): {
    create: () => Promise<{ up: string; down: string }>;
    drop: () => Promise<{ up: string; down: string }>;
  };
  static createRole(
    roleName: string,
    options?: {
      login?: boolean;
      noLogin?: boolean;
      password?: string;
      superuser?: boolean;
      noSuperuser?: boolean;
      createdb?: boolean;
      noCreatedb?: boolean;
      createrole?: boolean;
      noCreaterole?: boolean;
      inherit?: boolean;
      replication?: boolean;
      bypassrls?: boolean;
      connectionLimit?: number;
      validUntil?: string; // ISO 8601 or PostgreSQL timestamp string
      inRole?: string[];
      role?: string[];
      admin?: string[];
    },
    connection?: any // Replace with your pool/client type, e.g., `PoolClient`
  ): Promise<{ up: string; down: string }>;
  static grantRole(
    toRole: string,
    fromRole: string,
    connection?: any
  ): Promise<{ up: string; down: string }>;

  static revokeRole(
    toRole: string,
    fromRole: string,
    connection?: any
  ): Promise<{ up: string; down: string }>;

  static grantPrivileges(
    role: string,
    privileges: PgPrivilege[],
    model: any,
    connection?: any
  ): Promise<{ up: string; down: string }>;

  static revokePrivileges(
    role: string,
    privileges: PgPrivilege[],
    model: any,
    connection?: any
  ): Promise<{ up: string; down: string }>;

  static alterRole(
    roleName: string,
    options?: {
      password?: string;
      superuser?: boolean;
      login?: boolean;
      inherit?: boolean;
    },
    connection?: any
  ): Promise<{ up: string; down: string }>;
  static createSequence(
    sequenceName: string,
    options?: {
      increment?: number;
      minValue?: number | null;
      maxValue?: number | null;
      start?: number;
      cache?: number;
      cycle?: boolean;
      schema?: string;
    },
    connection?: any
  ): Promise<{ up: string; down: string }>;

  static dropSequence(
    sequenceName: string,
    schema?: string,
    connection?: any
  ): Promise<{ up: string; down: string }>;
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
