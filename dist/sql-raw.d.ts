import SQL = require("./sql");
declare function sqlRaw(callback: (args: any) => [string, any[]]): SQL;

export { sqlRaw };
