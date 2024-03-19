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
  }?: {
    defaultValue?: any;
    name: any;
    type: any;
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
    type: any;
    nullable?: boolean;
    length?: any;
    defaultValue?: any;
    min?: any;
    max: ?any;
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
