// Generated .d.ts approximation

export const PgTypes: {
  BIGINT: string;
  INT8: string;
  BIGSERIAL: string;
  SERIAL8: string;
  BIT: string;
  BIT_1: string;
  BIT_VARYING: string;
  VARBIT: string;
  BOOLEAN: string;
  BOOL: string;
  BOX: string;
  BYTEA: string;
  CHARACTER: string;
  CHAR: string;
  CHARACTER_VARYING: string;
  VARCHAR: string;
  CIDR: string;
  CIRCLE: string;
  DATE: string;
  DOUBLE_PRECISION: string;
  FLOAT8: string;
  INET: string;
  INTEGER: string;
  INT: string;
  INT4: string;
  INTERVAL: string;
  JSON: string;
  JSONB: string;
  LINE: string;
  LSEG: string;
  MACADDR: string;
  MACADDR8: string;
  MONEY: string;
  NUMERIC: string;
  DECIMAL: string;
  PATH: string;
  PG_LSN: string;
  PG_SNAPSHOT: string;
  POINT: string;
  POLYGON: string;
  REAL: string;
  FLOAT4: string;
  SMALLINT: string;
  INT2: string;
  SMALLSERIAL: string;
  SERIAL2: string;
  SERIAL: string;
  SERIAL4: string;
  TEXT: string;
  TIME: string;
  TIME_WITHOUT_TIME_ZONE: string;
  TIME_WITH_TIME_ZONE: string;
  TIMETZ: string;
  TIMESTAMP: string;
  TIMESTAMP_WITHOUT_TIME_ZONE: string;
  TIMESTAMP_WITH_TIME_ZONE: string;
  TIMESTAMPTZ: string;
  TSQUERY: string;
  TSVECTOR: string;
  TXID_SNAPSHOT: string;
  UUID: string;
  XML: string;
};

// declare const SupportLength: {
//   [key: string]: boolean;
// };

// declare const SupportPrecisionScale: {
//   [key: string]: boolean;
// };

// declare const NotSupportArray: {
//   [key: string]: boolean;
// };

// declare class PgTypeBuilder {
//   private typeDef;
//   private _length;
//   private _precision;
//   private _scale;
//   private _isArray;

//   constructor(typeDef: {
//     name: string;
//     supportsLength?: boolean;
//     supportsPrecision?: boolean;
//     supportsArray?: boolean;
//   });

//   length(n: number): this;
//   precision(p: number, s?: number | null): this;
//   array(): this;
//   buildTypeString(): string;
//   toString(): string;
// }

// declare class PGTypes {
//   types: {
//     [key: string]: () => PgTypeBuilder;
//   };

//   constructor();
//   private __createTypeBuilder;
//   extend(key: string, value: string): void;
// }

// declare const pgTypesInstance: PGTypes;
// export = pgTypesInstance;
// export = PgTypes;
