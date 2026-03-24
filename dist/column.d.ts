export = Column;

declare class Column {
  constructor({
    name,
    type,
    nullable,
    length,
    defaultValue,
    min,
    max,
    alias,
    primary,
    unique,
    foreign,
    auto_increment,
    constraints,
    references,
    on_delete,
    on_update,
  }?: {
    defaultValue?: any;
    name: any;
    type: string;
    nullable?: boolean;
    length?: any;
    min?: any;
    max?: any;
    alias?: any;
    primary?: any;
    unique?: any;
    foreign?: any;
    auto_increment?: any;
    constraints?: any[];
    references?: {
      table: string;
      schema: string;
      referencedColumn: string;
      on_delete?:
        | "cascade"
        | "no action"
        | "restrict"
        | "set default"
        | "set null";
      on_update?:
        | "cascade"
        | "no action"
        | "restrict"
        | "set default"
        | "set null";
    };
  });
  columnConfig: {
    name: any;
    type: string;
    nullable?: boolean;
    length?: any;
    defaultValue?: any;
    min?: any;
    max?: any;
    alias?: any;
    primary?: any;
    unique?: any;
    foreign?: any;
    auto_increment?: any;
    constraints?: any[];
    references?: {
      table: string;
      schema: string;
      referencedColumn: string;
      on_delete?:
        | "cascade"
        | "no action"
        | "restrict"
        | "set default"
        | "set null";
      on_update?:
        | "cascade"
        | "no action"
        | "restrict"
        | "set default"
        | "set null";
    };
  };
  get column(): any;
  get type(): any;
  get alias(): any;
  get checks(): any[];
}
