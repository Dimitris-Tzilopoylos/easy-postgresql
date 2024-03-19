export = RawSQL;
declare class RawSQL {
    constructor(sql: any, args?: any[]);
    sql: any;
    args: any[];
    __replace_alias(alias: any): any;
    __getFormattedSQL(index: number, alias: any): any[];
}
