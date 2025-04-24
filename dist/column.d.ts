export = Column;

type SQLTypeMap = {
  uuid: string;
  text: string;
  number: number;
  boolean: boolean;
  date: Date;
};

declare class Column<T extends keyof SQLTypeMap> {
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
  }?: {
    defaultValue?: any;
    name: any;
    type: T;
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
  });
  columnConfig: {
    name: any;
    type: T;
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
  };
  get column(): any;
  get type(): any;
  get alias(): any;
  get checks(): any[];
}
