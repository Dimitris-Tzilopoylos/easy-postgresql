class Column {
  constructor(
    {
      name,
      type,
      nullable = true,
      length,
      defaultValue,
      min,
      max,
      alias,
      primary,
      unique,
      foreign,
      auto_increment,
      constraints = [],
    } = { defaultValue }
  ) {
    this.columnConfig = {
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
    };
  }

  get column() {
    if (this.columnConfig.alias) {
      return `${this.columnConfig.alias}.${this.columnConfig.name}`;
    }
    return this.columnConfig.name;
  }

  get type() {
    return this.columnConfig.type;
  }

  get alias() {
    return this.columnConfig.alias;
  }

  get checks() {
    return Array.isArray(this.columnConfig.constraints)
      ? this.columnConfig.constraints
      : !!this.columnConfig.constraints
      ? [this.columnConfig.constraints]
      : [];
  }
}

module.exports = Column;
