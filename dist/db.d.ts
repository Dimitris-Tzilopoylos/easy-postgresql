export = DB;
declare class DB {
  static models: any;
  static modelFactory: any;
  static database: any;
  static enableLog: boolean;
  static scheduler: typeof Scheduler;
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
  static pool: any;
  static postgis: boolean;
  static client: any;
  static clientConnected: boolean;
  static brokerEvents: {};
  static notificationRegistered: boolean;
  static events: {
    [x: string]: {};
  };
  static asyncEvents: {
    [x: string]: {};
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
  static onSelect(table: any, cb: any): void;
  static onInsert(table: any, cb: any): void;
  static onUpdate(table: any, cb: any): void;
  static onDelete(table: any, cb: any): void;
  static onError(table: any, cb: any): void;
  static onSelectAsync(table: any, cb: any): void;
  static onInsertAsync(table: any, cb: any): void;
  static onUpdateAsync(table: any, cb: any): void;
  static onDeleteAsync(table: any, cb: any): void;
  static onErrorAsync(table: any, cb: any): void;
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
    table: any,
    namespace: any,
    data: any,
    instance: any
  ): any;
  static executeAsyncEvent(
    table: any,
    namespace: any,
    data: any,
    instance: any
  ): Promise<any>;
  static eventExists(table: any, namespace: any): boolean;
  static asyncEventExists(table: any, namespace: any): boolean;
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
  static loadApi(callback: any): void;
  static runJob({
    seconds,
    execPath,
    isPromise,
    log,
  }: {
    seconds?: number;
    execPath: any;
    isPromise?: boolean;
    log?: boolean;
  }): void;
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
  findOne({
    where,
    include,
    aggregate,
    select,
    orderBy,
    groupBy,
    distinct,
    extras,
  }?: {
    where?: any;
    include?: any;
    aggregate?: any;
    orderBy?: any;
    groupBy?: any;
    select?: any;
    distinct?: any;
    extras?: { [key: string]: (x: string) => string };
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
  splitRelationalAndModelColumnsInput(args: any, allowedEntries?: any[]): any;
  getModelColumnsCommaSeperatedString(
    alias: any,
    select?: any,
    extras?: { [key: string]: (x: string) => string }
  ): string;
  get columnsStrNoAlias(): string;
  getRelatedModelByAlias(alias: any): any;
}
import Scheduler = require("./scheduler");
