import { Pool } from "pg";
import Model from "./model";

export = DB;
declare class DB {
  static models: {
    [k: string]: {
      [z: string]: Model;
    };
  };
  static modelFactory: any;
  static database: any;
  static enableLog: boolean;
  static allowedOrderDirectionsKeys: {
    asc_nulls_first: string;
    asc_nulls_last: string;
    desc_nulls_first: string;
    desc_nulls_last: string;
    ASC: string;
    DESC: string;
    asc: string;
    desc: string;
  };
  static connectionConfig: {
    host: string;
    port: string;
    user: string;
    password: string;
    database: string;
    max: number;
    min: number;
    idleTimeoutMillis: number;
    connectionTimeoutMillis: number;
    statement_timeout: number;
    replicas?: any[];
  };
  static EventNameSpaces: {
    SELECT: string;
    UPDATE: string;
    INSERT: string;
    DELETE: string;
    ERROR: string;
  };
  static replicas: any[];
  static replicationIndex: number;
  static pool: Pool;
  static postgis: boolean;
  static client: any;
  static clientConnected: boolean;
  static brokerEvents: any;
  static notificationRegistered: boolean;
  static events: {
    [x: string]: any;
  };
  static asyncEvents: {
    [x: string]: any;
  };
  static actions: {
    [x: string]: any;
  };
  static hasReplicas(): any;
  static roundRobinReplicaPoolRetrieval(): any;
  static connectClient(): Promise<void>;
  static clientDisconnect(): Promise<void>;
  static register(model: any): void;
  static registerDatabase(db: any): void;
  static registerConnectionConfig(connectionConfig?: any): void;
  static getRelatedModel(relation: any): any;
  static getIsAggregate(alias: any): any;
  static getRelationNameWithoutAggregate(alias: any): any;
  static isObject(value: any): boolean;
  static isUndefined(value: any): boolean;
  static isNull(value: any): boolean;
  static isString(value: any): boolean;
  static isNullOrUndefined(value: any): boolean;
  static isNullOrUndefinedOrEmpty(value: any): boolean;
  static onSelect(
    schema: any,
    table: any,
    cb: (data: any, model: DB) => Promise<void> | void
  ): void;
  static onInsert(
    schema: any,
    table: any,
    cb: (data: any, model: DB) => Promise<void> | void
  ): void;
  static onUpdate(
    schema: any,
    table: any,
    cb: (data: any, model: DB) => Promise<void> | void
  ): void;
  static onDelete(
    schema: any,
    table: any,
    cb: (data: any, model: DB) => Promise<void> | void
  ): void;
  static onError(
    schema: any,
    table: any,
    cb: (error: any, model: DB) => Promise<void> | void
  ): void;
  static onSelectAsync(
    schema: any,
    table: any,
    cb: (data: any, model: DB) => Promise<void>
  ): void;
  static onInsertAsync(
    schema: any,
    table: any,
    cb: (data: any, model: DB) => Promise<void>
  ): void;
  static onUpdateAsync(
    schema: any,
    table: any,
    cb: (data: any, model: DB) => Promise<void>
  ): void;
  static onDeleteAsync(
    schema: any,
    table: any,
    cb: (data: any, model: DB) => Promise<void>
  ): void;
  static onErrorAsync(
    schema: any,
    table: any,
    cb: (error: any, model: DB) => Promise<void>
  ): void;
  static onSelectActionAsync(cb: (data: any, model: DB) => Promise<void>): void;
  static onInsertActionAsync(cb: (data: any, model: DB) => Promise<void>): void;
  static onUpdateActionAsync(cb: (data: any, model: DB) => Promise<void>): void;
  static onDeleteActionAsync(cb: (data: any, model: DB) => Promise<void>): void;
  static onErrorActionAsync(cb: (error: any, model: DB) => Promise<void>): void;
  static subscriber(
    event: any,
    cb: any
  ):
    | Promise<(() => Promise<any>) | (() => Promise<any>)>
    | (() => Promise<any>);
  static notify(event: any, data: any): Promise<void>;
  static unsubscribeEvent(event: any): void;
  static unsubscribeAllEvents(): void;
  static executeEvent(
    schema: any,
    table: any,
    namespace: any,
    data: any,
    instance: any
  ): any;
  static executeAsyncEvent(
    schema: any,
    table: any,
    namespace: any,
    data: any,
    instance: any
  ): Promise<any>;
  static executeAsynAction(
    namespace: any,
    data: any,
    instance: any
  ): Promise<any>;
  static eventExists(schema: any, table: any, namespace: any): boolean;
  static asyncEventExists(schema: any, table: any, namespace: any): boolean;
  static asyncActionExists(namespace: any): boolean;
  static paginator(
    page: any,
    view: any,
    total: any
  ): {
    total: any;
    view: any;
    page: any;
    skip: number;
    limit: number;
    per_page: any;
  };
  static enablePOSTGIS(value?: boolean): void;
  static getDriver(): any;
  constructor(table?: string, connection?: any, schema?: any);
  schema?: any;
  table?: any;
  relations?: any;
  columns?: any;
  isAggregate?: boolean;
  connection: any;
  connected: boolean;
  transaction: boolean;
  database: any;
  driver: any;
  connect(primary?: boolean): Promise<void>;
  disconnect(): void;
  startTransaction(): Promise<void>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
  withTransaction(cb: any): Promise<any>;
  selectQueryExec(sql: any, args?: any[]): Promise<any>;
  insertQueryExec(sql: any, args: any, returning?: boolean): Promise<any>;
  updateQueryExec(sql: any, args: any, returning?: boolean): Promise<any>;
  deleteQueryExec(sql: any, args: any, returning?: boolean): Promise<any>;
  raw(sql: any, args?: any[], primary?: boolean): Promise<any>;
  buildSelect({
    where,
    include,
    aggregate,
    orderBy,
    select,
    groupBy,
    distinct,
    limit,
    offset,
    extras,
    asText,
    forUpdate,
  }?: {
    where?: any;
    include?: any;
    aggregate?: any;
    orderBy?: any;
    groupBy?: any;
    select?: any;
    distinct?: any;
    limit?: any;
    offset?: any;
    extras?: { [key: string]: (x: string) => string };
    asText?: boolean;
    forUpdate?:
      | boolean
      | "for_update"
      | "for_no_key_update"
      | "for_share"
      | "for_key_share"
      | "nowait"
      | "skip_locked";
  }): [string, any[]];
  findOne({
    where,
    include,
    aggregate,
    select,
    orderBy,
    groupBy,
    distinct,
    extras,
    asText,
    forUpdate,
  }?: {
    where?: any;
    include?: any;
    aggregate?: any;
    orderBy?: any;
    groupBy?: any;
    select?: any;
    distinct?: any;
    extras?: { [key: string]: (x: string) => string };
    asText?: boolean;
    forUpdate?:
      | boolean
      | "for_update"
      | "for_no_key_update"
      | "for_share"
      | "for_key_share"
      | "nowait"
      | "skip_locked";
  }): Promise<any>;
  select({
    where,
    include,
    orderBy,
    select,
    distinct,
    limit,
    offset,
    groupBy,
    extras,
    asText,
    forUpdate,
  }?: {
    where?: any;
    include?: any;
    orderBy?: any;
    select?: any;
    groupBy?: any;
    distinct?: any;
    limit?: any;
    offset?: any;
    extras?: { [key: string]: (x: string) => string };
    asText?: boolean;
    forUpdate?:
      | boolean
      | "for_update"
      | "for_no_key_update"
      | "for_share"
      | "for_key_share"
      | "nowait"
      | "skip_locked";
  }): Promise<any>;
  selectOne({
    where,
    include,
    select,
    groupBy,
    orderBy,
    distinct,
    extras,
    asText,
    forUpdate,
  }?: {
    where?: any;
    include?: any;
    aggregate?: any;
    orderBy?: any;
    select?: any;
    groupBy?: any;
    distinct?: any;
    extras?: { [key: string]: (x: string) => string };
    asText?: boolean;
    forUpdate?:
      | boolean
      | "for_update"
      | "for_no_key_update"
      | "for_share"
      | "for_key_share"
      | "nowait"
      | "skip_locked";
  }): Promise<any>;
  find({
    where,
    include,
    aggregate,
    orderBy,
    select,
    groupBy,
    distinct,
    limit,
    offset,
    extras,
    asText,
    forUpdate,
  }?: {
    where?: any;
    include?: any;
    aggregate?: any;
    orderBy?: any;
    groupBy?: any;
    select?: any;
    distinct?: any;
    limit?: any;
    offset?: any;
    extras?: { [key: string]: (x: string) => string };
    asText?: boolean;
    forUpdate?:
      | boolean
      | "for_update"
      | "for_no_key_update"
      | "for_share"
      | "for_key_share"
      | "nowait"
      | "skip_locked";
  }): Promise<any>;
  findAll({
    where,
    include,
    aggregate,
    orderBy,
    select,
    groupBy,
    distinct,
    limit,
    offset,
    extras,
    asText,
    forUpdate,
  }?: {
    where?: any;
    include?: any;
    aggregate?: any;
    orderBy?: any;
    groupBy?: any;
    select?: any;
    distinct?: any;
    limit?: any;
    offset?: any;
    extras?: { [key: string]: (x: string) => string };
    asText?: boolean;
    forUpdate?:
      | boolean
      | "for_update"
      | "for_no_key_update"
      | "for_share"
      | "for_key_share"
      | "nowait"
      | "skip_locked";
  }): Promise<any>;
  insert(args: any): Promise<any>;
  createTX(args: any): Promise<any>;
  createManyTX(args: any): Promise<any>;
  create(args: any): Promise<any>;
  createMany(args: any): Promise<any[]>;
  update({
    update,
    where,
    returning,
  }: {
    update: any;
    where?: any;
    returning?: boolean;
  }): Promise<any>;
  delete({
    where,
    returning,
  }: {
    where?: any;
    returning?: boolean;
  }): Promise<any>;
  aggregate({
    where,
    groupBy,
    distinct,
    _count,
    _max,
    _min,
    _sum,
    _avg,
  }?: {
    where?: any;
    groupBy?: any;
    distinct?: any;
    _count?: any;
    _max?: any;
    _min?: any;
    _sum?: any;
    _avg?: any;
  }): Promise<any>;
  aggregateInternal({
    where,
    groupBy,
    distinct,
    _count,
    _max,
    _min,
    _sum,
    _avg,
    index,
    alias,
    withWhere,
  }?: {
    where: any;
    groupBy: any;
    distinct: any;
    _count: any;
    _max: any;
    _min: any;
    _sum: any;
    _avg: any;
    index?: number;
    alias: any;
    withWhere?: boolean;
  }): any[];
  buildCountAgg(count: any, distinct?: any, table?: any): string;
  buildAgg(aggConfig: any, key: any): string | any[];
  isGeospatialColumn(key?: any): boolean;
  getGeoJSONFunctionByColumnType(column: any): any;
  getGeospatialColumnValueForStatement(
    columnName?: any,
    data?: any,
    currentIndex?: any
  ): any;
  buildInsertQuery(
    args: any,
    onConflict: any,
    returning?: boolean
  ): (string | any[])[];
  makeDistinctOn(distinct: any, alias: any): string;
  makeWhereClause(
    model: any,
    where: any,
    index: any,
    alias: any,
    isFirstEntry?: boolean,
    startWithWhere?: boolean,
    binder?: string,
    depth?: number
  ): any;
  withSRIDFilter(column: any, value: any, index: any, alias: any): any;
  mapGISDistanceOperation(
    key: any,
    column: any,
    config: any,
    index: any,
    alias: any
  ): any;
  mapGISOperation(
    key: any,
    column: any,
    config: any,
    index: any,
    alias: any
  ): any;
  isGISComparison(config: any): any;
  isArrayComparison(config: any): boolean[] | (string | true)[];
  makeGroupBy(groupBy: any, alias: any): string;
  makeOrderBy(orderBy: any, alias?: string): string;
  makeLimit(limit: any, index: any): any[];
  makeOffset(offset: any, index: any): any[];
  getAggregationForSorting(orderBy: any, currentAlias: any): string;
  combineOrderBy(
    orderByColumnsString: any,
    orderByAggregationsString: any
  ): string;
  produceOrderByForAggregations(
    aggrConfig: any,
    prevAlias: any,
    relation: any
  ): string[];
  toOrderByByAggregationConfig({
    columnsMap,
    aggregationKey,
    aggrKeyConfig,
    schema,
    table,
    whereClause,
  }: {
    columnsMap: any;
    aggregationKey: any;
    aggrKeyConfig: any;
    schema: any;
    table: any;
    whereClause: any;
  }): string[];
  makeColumnAlias(col: any): any;
  makeDepthAlias(alias: any, depth: any): string;
  forUpdateResolve(
    forUpdate?:
      | boolean
      | "for_update"
      | "for_no_key_update"
      | "for_share"
      | "for_key_share"
      | "nowait"
      | "skip_locked"
  ): string;
  splitRelationalAndModelColumnsInput(args: any, allowedEntries?: any[]): any;
  getModelColumnsCommaSeperatedString(
    alias: any,
    select?: any,
    extras?: { [key: string]: (x: string) => string }
  ): string;
  makeRelationalWhereAliases(
    alias: string,
    referencedAlias: string,
    relation: any
  ): string;
  get columnsStrNoAlias(): string;
  get dbPool(): Pool;
  getRelatedModelByAlias(alias: any): any;
}
