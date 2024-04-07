export = SQL;
declare class SQL {
  constructor(cb: (args?: any) => [string, any[]] | string);
  sql: any;

  __getSQL(args: any): any[];
  __getFormattedSQL(sql: any, args: any, index: any): any[];
}
