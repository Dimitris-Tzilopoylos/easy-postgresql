export = Relation;
declare class Relation {
  constructor({
    alias,
    from_table,
    to_table,
    from_column,
    to_column,
    type,
  }: {
    alias: string;
    from_table?: string;
    to_table: string;
    from_column: string;
    to_column: string;
    type: "object" | "array";
    schema?: string;
    where?: any;
  });
  alias: string;
  from_table?: string;
  to_table: string;
  from_column: string;
  to_column: string;
  type: "object" | "array";
  schema?: any;
  where?: any;
}
