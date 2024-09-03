export class Builder {
    static __mergeSQLPath(delimiter?: string): (...args: any[]) => string;
    static isBuilderColumn(val: any): any;
    static isConflictingColumn(val: any): any;
    static isUpdateValueLiteral(val: any): any;
    static resolveColumnAndValues(...args: any[]): any;
    constructor(client: any);
    args: any[];
    __subselectContexts: any[];
    client: any;
    with(sql: any): {
        as: (alias: any) => {
            definition: () => any[];
            raw: (sql: any, ...args: any[]) => string;
            with: (sql: any) => {
                as: any;
            };
            select: any;
            delete: any;
            update: any;
            insert: any;
        };
    };
    __as(previousSQL: any, isSequential: boolean, newSQL: any): (alias: any) => {
        definition: () => any[];
        raw: (sql: any, ...args: any[]) => string;
        with: (sql: any) => {
            as: any;
        };
        select: any;
        delete: any;
        update: any;
        insert: any;
    };
    __nestedWith(previousSQL: any): (sql: any) => {
        as: (alias: any) => {
            definition: () => any[];
            raw: (sql: any, ...args: any[]) => string;
            with: any;
            select: any;
            delete: any;
            update: any;
            insert: any;
        };
    };
    select(columns: any): {
        from: (table: any, alias: any, schema: any) => {
            execute: () => Promise<any>;
            leftJoin: (table: any, column: any, alias: any, schema: any) => {
                on: (table: any, column: any, alias: any, schema: any) => {
                    execute: () => Promise<any>;
                    leftJoin: any;
                    leftOuterJoin: any;
                    innerJoin: any;
                    rightJoin: any;
                    rightOuterJoin: any;
                    groupBy: (columns: any) => {
                        execute: () => Promise<any>;
                        having: (...conditions: any[]) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                            orderBy: (...columns: any[]) => {
                                execute: () => Promise<any>;
                                raw: (sql: any, ...args: any[]) => string;
                            } | {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            limit: (limit: any) => {
                                execute: () => Promise<any>;
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            literal: (sql: any, args?: any[]) => any;
                        };
                        limit: (limit: any) => {
                            execute: () => Promise<any>;
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        orderBy: (...columns: any[]) => {
                            execute: () => Promise<any>;
                            raw: (sql: any, ...args: any[]) => string;
                        } | {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        literal: (sql: any, args?: any[]) => any;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    limit: (limit: any) => {
                        execute: () => Promise<any>;
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    offset: (offset: any) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    where: (...config: any[]) => {
                        groupBy: (columns: any) => {
                            execute: () => Promise<any>;
                            having: (...conditions: any[]) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                                orderBy: (...columns: any[]) => {
                                    execute: () => Promise<any>;
                                    raw: (sql: any, ...args: any[]) => string;
                                } | {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                limit: (limit: any) => {
                                    execute: () => Promise<any>;
                                    offset: (offset: any) => {
                                        execute: () => Promise<any>;
                                        definition: () => any[];
                                        literal: (sql: any, args?: any[]) => any;
                                        raw: (sql: any, ...args: any[]) => string;
                                    };
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                literal: (sql: any, args?: any[]) => any;
                            };
                            limit: (limit: any) => {
                                execute: () => Promise<any>;
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            orderBy: (...columns: any[]) => {
                                execute: () => Promise<any>;
                                raw: (sql: any, ...args: any[]) => string;
                            } | {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            literal: (sql: any, args?: any[]) => any;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        limit: (limit: any) => {
                            execute: () => Promise<any>;
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        orderBy: (...columns: any[]) => {
                            execute: () => Promise<any>;
                            raw: (sql: any, ...args: any[]) => string;
                        } | {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        raw: (sql: any, ...args: any[]) => string;
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                    };
                    orderBy: (...columns: any[]) => {
                        execute: () => Promise<any>;
                        raw: (sql: any, ...args: any[]) => string;
                    } | {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                    definition: () => any[];
                };
            };
            leftOuterJoin: (table: any, column: any, alias: any, schema: any) => {
                on: (table: any, column: any, alias: any, schema: any) => {
                    execute: () => Promise<any>;
                    leftJoin: any;
                    leftOuterJoin: any;
                    innerJoin: any;
                    rightJoin: any;
                    rightOuterJoin: any;
                    groupBy: (columns: any) => {
                        execute: () => Promise<any>;
                        having: (...conditions: any[]) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                            orderBy: (...columns: any[]) => {
                                execute: () => Promise<any>;
                                raw: (sql: any, ...args: any[]) => string;
                            } | {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            limit: (limit: any) => {
                                execute: () => Promise<any>;
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            literal: (sql: any, args?: any[]) => any;
                        };
                        limit: (limit: any) => {
                            execute: () => Promise<any>;
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        orderBy: (...columns: any[]) => {
                            execute: () => Promise<any>;
                            raw: (sql: any, ...args: any[]) => string;
                        } | {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        literal: (sql: any, args?: any[]) => any;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    limit: (limit: any) => {
                        execute: () => Promise<any>;
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    offset: (offset: any) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    where: (...config: any[]) => {
                        groupBy: (columns: any) => {
                            execute: () => Promise<any>;
                            having: (...conditions: any[]) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                                orderBy: (...columns: any[]) => {
                                    execute: () => Promise<any>;
                                    raw: (sql: any, ...args: any[]) => string;
                                } | {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                limit: (limit: any) => {
                                    execute: () => Promise<any>;
                                    offset: (offset: any) => {
                                        execute: () => Promise<any>;
                                        definition: () => any[];
                                        literal: (sql: any, args?: any[]) => any;
                                        raw: (sql: any, ...args: any[]) => string;
                                    };
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                literal: (sql: any, args?: any[]) => any;
                            };
                            limit: (limit: any) => {
                                execute: () => Promise<any>;
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            orderBy: (...columns: any[]) => {
                                execute: () => Promise<any>;
                                raw: (sql: any, ...args: any[]) => string;
                            } | {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            literal: (sql: any, args?: any[]) => any;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        limit: (limit: any) => {
                            execute: () => Promise<any>;
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        orderBy: (...columns: any[]) => {
                            execute: () => Promise<any>;
                            raw: (sql: any, ...args: any[]) => string;
                        } | {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        raw: (sql: any, ...args: any[]) => string;
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                    };
                    orderBy: (...columns: any[]) => {
                        execute: () => Promise<any>;
                        raw: (sql: any, ...args: any[]) => string;
                    } | {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                    definition: () => any[];
                };
            };
            innerJoin: (table: any, column: any, alias: any, schema: any) => {
                on: (table: any, column: any, alias: any, schema: any) => {
                    execute: () => Promise<any>;
                    leftJoin: any;
                    leftOuterJoin: any;
                    innerJoin: any;
                    rightJoin: any;
                    rightOuterJoin: any;
                    groupBy: (columns: any) => {
                        execute: () => Promise<any>;
                        having: (...conditions: any[]) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                            orderBy: (...columns: any[]) => {
                                execute: () => Promise<any>;
                                raw: (sql: any, ...args: any[]) => string;
                            } | {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            limit: (limit: any) => {
                                execute: () => Promise<any>;
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            literal: (sql: any, args?: any[]) => any;
                        };
                        limit: (limit: any) => {
                            execute: () => Promise<any>;
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        orderBy: (...columns: any[]) => {
                            execute: () => Promise<any>;
                            raw: (sql: any, ...args: any[]) => string;
                        } | {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        literal: (sql: any, args?: any[]) => any;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    limit: (limit: any) => {
                        execute: () => Promise<any>;
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    offset: (offset: any) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    where: (...config: any[]) => {
                        groupBy: (columns: any) => {
                            execute: () => Promise<any>;
                            having: (...conditions: any[]) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                                orderBy: (...columns: any[]) => {
                                    execute: () => Promise<any>;
                                    raw: (sql: any, ...args: any[]) => string;
                                } | {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                limit: (limit: any) => {
                                    execute: () => Promise<any>;
                                    offset: (offset: any) => {
                                        execute: () => Promise<any>;
                                        definition: () => any[];
                                        literal: (sql: any, args?: any[]) => any;
                                        raw: (sql: any, ...args: any[]) => string;
                                    };
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                literal: (sql: any, args?: any[]) => any;
                            };
                            limit: (limit: any) => {
                                execute: () => Promise<any>;
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            orderBy: (...columns: any[]) => {
                                execute: () => Promise<any>;
                                raw: (sql: any, ...args: any[]) => string;
                            } | {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            literal: (sql: any, args?: any[]) => any;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        limit: (limit: any) => {
                            execute: () => Promise<any>;
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        orderBy: (...columns: any[]) => {
                            execute: () => Promise<any>;
                            raw: (sql: any, ...args: any[]) => string;
                        } | {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        raw: (sql: any, ...args: any[]) => string;
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                    };
                    orderBy: (...columns: any[]) => {
                        execute: () => Promise<any>;
                        raw: (sql: any, ...args: any[]) => string;
                    } | {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                    definition: () => any[];
                };
            };
            rightJoin: (table: any, column: any, alias: any, schema: any) => {
                on: (table: any, column: any, alias: any, schema: any) => {
                    execute: () => Promise<any>;
                    leftJoin: any;
                    leftOuterJoin: any;
                    innerJoin: any;
                    rightJoin: any;
                    rightOuterJoin: any;
                    groupBy: (columns: any) => {
                        execute: () => Promise<any>;
                        having: (...conditions: any[]) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                            orderBy: (...columns: any[]) => {
                                execute: () => Promise<any>;
                                raw: (sql: any, ...args: any[]) => string;
                            } | {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            limit: (limit: any) => {
                                execute: () => Promise<any>;
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            literal: (sql: any, args?: any[]) => any;
                        };
                        limit: (limit: any) => {
                            execute: () => Promise<any>;
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        orderBy: (...columns: any[]) => {
                            execute: () => Promise<any>;
                            raw: (sql: any, ...args: any[]) => string;
                        } | {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        literal: (sql: any, args?: any[]) => any;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    limit: (limit: any) => {
                        execute: () => Promise<any>;
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    offset: (offset: any) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    where: (...config: any[]) => {
                        groupBy: (columns: any) => {
                            execute: () => Promise<any>;
                            having: (...conditions: any[]) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                                orderBy: (...columns: any[]) => {
                                    execute: () => Promise<any>;
                                    raw: (sql: any, ...args: any[]) => string;
                                } | {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                limit: (limit: any) => {
                                    execute: () => Promise<any>;
                                    offset: (offset: any) => {
                                        execute: () => Promise<any>;
                                        definition: () => any[];
                                        literal: (sql: any, args?: any[]) => any;
                                        raw: (sql: any, ...args: any[]) => string;
                                    };
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                literal: (sql: any, args?: any[]) => any;
                            };
                            limit: (limit: any) => {
                                execute: () => Promise<any>;
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            orderBy: (...columns: any[]) => {
                                execute: () => Promise<any>;
                                raw: (sql: any, ...args: any[]) => string;
                            } | {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            literal: (sql: any, args?: any[]) => any;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        limit: (limit: any) => {
                            execute: () => Promise<any>;
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        orderBy: (...columns: any[]) => {
                            execute: () => Promise<any>;
                            raw: (sql: any, ...args: any[]) => string;
                        } | {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        raw: (sql: any, ...args: any[]) => string;
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                    };
                    orderBy: (...columns: any[]) => {
                        execute: () => Promise<any>;
                        raw: (sql: any, ...args: any[]) => string;
                    } | {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                    definition: () => any[];
                };
            };
            rightOuterJoin: (table: any, column: any, alias: any, schema: any) => {
                on: (table: any, column: any, alias: any, schema: any) => {
                    execute: () => Promise<any>;
                    leftJoin: any;
                    leftOuterJoin: any;
                    innerJoin: any;
                    rightJoin: any;
                    rightOuterJoin: any;
                    groupBy: (columns: any) => {
                        execute: () => Promise<any>;
                        having: (...conditions: any[]) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                            orderBy: (...columns: any[]) => {
                                execute: () => Promise<any>;
                                raw: (sql: any, ...args: any[]) => string;
                            } | {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            limit: (limit: any) => {
                                execute: () => Promise<any>;
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            literal: (sql: any, args?: any[]) => any;
                        };
                        limit: (limit: any) => {
                            execute: () => Promise<any>;
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        orderBy: (...columns: any[]) => {
                            execute: () => Promise<any>;
                            raw: (sql: any, ...args: any[]) => string;
                        } | {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        literal: (sql: any, args?: any[]) => any;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    limit: (limit: any) => {
                        execute: () => Promise<any>;
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    offset: (offset: any) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    where: (...config: any[]) => {
                        groupBy: (columns: any) => {
                            execute: () => Promise<any>;
                            having: (...conditions: any[]) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                                orderBy: (...columns: any[]) => {
                                    execute: () => Promise<any>;
                                    raw: (sql: any, ...args: any[]) => string;
                                } | {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                limit: (limit: any) => {
                                    execute: () => Promise<any>;
                                    offset: (offset: any) => {
                                        execute: () => Promise<any>;
                                        definition: () => any[];
                                        literal: (sql: any, args?: any[]) => any;
                                        raw: (sql: any, ...args: any[]) => string;
                                    };
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                literal: (sql: any, args?: any[]) => any;
                            };
                            limit: (limit: any) => {
                                execute: () => Promise<any>;
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            orderBy: (...columns: any[]) => {
                                execute: () => Promise<any>;
                                raw: (sql: any, ...args: any[]) => string;
                            } | {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            literal: (sql: any, args?: any[]) => any;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        limit: (limit: any) => {
                            execute: () => Promise<any>;
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        orderBy: (...columns: any[]) => {
                            execute: () => Promise<any>;
                            raw: (sql: any, ...args: any[]) => string;
                        } | {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        raw: (sql: any, ...args: any[]) => string;
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                    };
                    orderBy: (...columns: any[]) => {
                        execute: () => Promise<any>;
                        raw: (sql: any, ...args: any[]) => string;
                    } | {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                    definition: () => any[];
                };
            };
            groupBy: (columns: any) => {
                execute: () => Promise<any>;
                having: (...conditions: any[]) => {
                    execute: () => Promise<any>;
                    definition: () => any[];
                    raw: (sql: any, ...args: any[]) => string;
                    orderBy: (...columns: any[]) => {
                        execute: () => Promise<any>;
                        raw: (sql: any, ...args: any[]) => string;
                    } | {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    limit: (limit: any) => {
                        execute: () => Promise<any>;
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    offset: (offset: any) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    literal: (sql: any, args?: any[]) => any;
                };
                limit: (limit: any) => {
                    execute: () => Promise<any>;
                    offset: (offset: any) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    definition: () => any[];
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                };
                offset: (offset: any) => {
                    execute: () => Promise<any>;
                    definition: () => any[];
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                };
                orderBy: (...columns: any[]) => {
                    execute: () => Promise<any>;
                    raw: (sql: any, ...args: any[]) => string;
                } | {
                    execute: () => Promise<any>;
                    definition: () => any[];
                    raw: (sql: any, ...args: any[]) => string;
                };
                literal: (sql: any, args?: any[]) => any;
                definition: () => any[];
                raw: (sql: any, ...args: any[]) => string;
            };
            limit: (limit: any) => {
                execute: () => Promise<any>;
                offset: (offset: any) => {
                    execute: () => Promise<any>;
                    definition: () => any[];
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                };
                definition: () => any[];
                literal: (sql: any, args?: any[]) => any;
                raw: (sql: any, ...args: any[]) => string;
            };
            offset: (offset: any) => {
                execute: () => Promise<any>;
                definition: () => any[];
                literal: (sql: any, args?: any[]) => any;
                raw: (sql: any, ...args: any[]) => string;
            };
            where: (...config: any[]) => {
                groupBy: (columns: any) => {
                    execute: () => Promise<any>;
                    having: (...conditions: any[]) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                        orderBy: (...columns: any[]) => {
                            execute: () => Promise<any>;
                            raw: (sql: any, ...args: any[]) => string;
                        } | {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        limit: (limit: any) => {
                            execute: () => Promise<any>;
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        literal: (sql: any, args?: any[]) => any;
                    };
                    limit: (limit: any) => {
                        execute: () => Promise<any>;
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    offset: (offset: any) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    orderBy: (...columns: any[]) => {
                        execute: () => Promise<any>;
                        raw: (sql: any, ...args: any[]) => string;
                    } | {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    literal: (sql: any, args?: any[]) => any;
                    definition: () => any[];
                    raw: (sql: any, ...args: any[]) => string;
                };
                limit: (limit: any) => {
                    execute: () => Promise<any>;
                    offset: (offset: any) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    definition: () => any[];
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                };
                offset: (offset: any) => {
                    execute: () => Promise<any>;
                    definition: () => any[];
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                };
                orderBy: (...columns: any[]) => {
                    execute: () => Promise<any>;
                    raw: (sql: any, ...args: any[]) => string;
                } | {
                    execute: () => Promise<any>;
                    definition: () => any[];
                    raw: (sql: any, ...args: any[]) => string;
                };
                raw: (sql: any, ...args: any[]) => string;
                execute: () => Promise<any>;
                definition: () => any[];
                literal: (sql: any, args?: any[]) => any;
            };
            orderBy: (...columns: any[]) => {
                execute: () => Promise<any>;
                raw: (sql: any, ...args: any[]) => string;
            } | {
                execute: () => Promise<any>;
                definition: () => any[];
                raw: (sql: any, ...args: any[]) => string;
            };
            literal: (sql: any, args?: any[]) => any;
            raw: (sql: any, ...args: any[]) => string;
            definition: () => any[];
        };
    };
    subSelect(statement: any, alias: any): string;
    __select(columns: any): {
        from: (table: any, alias: any, schema: any) => {
            execute: () => Promise<any>;
            leftJoin: (table: any, column: any, alias: any, schema: any) => {
                on: (table: any, column: any, alias: any, schema: any) => {
                    execute: () => Promise<any>;
                    leftJoin: any;
                    leftOuterJoin: any;
                    innerJoin: any;
                    rightJoin: any;
                    rightOuterJoin: any;
                    groupBy: (columns: any) => {
                        execute: () => Promise<any>;
                        having: (...conditions: any[]) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                            orderBy: (...columns: any[]) => {
                                execute: () => Promise<any>;
                                raw: (sql: any, ...args: any[]) => string;
                            } | {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            limit: (limit: any) => {
                                execute: () => Promise<any>;
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            literal: (sql: any, args?: any[]) => any;
                        };
                        limit: (limit: any) => {
                            execute: () => Promise<any>;
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        orderBy: (...columns: any[]) => {
                            execute: () => Promise<any>;
                            raw: (sql: any, ...args: any[]) => string;
                        } | {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        literal: (sql: any, args?: any[]) => any;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    limit: (limit: any) => {
                        execute: () => Promise<any>;
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    offset: (offset: any) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    where: (...config: any[]) => {
                        groupBy: (columns: any) => {
                            execute: () => Promise<any>;
                            having: (...conditions: any[]) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                                orderBy: (...columns: any[]) => {
                                    execute: () => Promise<any>;
                                    raw: (sql: any, ...args: any[]) => string;
                                } | {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                limit: (limit: any) => {
                                    execute: () => Promise<any>;
                                    offset: (offset: any) => {
                                        execute: () => Promise<any>;
                                        definition: () => any[];
                                        literal: (sql: any, args?: any[]) => any;
                                        raw: (sql: any, ...args: any[]) => string;
                                    };
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                literal: (sql: any, args?: any[]) => any;
                            };
                            limit: (limit: any) => {
                                execute: () => Promise<any>;
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            orderBy: (...columns: any[]) => {
                                execute: () => Promise<any>;
                                raw: (sql: any, ...args: any[]) => string;
                            } | {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            literal: (sql: any, args?: any[]) => any;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        limit: (limit: any) => {
                            execute: () => Promise<any>;
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        orderBy: (...columns: any[]) => {
                            execute: () => Promise<any>;
                            raw: (sql: any, ...args: any[]) => string;
                        } | {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        raw: (sql: any, ...args: any[]) => string;
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                    };
                    orderBy: (...columns: any[]) => {
                        execute: () => Promise<any>;
                        raw: (sql: any, ...args: any[]) => string;
                    } | {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                    definition: () => any[];
                };
            };
            leftOuterJoin: (table: any, column: any, alias: any, schema: any) => {
                on: (table: any, column: any, alias: any, schema: any) => {
                    execute: () => Promise<any>;
                    leftJoin: any;
                    leftOuterJoin: any;
                    innerJoin: any;
                    rightJoin: any;
                    rightOuterJoin: any;
                    groupBy: (columns: any) => {
                        execute: () => Promise<any>;
                        having: (...conditions: any[]) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                            orderBy: (...columns: any[]) => {
                                execute: () => Promise<any>;
                                raw: (sql: any, ...args: any[]) => string;
                            } | {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            limit: (limit: any) => {
                                execute: () => Promise<any>;
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            literal: (sql: any, args?: any[]) => any;
                        };
                        limit: (limit: any) => {
                            execute: () => Promise<any>;
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        orderBy: (...columns: any[]) => {
                            execute: () => Promise<any>;
                            raw: (sql: any, ...args: any[]) => string;
                        } | {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        literal: (sql: any, args?: any[]) => any;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    limit: (limit: any) => {
                        execute: () => Promise<any>;
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    offset: (offset: any) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    where: (...config: any[]) => {
                        groupBy: (columns: any) => {
                            execute: () => Promise<any>;
                            having: (...conditions: any[]) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                                orderBy: (...columns: any[]) => {
                                    execute: () => Promise<any>;
                                    raw: (sql: any, ...args: any[]) => string;
                                } | {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                limit: (limit: any) => {
                                    execute: () => Promise<any>;
                                    offset: (offset: any) => {
                                        execute: () => Promise<any>;
                                        definition: () => any[];
                                        literal: (sql: any, args?: any[]) => any;
                                        raw: (sql: any, ...args: any[]) => string;
                                    };
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                literal: (sql: any, args?: any[]) => any;
                            };
                            limit: (limit: any) => {
                                execute: () => Promise<any>;
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            orderBy: (...columns: any[]) => {
                                execute: () => Promise<any>;
                                raw: (sql: any, ...args: any[]) => string;
                            } | {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            literal: (sql: any, args?: any[]) => any;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        limit: (limit: any) => {
                            execute: () => Promise<any>;
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        orderBy: (...columns: any[]) => {
                            execute: () => Promise<any>;
                            raw: (sql: any, ...args: any[]) => string;
                        } | {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        raw: (sql: any, ...args: any[]) => string;
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                    };
                    orderBy: (...columns: any[]) => {
                        execute: () => Promise<any>;
                        raw: (sql: any, ...args: any[]) => string;
                    } | {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                    definition: () => any[];
                };
            };
            innerJoin: (table: any, column: any, alias: any, schema: any) => {
                on: (table: any, column: any, alias: any, schema: any) => {
                    execute: () => Promise<any>;
                    leftJoin: any;
                    leftOuterJoin: any;
                    innerJoin: any;
                    rightJoin: any;
                    rightOuterJoin: any;
                    groupBy: (columns: any) => {
                        execute: () => Promise<any>;
                        having: (...conditions: any[]) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                            orderBy: (...columns: any[]) => {
                                execute: () => Promise<any>;
                                raw: (sql: any, ...args: any[]) => string;
                            } | {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            limit: (limit: any) => {
                                execute: () => Promise<any>;
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            literal: (sql: any, args?: any[]) => any;
                        };
                        limit: (limit: any) => {
                            execute: () => Promise<any>;
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        orderBy: (...columns: any[]) => {
                            execute: () => Promise<any>;
                            raw: (sql: any, ...args: any[]) => string;
                        } | {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        literal: (sql: any, args?: any[]) => any;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    limit: (limit: any) => {
                        execute: () => Promise<any>;
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    offset: (offset: any) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    where: (...config: any[]) => {
                        groupBy: (columns: any) => {
                            execute: () => Promise<any>;
                            having: (...conditions: any[]) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                                orderBy: (...columns: any[]) => {
                                    execute: () => Promise<any>;
                                    raw: (sql: any, ...args: any[]) => string;
                                } | {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                limit: (limit: any) => {
                                    execute: () => Promise<any>;
                                    offset: (offset: any) => {
                                        execute: () => Promise<any>;
                                        definition: () => any[];
                                        literal: (sql: any, args?: any[]) => any;
                                        raw: (sql: any, ...args: any[]) => string;
                                    };
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                literal: (sql: any, args?: any[]) => any;
                            };
                            limit: (limit: any) => {
                                execute: () => Promise<any>;
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            orderBy: (...columns: any[]) => {
                                execute: () => Promise<any>;
                                raw: (sql: any, ...args: any[]) => string;
                            } | {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            literal: (sql: any, args?: any[]) => any;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        limit: (limit: any) => {
                            execute: () => Promise<any>;
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        orderBy: (...columns: any[]) => {
                            execute: () => Promise<any>;
                            raw: (sql: any, ...args: any[]) => string;
                        } | {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        raw: (sql: any, ...args: any[]) => string;
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                    };
                    orderBy: (...columns: any[]) => {
                        execute: () => Promise<any>;
                        raw: (sql: any, ...args: any[]) => string;
                    } | {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                    definition: () => any[];
                };
            };
            rightJoin: (table: any, column: any, alias: any, schema: any) => {
                on: (table: any, column: any, alias: any, schema: any) => {
                    execute: () => Promise<any>;
                    leftJoin: any;
                    leftOuterJoin: any;
                    innerJoin: any;
                    rightJoin: any;
                    rightOuterJoin: any;
                    groupBy: (columns: any) => {
                        execute: () => Promise<any>;
                        having: (...conditions: any[]) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                            orderBy: (...columns: any[]) => {
                                execute: () => Promise<any>;
                                raw: (sql: any, ...args: any[]) => string;
                            } | {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            limit: (limit: any) => {
                                execute: () => Promise<any>;
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            literal: (sql: any, args?: any[]) => any;
                        };
                        limit: (limit: any) => {
                            execute: () => Promise<any>;
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        orderBy: (...columns: any[]) => {
                            execute: () => Promise<any>;
                            raw: (sql: any, ...args: any[]) => string;
                        } | {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        literal: (sql: any, args?: any[]) => any;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    limit: (limit: any) => {
                        execute: () => Promise<any>;
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    offset: (offset: any) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    where: (...config: any[]) => {
                        groupBy: (columns: any) => {
                            execute: () => Promise<any>;
                            having: (...conditions: any[]) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                                orderBy: (...columns: any[]) => {
                                    execute: () => Promise<any>;
                                    raw: (sql: any, ...args: any[]) => string;
                                } | {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                limit: (limit: any) => {
                                    execute: () => Promise<any>;
                                    offset: (offset: any) => {
                                        execute: () => Promise<any>;
                                        definition: () => any[];
                                        literal: (sql: any, args?: any[]) => any;
                                        raw: (sql: any, ...args: any[]) => string;
                                    };
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                literal: (sql: any, args?: any[]) => any;
                            };
                            limit: (limit: any) => {
                                execute: () => Promise<any>;
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            orderBy: (...columns: any[]) => {
                                execute: () => Promise<any>;
                                raw: (sql: any, ...args: any[]) => string;
                            } | {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            literal: (sql: any, args?: any[]) => any;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        limit: (limit: any) => {
                            execute: () => Promise<any>;
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        orderBy: (...columns: any[]) => {
                            execute: () => Promise<any>;
                            raw: (sql: any, ...args: any[]) => string;
                        } | {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        raw: (sql: any, ...args: any[]) => string;
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                    };
                    orderBy: (...columns: any[]) => {
                        execute: () => Promise<any>;
                        raw: (sql: any, ...args: any[]) => string;
                    } | {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                    definition: () => any[];
                };
            };
            rightOuterJoin: (table: any, column: any, alias: any, schema: any) => {
                on: (table: any, column: any, alias: any, schema: any) => {
                    execute: () => Promise<any>;
                    leftJoin: any;
                    leftOuterJoin: any;
                    innerJoin: any;
                    rightJoin: any;
                    rightOuterJoin: any;
                    groupBy: (columns: any) => {
                        execute: () => Promise<any>;
                        having: (...conditions: any[]) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                            orderBy: (...columns: any[]) => {
                                execute: () => Promise<any>;
                                raw: (sql: any, ...args: any[]) => string;
                            } | {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            limit: (limit: any) => {
                                execute: () => Promise<any>;
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            literal: (sql: any, args?: any[]) => any;
                        };
                        limit: (limit: any) => {
                            execute: () => Promise<any>;
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        orderBy: (...columns: any[]) => {
                            execute: () => Promise<any>;
                            raw: (sql: any, ...args: any[]) => string;
                        } | {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        literal: (sql: any, args?: any[]) => any;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    limit: (limit: any) => {
                        execute: () => Promise<any>;
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    offset: (offset: any) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    where: (...config: any[]) => {
                        groupBy: (columns: any) => {
                            execute: () => Promise<any>;
                            having: (...conditions: any[]) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                                orderBy: (...columns: any[]) => {
                                    execute: () => Promise<any>;
                                    raw: (sql: any, ...args: any[]) => string;
                                } | {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                limit: (limit: any) => {
                                    execute: () => Promise<any>;
                                    offset: (offset: any) => {
                                        execute: () => Promise<any>;
                                        definition: () => any[];
                                        literal: (sql: any, args?: any[]) => any;
                                        raw: (sql: any, ...args: any[]) => string;
                                    };
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                literal: (sql: any, args?: any[]) => any;
                            };
                            limit: (limit: any) => {
                                execute: () => Promise<any>;
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            orderBy: (...columns: any[]) => {
                                execute: () => Promise<any>;
                                raw: (sql: any, ...args: any[]) => string;
                            } | {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            literal: (sql: any, args?: any[]) => any;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        limit: (limit: any) => {
                            execute: () => Promise<any>;
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        orderBy: (...columns: any[]) => {
                            execute: () => Promise<any>;
                            raw: (sql: any, ...args: any[]) => string;
                        } | {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        raw: (sql: any, ...args: any[]) => string;
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                    };
                    orderBy: (...columns: any[]) => {
                        execute: () => Promise<any>;
                        raw: (sql: any, ...args: any[]) => string;
                    } | {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                    definition: () => any[];
                };
            };
            groupBy: (columns: any) => {
                execute: () => Promise<any>;
                having: (...conditions: any[]) => {
                    execute: () => Promise<any>;
                    definition: () => any[];
                    raw: (sql: any, ...args: any[]) => string;
                    orderBy: (...columns: any[]) => {
                        execute: () => Promise<any>;
                        raw: (sql: any, ...args: any[]) => string;
                    } | {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    limit: (limit: any) => {
                        execute: () => Promise<any>;
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    offset: (offset: any) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    literal: (sql: any, args?: any[]) => any;
                };
                limit: (limit: any) => {
                    execute: () => Promise<any>;
                    offset: (offset: any) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    definition: () => any[];
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                };
                offset: (offset: any) => {
                    execute: () => Promise<any>;
                    definition: () => any[];
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                };
                orderBy: (...columns: any[]) => {
                    execute: () => Promise<any>;
                    raw: (sql: any, ...args: any[]) => string;
                } | {
                    execute: () => Promise<any>;
                    definition: () => any[];
                    raw: (sql: any, ...args: any[]) => string;
                };
                literal: (sql: any, args?: any[]) => any;
                definition: () => any[];
                raw: (sql: any, ...args: any[]) => string;
            };
            limit: (limit: any) => {
                execute: () => Promise<any>;
                offset: (offset: any) => {
                    execute: () => Promise<any>;
                    definition: () => any[];
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                };
                definition: () => any[];
                literal: (sql: any, args?: any[]) => any;
                raw: (sql: any, ...args: any[]) => string;
            };
            offset: (offset: any) => {
                execute: () => Promise<any>;
                definition: () => any[];
                literal: (sql: any, args?: any[]) => any;
                raw: (sql: any, ...args: any[]) => string;
            };
            where: (...config: any[]) => {
                groupBy: (columns: any) => {
                    execute: () => Promise<any>;
                    having: (...conditions: any[]) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                        orderBy: (...columns: any[]) => {
                            execute: () => Promise<any>;
                            raw: (sql: any, ...args: any[]) => string;
                        } | {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        limit: (limit: any) => {
                            execute: () => Promise<any>;
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        literal: (sql: any, args?: any[]) => any;
                    };
                    limit: (limit: any) => {
                        execute: () => Promise<any>;
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    offset: (offset: any) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    orderBy: (...columns: any[]) => {
                        execute: () => Promise<any>;
                        raw: (sql: any, ...args: any[]) => string;
                    } | {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    literal: (sql: any, args?: any[]) => any;
                    definition: () => any[];
                    raw: (sql: any, ...args: any[]) => string;
                };
                limit: (limit: any) => {
                    execute: () => Promise<any>;
                    offset: (offset: any) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    definition: () => any[];
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                };
                offset: (offset: any) => {
                    execute: () => Promise<any>;
                    definition: () => any[];
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                };
                orderBy: (...columns: any[]) => {
                    execute: () => Promise<any>;
                    raw: (sql: any, ...args: any[]) => string;
                } | {
                    execute: () => Promise<any>;
                    definition: () => any[];
                    raw: (sql: any, ...args: any[]) => string;
                };
                raw: (sql: any, ...args: any[]) => string;
                execute: () => Promise<any>;
                definition: () => any[];
                literal: (sql: any, args?: any[]) => any;
            };
            orderBy: (...columns: any[]) => {
                execute: () => Promise<any>;
                raw: (sql: any, ...args: any[]) => string;
            } | {
                execute: () => Promise<any>;
                definition: () => any[];
                raw: (sql: any, ...args: any[]) => string;
            };
            literal: (sql: any, args?: any[]) => any;
            raw: (sql: any, ...args: any[]) => string;
            definition: () => any[];
        };
    };
    __subSelect(columns: any): {
        from: (table: any, alias: any, schema: any) => {
            execute: () => Promise<any>;
            leftJoin: (table: any, column: any, alias: any, schema: any) => {
                on: (table: any, column: any, alias: any, schema: any) => {
                    execute: () => Promise<any>;
                    leftJoin: any;
                    leftOuterJoin: any;
                    innerJoin: any;
                    rightJoin: any;
                    rightOuterJoin: any;
                    groupBy: (columns: any) => {
                        execute: () => Promise<any>;
                        having: (...conditions: any[]) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                            orderBy: (...columns: any[]) => {
                                execute: () => Promise<any>;
                                raw: (sql: any, ...args: any[]) => string;
                            } | {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            limit: (limit: any) => {
                                execute: () => Promise<any>;
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            literal: (sql: any, args?: any[]) => any;
                        };
                        limit: (limit: any) => {
                            execute: () => Promise<any>;
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        orderBy: (...columns: any[]) => {
                            execute: () => Promise<any>;
                            raw: (sql: any, ...args: any[]) => string;
                        } | {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        literal: (sql: any, args?: any[]) => any;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    limit: (limit: any) => {
                        execute: () => Promise<any>;
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    offset: (offset: any) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    where: (...config: any[]) => {
                        groupBy: (columns: any) => {
                            execute: () => Promise<any>;
                            having: (...conditions: any[]) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                                orderBy: (...columns: any[]) => {
                                    execute: () => Promise<any>;
                                    raw: (sql: any, ...args: any[]) => string;
                                } | {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                limit: (limit: any) => {
                                    execute: () => Promise<any>;
                                    offset: (offset: any) => {
                                        execute: () => Promise<any>;
                                        definition: () => any[];
                                        literal: (sql: any, args?: any[]) => any;
                                        raw: (sql: any, ...args: any[]) => string;
                                    };
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                literal: (sql: any, args?: any[]) => any;
                            };
                            limit: (limit: any) => {
                                execute: () => Promise<any>;
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            orderBy: (...columns: any[]) => {
                                execute: () => Promise<any>;
                                raw: (sql: any, ...args: any[]) => string;
                            } | {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            literal: (sql: any, args?: any[]) => any;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        limit: (limit: any) => {
                            execute: () => Promise<any>;
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        orderBy: (...columns: any[]) => {
                            execute: () => Promise<any>;
                            raw: (sql: any, ...args: any[]) => string;
                        } | {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        raw: (sql: any, ...args: any[]) => string;
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                    };
                    orderBy: (...columns: any[]) => {
                        execute: () => Promise<any>;
                        raw: (sql: any, ...args: any[]) => string;
                    } | {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                    definition: () => any[];
                };
            };
            leftOuterJoin: (table: any, column: any, alias: any, schema: any) => {
                on: (table: any, column: any, alias: any, schema: any) => {
                    execute: () => Promise<any>;
                    leftJoin: any;
                    leftOuterJoin: any;
                    innerJoin: any;
                    rightJoin: any;
                    rightOuterJoin: any;
                    groupBy: (columns: any) => {
                        execute: () => Promise<any>;
                        having: (...conditions: any[]) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                            orderBy: (...columns: any[]) => {
                                execute: () => Promise<any>;
                                raw: (sql: any, ...args: any[]) => string;
                            } | {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            limit: (limit: any) => {
                                execute: () => Promise<any>;
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            literal: (sql: any, args?: any[]) => any;
                        };
                        limit: (limit: any) => {
                            execute: () => Promise<any>;
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        orderBy: (...columns: any[]) => {
                            execute: () => Promise<any>;
                            raw: (sql: any, ...args: any[]) => string;
                        } | {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        literal: (sql: any, args?: any[]) => any;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    limit: (limit: any) => {
                        execute: () => Promise<any>;
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    offset: (offset: any) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    where: (...config: any[]) => {
                        groupBy: (columns: any) => {
                            execute: () => Promise<any>;
                            having: (...conditions: any[]) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                                orderBy: (...columns: any[]) => {
                                    execute: () => Promise<any>;
                                    raw: (sql: any, ...args: any[]) => string;
                                } | {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                limit: (limit: any) => {
                                    execute: () => Promise<any>;
                                    offset: (offset: any) => {
                                        execute: () => Promise<any>;
                                        definition: () => any[];
                                        literal: (sql: any, args?: any[]) => any;
                                        raw: (sql: any, ...args: any[]) => string;
                                    };
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                literal: (sql: any, args?: any[]) => any;
                            };
                            limit: (limit: any) => {
                                execute: () => Promise<any>;
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            orderBy: (...columns: any[]) => {
                                execute: () => Promise<any>;
                                raw: (sql: any, ...args: any[]) => string;
                            } | {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            literal: (sql: any, args?: any[]) => any;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        limit: (limit: any) => {
                            execute: () => Promise<any>;
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        orderBy: (...columns: any[]) => {
                            execute: () => Promise<any>;
                            raw: (sql: any, ...args: any[]) => string;
                        } | {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        raw: (sql: any, ...args: any[]) => string;
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                    };
                    orderBy: (...columns: any[]) => {
                        execute: () => Promise<any>;
                        raw: (sql: any, ...args: any[]) => string;
                    } | {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                    definition: () => any[];
                };
            };
            innerJoin: (table: any, column: any, alias: any, schema: any) => {
                on: (table: any, column: any, alias: any, schema: any) => {
                    execute: () => Promise<any>;
                    leftJoin: any;
                    leftOuterJoin: any;
                    innerJoin: any;
                    rightJoin: any;
                    rightOuterJoin: any;
                    groupBy: (columns: any) => {
                        execute: () => Promise<any>;
                        having: (...conditions: any[]) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                            orderBy: (...columns: any[]) => {
                                execute: () => Promise<any>;
                                raw: (sql: any, ...args: any[]) => string;
                            } | {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            limit: (limit: any) => {
                                execute: () => Promise<any>;
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            literal: (sql: any, args?: any[]) => any;
                        };
                        limit: (limit: any) => {
                            execute: () => Promise<any>;
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        orderBy: (...columns: any[]) => {
                            execute: () => Promise<any>;
                            raw: (sql: any, ...args: any[]) => string;
                        } | {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        literal: (sql: any, args?: any[]) => any;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    limit: (limit: any) => {
                        execute: () => Promise<any>;
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    offset: (offset: any) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    where: (...config: any[]) => {
                        groupBy: (columns: any) => {
                            execute: () => Promise<any>;
                            having: (...conditions: any[]) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                                orderBy: (...columns: any[]) => {
                                    execute: () => Promise<any>;
                                    raw: (sql: any, ...args: any[]) => string;
                                } | {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                limit: (limit: any) => {
                                    execute: () => Promise<any>;
                                    offset: (offset: any) => {
                                        execute: () => Promise<any>;
                                        definition: () => any[];
                                        literal: (sql: any, args?: any[]) => any;
                                        raw: (sql: any, ...args: any[]) => string;
                                    };
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                literal: (sql: any, args?: any[]) => any;
                            };
                            limit: (limit: any) => {
                                execute: () => Promise<any>;
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            orderBy: (...columns: any[]) => {
                                execute: () => Promise<any>;
                                raw: (sql: any, ...args: any[]) => string;
                            } | {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            literal: (sql: any, args?: any[]) => any;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        limit: (limit: any) => {
                            execute: () => Promise<any>;
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        orderBy: (...columns: any[]) => {
                            execute: () => Promise<any>;
                            raw: (sql: any, ...args: any[]) => string;
                        } | {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        raw: (sql: any, ...args: any[]) => string;
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                    };
                    orderBy: (...columns: any[]) => {
                        execute: () => Promise<any>;
                        raw: (sql: any, ...args: any[]) => string;
                    } | {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                    definition: () => any[];
                };
            };
            rightJoin: (table: any, column: any, alias: any, schema: any) => {
                on: (table: any, column: any, alias: any, schema: any) => {
                    execute: () => Promise<any>;
                    leftJoin: any;
                    leftOuterJoin: any;
                    innerJoin: any;
                    rightJoin: any;
                    rightOuterJoin: any;
                    groupBy: (columns: any) => {
                        execute: () => Promise<any>;
                        having: (...conditions: any[]) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                            orderBy: (...columns: any[]) => {
                                execute: () => Promise<any>;
                                raw: (sql: any, ...args: any[]) => string;
                            } | {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            limit: (limit: any) => {
                                execute: () => Promise<any>;
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            literal: (sql: any, args?: any[]) => any;
                        };
                        limit: (limit: any) => {
                            execute: () => Promise<any>;
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        orderBy: (...columns: any[]) => {
                            execute: () => Promise<any>;
                            raw: (sql: any, ...args: any[]) => string;
                        } | {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        literal: (sql: any, args?: any[]) => any;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    limit: (limit: any) => {
                        execute: () => Promise<any>;
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    offset: (offset: any) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    where: (...config: any[]) => {
                        groupBy: (columns: any) => {
                            execute: () => Promise<any>;
                            having: (...conditions: any[]) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                                orderBy: (...columns: any[]) => {
                                    execute: () => Promise<any>;
                                    raw: (sql: any, ...args: any[]) => string;
                                } | {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                limit: (limit: any) => {
                                    execute: () => Promise<any>;
                                    offset: (offset: any) => {
                                        execute: () => Promise<any>;
                                        definition: () => any[];
                                        literal: (sql: any, args?: any[]) => any;
                                        raw: (sql: any, ...args: any[]) => string;
                                    };
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                literal: (sql: any, args?: any[]) => any;
                            };
                            limit: (limit: any) => {
                                execute: () => Promise<any>;
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            orderBy: (...columns: any[]) => {
                                execute: () => Promise<any>;
                                raw: (sql: any, ...args: any[]) => string;
                            } | {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            literal: (sql: any, args?: any[]) => any;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        limit: (limit: any) => {
                            execute: () => Promise<any>;
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        orderBy: (...columns: any[]) => {
                            execute: () => Promise<any>;
                            raw: (sql: any, ...args: any[]) => string;
                        } | {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        raw: (sql: any, ...args: any[]) => string;
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                    };
                    orderBy: (...columns: any[]) => {
                        execute: () => Promise<any>;
                        raw: (sql: any, ...args: any[]) => string;
                    } | {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                    definition: () => any[];
                };
            };
            rightOuterJoin: (table: any, column: any, alias: any, schema: any) => {
                on: (table: any, column: any, alias: any, schema: any) => {
                    execute: () => Promise<any>;
                    leftJoin: any;
                    leftOuterJoin: any;
                    innerJoin: any;
                    rightJoin: any;
                    rightOuterJoin: any;
                    groupBy: (columns: any) => {
                        execute: () => Promise<any>;
                        having: (...conditions: any[]) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                            orderBy: (...columns: any[]) => {
                                execute: () => Promise<any>;
                                raw: (sql: any, ...args: any[]) => string;
                            } | {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            limit: (limit: any) => {
                                execute: () => Promise<any>;
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            literal: (sql: any, args?: any[]) => any;
                        };
                        limit: (limit: any) => {
                            execute: () => Promise<any>;
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        orderBy: (...columns: any[]) => {
                            execute: () => Promise<any>;
                            raw: (sql: any, ...args: any[]) => string;
                        } | {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        literal: (sql: any, args?: any[]) => any;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    limit: (limit: any) => {
                        execute: () => Promise<any>;
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    offset: (offset: any) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    where: (...config: any[]) => {
                        groupBy: (columns: any) => {
                            execute: () => Promise<any>;
                            having: (...conditions: any[]) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                                orderBy: (...columns: any[]) => {
                                    execute: () => Promise<any>;
                                    raw: (sql: any, ...args: any[]) => string;
                                } | {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                limit: (limit: any) => {
                                    execute: () => Promise<any>;
                                    offset: (offset: any) => {
                                        execute: () => Promise<any>;
                                        definition: () => any[];
                                        literal: (sql: any, args?: any[]) => any;
                                        raw: (sql: any, ...args: any[]) => string;
                                    };
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                literal: (sql: any, args?: any[]) => any;
                            };
                            limit: (limit: any) => {
                                execute: () => Promise<any>;
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            orderBy: (...columns: any[]) => {
                                execute: () => Promise<any>;
                                raw: (sql: any, ...args: any[]) => string;
                            } | {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            literal: (sql: any, args?: any[]) => any;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        limit: (limit: any) => {
                            execute: () => Promise<any>;
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        orderBy: (...columns: any[]) => {
                            execute: () => Promise<any>;
                            raw: (sql: any, ...args: any[]) => string;
                        } | {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        raw: (sql: any, ...args: any[]) => string;
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                    };
                    orderBy: (...columns: any[]) => {
                        execute: () => Promise<any>;
                        raw: (sql: any, ...args: any[]) => string;
                    } | {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                    definition: () => any[];
                };
            };
            groupBy: (columns: any) => {
                execute: () => Promise<any>;
                having: (...conditions: any[]) => {
                    execute: () => Promise<any>;
                    definition: () => any[];
                    raw: (sql: any, ...args: any[]) => string;
                    orderBy: (...columns: any[]) => {
                        execute: () => Promise<any>;
                        raw: (sql: any, ...args: any[]) => string;
                    } | {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    limit: (limit: any) => {
                        execute: () => Promise<any>;
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    offset: (offset: any) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    literal: (sql: any, args?: any[]) => any;
                };
                limit: (limit: any) => {
                    execute: () => Promise<any>;
                    offset: (offset: any) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    definition: () => any[];
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                };
                offset: (offset: any) => {
                    execute: () => Promise<any>;
                    definition: () => any[];
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                };
                orderBy: (...columns: any[]) => {
                    execute: () => Promise<any>;
                    raw: (sql: any, ...args: any[]) => string;
                } | {
                    execute: () => Promise<any>;
                    definition: () => any[];
                    raw: (sql: any, ...args: any[]) => string;
                };
                literal: (sql: any, args?: any[]) => any;
                definition: () => any[];
                raw: (sql: any, ...args: any[]) => string;
            };
            limit: (limit: any) => {
                execute: () => Promise<any>;
                offset: (offset: any) => {
                    execute: () => Promise<any>;
                    definition: () => any[];
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                };
                definition: () => any[];
                literal: (sql: any, args?: any[]) => any;
                raw: (sql: any, ...args: any[]) => string;
            };
            offset: (offset: any) => {
                execute: () => Promise<any>;
                definition: () => any[];
                literal: (sql: any, args?: any[]) => any;
                raw: (sql: any, ...args: any[]) => string;
            };
            where: (...config: any[]) => {
                groupBy: (columns: any) => {
                    execute: () => Promise<any>;
                    having: (...conditions: any[]) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                        orderBy: (...columns: any[]) => {
                            execute: () => Promise<any>;
                            raw: (sql: any, ...args: any[]) => string;
                        } | {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        limit: (limit: any) => {
                            execute: () => Promise<any>;
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        literal: (sql: any, args?: any[]) => any;
                    };
                    limit: (limit: any) => {
                        execute: () => Promise<any>;
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    offset: (offset: any) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    orderBy: (...columns: any[]) => {
                        execute: () => Promise<any>;
                        raw: (sql: any, ...args: any[]) => string;
                    } | {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    literal: (sql: any, args?: any[]) => any;
                    definition: () => any[];
                    raw: (sql: any, ...args: any[]) => string;
                };
                limit: (limit: any) => {
                    execute: () => Promise<any>;
                    offset: (offset: any) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    definition: () => any[];
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                };
                offset: (offset: any) => {
                    execute: () => Promise<any>;
                    definition: () => any[];
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                };
                orderBy: (...columns: any[]) => {
                    execute: () => Promise<any>;
                    raw: (sql: any, ...args: any[]) => string;
                } | {
                    execute: () => Promise<any>;
                    definition: () => any[];
                    raw: (sql: any, ...args: any[]) => string;
                };
                raw: (sql: any, ...args: any[]) => string;
                execute: () => Promise<any>;
                definition: () => any[];
                literal: (sql: any, args?: any[]) => any;
            };
            orderBy: (...columns: any[]) => {
                execute: () => Promise<any>;
                raw: (sql: any, ...args: any[]) => string;
            } | {
                execute: () => Promise<any>;
                definition: () => any[];
                raw: (sql: any, ...args: any[]) => string;
            };
            literal: (sql: any, args?: any[]) => any;
            raw: (sql: any, ...args: any[]) => string;
            definition: () => any[];
        };
    };
    __from(columns: any, canExecute?: boolean): (table: any, alias: any, schema: any) => {
        execute: () => Promise<any>;
        leftJoin: (table: any, column: any, alias: any, schema: any) => {
            on: (table: any, column: any, alias: any, schema: any) => {
                execute: () => Promise<any>;
                leftJoin: any;
                leftOuterJoin: any;
                innerJoin: any;
                rightJoin: any;
                rightOuterJoin: any;
                groupBy: (columns: any) => {
                    execute: () => Promise<any>;
                    having: (...conditions: any[]) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                        orderBy: (...columns: any[]) => {
                            execute: () => Promise<any>;
                            raw: (sql: any, ...args: any[]) => string;
                        } | {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        limit: (limit: any) => {
                            execute: () => Promise<any>;
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        literal: (sql: any, args?: any[]) => any;
                    };
                    limit: (limit: any) => {
                        execute: () => Promise<any>;
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    offset: (offset: any) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    orderBy: (...columns: any[]) => {
                        execute: () => Promise<any>;
                        raw: (sql: any, ...args: any[]) => string;
                    } | {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    literal: (sql: any, args?: any[]) => any;
                    definition: () => any[];
                    raw: (sql: any, ...args: any[]) => string;
                };
                limit: (limit: any) => {
                    execute: () => Promise<any>;
                    offset: (offset: any) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    definition: () => any[];
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                };
                offset: (offset: any) => {
                    execute: () => Promise<any>;
                    definition: () => any[];
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                };
                where: (...config: any[]) => {
                    groupBy: (columns: any) => {
                        execute: () => Promise<any>;
                        having: (...conditions: any[]) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                            orderBy: (...columns: any[]) => {
                                execute: () => Promise<any>;
                                raw: (sql: any, ...args: any[]) => string;
                            } | {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            limit: (limit: any) => {
                                execute: () => Promise<any>;
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            literal: (sql: any, args?: any[]) => any;
                        };
                        limit: (limit: any) => {
                            execute: () => Promise<any>;
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        orderBy: (...columns: any[]) => {
                            execute: () => Promise<any>;
                            raw: (sql: any, ...args: any[]) => string;
                        } | {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        literal: (sql: any, args?: any[]) => any;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    limit: (limit: any) => {
                        execute: () => Promise<any>;
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    offset: (offset: any) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    orderBy: (...columns: any[]) => {
                        execute: () => Promise<any>;
                        raw: (sql: any, ...args: any[]) => string;
                    } | {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    raw: (sql: any, ...args: any[]) => string;
                    execute: () => Promise<any>;
                    definition: () => any[];
                    literal: (sql: any, args?: any[]) => any;
                };
                orderBy: (...columns: any[]) => {
                    execute: () => Promise<any>;
                    raw: (sql: any, ...args: any[]) => string;
                } | {
                    execute: () => Promise<any>;
                    definition: () => any[];
                    raw: (sql: any, ...args: any[]) => string;
                };
                literal: (sql: any, args?: any[]) => any;
                raw: (sql: any, ...args: any[]) => string;
                definition: () => any[];
            };
        };
        leftOuterJoin: (table: any, column: any, alias: any, schema: any) => {
            on: (table: any, column: any, alias: any, schema: any) => {
                execute: () => Promise<any>;
                leftJoin: any;
                leftOuterJoin: any;
                innerJoin: any;
                rightJoin: any;
                rightOuterJoin: any;
                groupBy: (columns: any) => {
                    execute: () => Promise<any>;
                    having: (...conditions: any[]) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                        orderBy: (...columns: any[]) => {
                            execute: () => Promise<any>;
                            raw: (sql: any, ...args: any[]) => string;
                        } | {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        limit: (limit: any) => {
                            execute: () => Promise<any>;
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        literal: (sql: any, args?: any[]) => any;
                    };
                    limit: (limit: any) => {
                        execute: () => Promise<any>;
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    offset: (offset: any) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    orderBy: (...columns: any[]) => {
                        execute: () => Promise<any>;
                        raw: (sql: any, ...args: any[]) => string;
                    } | {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    literal: (sql: any, args?: any[]) => any;
                    definition: () => any[];
                    raw: (sql: any, ...args: any[]) => string;
                };
                limit: (limit: any) => {
                    execute: () => Promise<any>;
                    offset: (offset: any) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    definition: () => any[];
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                };
                offset: (offset: any) => {
                    execute: () => Promise<any>;
                    definition: () => any[];
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                };
                where: (...config: any[]) => {
                    groupBy: (columns: any) => {
                        execute: () => Promise<any>;
                        having: (...conditions: any[]) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                            orderBy: (...columns: any[]) => {
                                execute: () => Promise<any>;
                                raw: (sql: any, ...args: any[]) => string;
                            } | {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            limit: (limit: any) => {
                                execute: () => Promise<any>;
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            literal: (sql: any, args?: any[]) => any;
                        };
                        limit: (limit: any) => {
                            execute: () => Promise<any>;
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        orderBy: (...columns: any[]) => {
                            execute: () => Promise<any>;
                            raw: (sql: any, ...args: any[]) => string;
                        } | {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        literal: (sql: any, args?: any[]) => any;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    limit: (limit: any) => {
                        execute: () => Promise<any>;
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    offset: (offset: any) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    orderBy: (...columns: any[]) => {
                        execute: () => Promise<any>;
                        raw: (sql: any, ...args: any[]) => string;
                    } | {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    raw: (sql: any, ...args: any[]) => string;
                    execute: () => Promise<any>;
                    definition: () => any[];
                    literal: (sql: any, args?: any[]) => any;
                };
                orderBy: (...columns: any[]) => {
                    execute: () => Promise<any>;
                    raw: (sql: any, ...args: any[]) => string;
                } | {
                    execute: () => Promise<any>;
                    definition: () => any[];
                    raw: (sql: any, ...args: any[]) => string;
                };
                literal: (sql: any, args?: any[]) => any;
                raw: (sql: any, ...args: any[]) => string;
                definition: () => any[];
            };
        };
        innerJoin: (table: any, column: any, alias: any, schema: any) => {
            on: (table: any, column: any, alias: any, schema: any) => {
                execute: () => Promise<any>;
                leftJoin: any;
                leftOuterJoin: any;
                innerJoin: any;
                rightJoin: any;
                rightOuterJoin: any;
                groupBy: (columns: any) => {
                    execute: () => Promise<any>;
                    having: (...conditions: any[]) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                        orderBy: (...columns: any[]) => {
                            execute: () => Promise<any>;
                            raw: (sql: any, ...args: any[]) => string;
                        } | {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        limit: (limit: any) => {
                            execute: () => Promise<any>;
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        literal: (sql: any, args?: any[]) => any;
                    };
                    limit: (limit: any) => {
                        execute: () => Promise<any>;
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    offset: (offset: any) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    orderBy: (...columns: any[]) => {
                        execute: () => Promise<any>;
                        raw: (sql: any, ...args: any[]) => string;
                    } | {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    literal: (sql: any, args?: any[]) => any;
                    definition: () => any[];
                    raw: (sql: any, ...args: any[]) => string;
                };
                limit: (limit: any) => {
                    execute: () => Promise<any>;
                    offset: (offset: any) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    definition: () => any[];
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                };
                offset: (offset: any) => {
                    execute: () => Promise<any>;
                    definition: () => any[];
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                };
                where: (...config: any[]) => {
                    groupBy: (columns: any) => {
                        execute: () => Promise<any>;
                        having: (...conditions: any[]) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                            orderBy: (...columns: any[]) => {
                                execute: () => Promise<any>;
                                raw: (sql: any, ...args: any[]) => string;
                            } | {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            limit: (limit: any) => {
                                execute: () => Promise<any>;
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            literal: (sql: any, args?: any[]) => any;
                        };
                        limit: (limit: any) => {
                            execute: () => Promise<any>;
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        orderBy: (...columns: any[]) => {
                            execute: () => Promise<any>;
                            raw: (sql: any, ...args: any[]) => string;
                        } | {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        literal: (sql: any, args?: any[]) => any;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    limit: (limit: any) => {
                        execute: () => Promise<any>;
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    offset: (offset: any) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    orderBy: (...columns: any[]) => {
                        execute: () => Promise<any>;
                        raw: (sql: any, ...args: any[]) => string;
                    } | {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    raw: (sql: any, ...args: any[]) => string;
                    execute: () => Promise<any>;
                    definition: () => any[];
                    literal: (sql: any, args?: any[]) => any;
                };
                orderBy: (...columns: any[]) => {
                    execute: () => Promise<any>;
                    raw: (sql: any, ...args: any[]) => string;
                } | {
                    execute: () => Promise<any>;
                    definition: () => any[];
                    raw: (sql: any, ...args: any[]) => string;
                };
                literal: (sql: any, args?: any[]) => any;
                raw: (sql: any, ...args: any[]) => string;
                definition: () => any[];
            };
        };
        rightJoin: (table: any, column: any, alias: any, schema: any) => {
            on: (table: any, column: any, alias: any, schema: any) => {
                execute: () => Promise<any>;
                leftJoin: any;
                leftOuterJoin: any;
                innerJoin: any;
                rightJoin: any;
                rightOuterJoin: any;
                groupBy: (columns: any) => {
                    execute: () => Promise<any>;
                    having: (...conditions: any[]) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                        orderBy: (...columns: any[]) => {
                            execute: () => Promise<any>;
                            raw: (sql: any, ...args: any[]) => string;
                        } | {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        limit: (limit: any) => {
                            execute: () => Promise<any>;
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        literal: (sql: any, args?: any[]) => any;
                    };
                    limit: (limit: any) => {
                        execute: () => Promise<any>;
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    offset: (offset: any) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    orderBy: (...columns: any[]) => {
                        execute: () => Promise<any>;
                        raw: (sql: any, ...args: any[]) => string;
                    } | {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    literal: (sql: any, args?: any[]) => any;
                    definition: () => any[];
                    raw: (sql: any, ...args: any[]) => string;
                };
                limit: (limit: any) => {
                    execute: () => Promise<any>;
                    offset: (offset: any) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    definition: () => any[];
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                };
                offset: (offset: any) => {
                    execute: () => Promise<any>;
                    definition: () => any[];
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                };
                where: (...config: any[]) => {
                    groupBy: (columns: any) => {
                        execute: () => Promise<any>;
                        having: (...conditions: any[]) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                            orderBy: (...columns: any[]) => {
                                execute: () => Promise<any>;
                                raw: (sql: any, ...args: any[]) => string;
                            } | {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            limit: (limit: any) => {
                                execute: () => Promise<any>;
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            literal: (sql: any, args?: any[]) => any;
                        };
                        limit: (limit: any) => {
                            execute: () => Promise<any>;
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        orderBy: (...columns: any[]) => {
                            execute: () => Promise<any>;
                            raw: (sql: any, ...args: any[]) => string;
                        } | {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        literal: (sql: any, args?: any[]) => any;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    limit: (limit: any) => {
                        execute: () => Promise<any>;
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    offset: (offset: any) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    orderBy: (...columns: any[]) => {
                        execute: () => Promise<any>;
                        raw: (sql: any, ...args: any[]) => string;
                    } | {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    raw: (sql: any, ...args: any[]) => string;
                    execute: () => Promise<any>;
                    definition: () => any[];
                    literal: (sql: any, args?: any[]) => any;
                };
                orderBy: (...columns: any[]) => {
                    execute: () => Promise<any>;
                    raw: (sql: any, ...args: any[]) => string;
                } | {
                    execute: () => Promise<any>;
                    definition: () => any[];
                    raw: (sql: any, ...args: any[]) => string;
                };
                literal: (sql: any, args?: any[]) => any;
                raw: (sql: any, ...args: any[]) => string;
                definition: () => any[];
            };
        };
        rightOuterJoin: (table: any, column: any, alias: any, schema: any) => {
            on: (table: any, column: any, alias: any, schema: any) => {
                execute: () => Promise<any>;
                leftJoin: any;
                leftOuterJoin: any;
                innerJoin: any;
                rightJoin: any;
                rightOuterJoin: any;
                groupBy: (columns: any) => {
                    execute: () => Promise<any>;
                    having: (...conditions: any[]) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                        orderBy: (...columns: any[]) => {
                            execute: () => Promise<any>;
                            raw: (sql: any, ...args: any[]) => string;
                        } | {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        limit: (limit: any) => {
                            execute: () => Promise<any>;
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        literal: (sql: any, args?: any[]) => any;
                    };
                    limit: (limit: any) => {
                        execute: () => Promise<any>;
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    offset: (offset: any) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    orderBy: (...columns: any[]) => {
                        execute: () => Promise<any>;
                        raw: (sql: any, ...args: any[]) => string;
                    } | {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    literal: (sql: any, args?: any[]) => any;
                    definition: () => any[];
                    raw: (sql: any, ...args: any[]) => string;
                };
                limit: (limit: any) => {
                    execute: () => Promise<any>;
                    offset: (offset: any) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    definition: () => any[];
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                };
                offset: (offset: any) => {
                    execute: () => Promise<any>;
                    definition: () => any[];
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                };
                where: (...config: any[]) => {
                    groupBy: (columns: any) => {
                        execute: () => Promise<any>;
                        having: (...conditions: any[]) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                            orderBy: (...columns: any[]) => {
                                execute: () => Promise<any>;
                                raw: (sql: any, ...args: any[]) => string;
                            } | {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            limit: (limit: any) => {
                                execute: () => Promise<any>;
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            literal: (sql: any, args?: any[]) => any;
                        };
                        limit: (limit: any) => {
                            execute: () => Promise<any>;
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        orderBy: (...columns: any[]) => {
                            execute: () => Promise<any>;
                            raw: (sql: any, ...args: any[]) => string;
                        } | {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        literal: (sql: any, args?: any[]) => any;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    limit: (limit: any) => {
                        execute: () => Promise<any>;
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    offset: (offset: any) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    orderBy: (...columns: any[]) => {
                        execute: () => Promise<any>;
                        raw: (sql: any, ...args: any[]) => string;
                    } | {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    raw: (sql: any, ...args: any[]) => string;
                    execute: () => Promise<any>;
                    definition: () => any[];
                    literal: (sql: any, args?: any[]) => any;
                };
                orderBy: (...columns: any[]) => {
                    execute: () => Promise<any>;
                    raw: (sql: any, ...args: any[]) => string;
                } | {
                    execute: () => Promise<any>;
                    definition: () => any[];
                    raw: (sql: any, ...args: any[]) => string;
                };
                literal: (sql: any, args?: any[]) => any;
                raw: (sql: any, ...args: any[]) => string;
                definition: () => any[];
            };
        };
        groupBy: (columns: any) => {
            execute: () => Promise<any>;
            having: (...conditions: any[]) => {
                execute: () => Promise<any>;
                definition: () => any[];
                raw: (sql: any, ...args: any[]) => string;
                orderBy: (...columns: any[]) => {
                    execute: () => Promise<any>;
                    raw: (sql: any, ...args: any[]) => string;
                } | {
                    execute: () => Promise<any>;
                    definition: () => any[];
                    raw: (sql: any, ...args: any[]) => string;
                };
                limit: (limit: any) => {
                    execute: () => Promise<any>;
                    offset: (offset: any) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    definition: () => any[];
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                };
                offset: (offset: any) => {
                    execute: () => Promise<any>;
                    definition: () => any[];
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                };
                literal: (sql: any, args?: any[]) => any;
            };
            limit: (limit: any) => {
                execute: () => Promise<any>;
                offset: (offset: any) => {
                    execute: () => Promise<any>;
                    definition: () => any[];
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                };
                definition: () => any[];
                literal: (sql: any, args?: any[]) => any;
                raw: (sql: any, ...args: any[]) => string;
            };
            offset: (offset: any) => {
                execute: () => Promise<any>;
                definition: () => any[];
                literal: (sql: any, args?: any[]) => any;
                raw: (sql: any, ...args: any[]) => string;
            };
            orderBy: (...columns: any[]) => {
                execute: () => Promise<any>;
                raw: (sql: any, ...args: any[]) => string;
            } | {
                execute: () => Promise<any>;
                definition: () => any[];
                raw: (sql: any, ...args: any[]) => string;
            };
            literal: (sql: any, args?: any[]) => any;
            definition: () => any[];
            raw: (sql: any, ...args: any[]) => string;
        };
        limit: (limit: any) => {
            execute: () => Promise<any>;
            offset: (offset: any) => {
                execute: () => Promise<any>;
                definition: () => any[];
                literal: (sql: any, args?: any[]) => any;
                raw: (sql: any, ...args: any[]) => string;
            };
            definition: () => any[];
            literal: (sql: any, args?: any[]) => any;
            raw: (sql: any, ...args: any[]) => string;
        };
        offset: (offset: any) => {
            execute: () => Promise<any>;
            definition: () => any[];
            literal: (sql: any, args?: any[]) => any;
            raw: (sql: any, ...args: any[]) => string;
        };
        where: (...config: any[]) => {
            groupBy: (columns: any) => {
                execute: () => Promise<any>;
                having: (...conditions: any[]) => {
                    execute: () => Promise<any>;
                    definition: () => any[];
                    raw: (sql: any, ...args: any[]) => string;
                    orderBy: (...columns: any[]) => {
                        execute: () => Promise<any>;
                        raw: (sql: any, ...args: any[]) => string;
                    } | {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    limit: (limit: any) => {
                        execute: () => Promise<any>;
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    offset: (offset: any) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    literal: (sql: any, args?: any[]) => any;
                };
                limit: (limit: any) => {
                    execute: () => Promise<any>;
                    offset: (offset: any) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    definition: () => any[];
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                };
                offset: (offset: any) => {
                    execute: () => Promise<any>;
                    definition: () => any[];
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                };
                orderBy: (...columns: any[]) => {
                    execute: () => Promise<any>;
                    raw: (sql: any, ...args: any[]) => string;
                } | {
                    execute: () => Promise<any>;
                    definition: () => any[];
                    raw: (sql: any, ...args: any[]) => string;
                };
                literal: (sql: any, args?: any[]) => any;
                definition: () => any[];
                raw: (sql: any, ...args: any[]) => string;
            };
            limit: (limit: any) => {
                execute: () => Promise<any>;
                offset: (offset: any) => {
                    execute: () => Promise<any>;
                    definition: () => any[];
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                };
                definition: () => any[];
                literal: (sql: any, args?: any[]) => any;
                raw: (sql: any, ...args: any[]) => string;
            };
            offset: (offset: any) => {
                execute: () => Promise<any>;
                definition: () => any[];
                literal: (sql: any, args?: any[]) => any;
                raw: (sql: any, ...args: any[]) => string;
            };
            orderBy: (...columns: any[]) => {
                execute: () => Promise<any>;
                raw: (sql: any, ...args: any[]) => string;
            } | {
                execute: () => Promise<any>;
                definition: () => any[];
                raw: (sql: any, ...args: any[]) => string;
            };
            raw: (sql: any, ...args: any[]) => string;
            execute: () => Promise<any>;
            definition: () => any[];
            literal: (sql: any, args?: any[]) => any;
        };
        orderBy: (...columns: any[]) => {
            execute: () => Promise<any>;
            raw: (sql: any, ...args: any[]) => string;
        } | {
            execute: () => Promise<any>;
            definition: () => any[];
            raw: (sql: any, ...args: any[]) => string;
        };
        literal: (sql: any, args?: any[]) => any;
        raw: (sql: any, ...args: any[]) => string;
        definition: () => any[];
    };
    __raw(previousSQL: any): (sql: any, ...args: any[]) => string;
    __joinBuilder(joinType: any, previousSQL: any, canExecute: any): (table: any, column: any, alias: any, schema: any) => {
        on: (table: any, column: any, alias: any, schema: any) => {
            execute: () => Promise<any>;
            leftJoin: any;
            leftOuterJoin: any;
            innerJoin: any;
            rightJoin: any;
            rightOuterJoin: any;
            groupBy: (columns: any) => {
                execute: () => Promise<any>;
                having: (...conditions: any[]) => {
                    execute: () => Promise<any>;
                    definition: () => any[];
                    raw: (sql: any, ...args: any[]) => string;
                    orderBy: (...columns: any[]) => {
                        execute: () => Promise<any>;
                        raw: (sql: any, ...args: any[]) => string;
                    } | {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    limit: (limit: any) => {
                        execute: () => Promise<any>;
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    offset: (offset: any) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    literal: (sql: any, args?: any[]) => any;
                };
                limit: (limit: any) => {
                    execute: () => Promise<any>;
                    offset: (offset: any) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    definition: () => any[];
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                };
                offset: (offset: any) => {
                    execute: () => Promise<any>;
                    definition: () => any[];
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                };
                orderBy: (...columns: any[]) => {
                    execute: () => Promise<any>;
                    raw: (sql: any, ...args: any[]) => string;
                } | {
                    execute: () => Promise<any>;
                    definition: () => any[];
                    raw: (sql: any, ...args: any[]) => string;
                };
                literal: (sql: any, args?: any[]) => any;
                definition: () => any[];
                raw: (sql: any, ...args: any[]) => string;
            };
            limit: (limit: any) => {
                execute: () => Promise<any>;
                offset: (offset: any) => {
                    execute: () => Promise<any>;
                    definition: () => any[];
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                };
                definition: () => any[];
                literal: (sql: any, args?: any[]) => any;
                raw: (sql: any, ...args: any[]) => string;
            };
            offset: (offset: any) => {
                execute: () => Promise<any>;
                definition: () => any[];
                literal: (sql: any, args?: any[]) => any;
                raw: (sql: any, ...args: any[]) => string;
            };
            where: (...config: any[]) => {
                groupBy: (columns: any) => {
                    execute: () => Promise<any>;
                    having: (...conditions: any[]) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                        orderBy: (...columns: any[]) => {
                            execute: () => Promise<any>;
                            raw: (sql: any, ...args: any[]) => string;
                        } | {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        limit: (limit: any) => {
                            execute: () => Promise<any>;
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        literal: (sql: any, args?: any[]) => any;
                    };
                    limit: (limit: any) => {
                        execute: () => Promise<any>;
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    offset: (offset: any) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    orderBy: (...columns: any[]) => {
                        execute: () => Promise<any>;
                        raw: (sql: any, ...args: any[]) => string;
                    } | {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    literal: (sql: any, args?: any[]) => any;
                    definition: () => any[];
                    raw: (sql: any, ...args: any[]) => string;
                };
                limit: (limit: any) => {
                    execute: () => Promise<any>;
                    offset: (offset: any) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    definition: () => any[];
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                };
                offset: (offset: any) => {
                    execute: () => Promise<any>;
                    definition: () => any[];
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                };
                orderBy: (...columns: any[]) => {
                    execute: () => Promise<any>;
                    raw: (sql: any, ...args: any[]) => string;
                } | {
                    execute: () => Promise<any>;
                    definition: () => any[];
                    raw: (sql: any, ...args: any[]) => string;
                };
                raw: (sql: any, ...args: any[]) => string;
                execute: () => Promise<any>;
                definition: () => any[];
                literal: (sql: any, args?: any[]) => any;
            };
            orderBy: (...columns: any[]) => {
                execute: () => Promise<any>;
                raw: (sql: any, ...args: any[]) => string;
            } | {
                execute: () => Promise<any>;
                definition: () => any[];
                raw: (sql: any, ...args: any[]) => string;
            };
            literal: (sql: any, args?: any[]) => any;
            raw: (sql: any, ...args: any[]) => string;
            definition: () => any[];
        };
    };
    __join(joinType: any, from_schema: any, from_table: any, from_column: any, from_alias: any, to_schema: any, to_table: any, to_column: any, to_alias: any, operator: any, extra: any): string;
    __groupBy(previousSql: any, canExecute: any): (columns: any) => {
        execute: () => Promise<any>;
        having: (...conditions: any[]) => {
            execute: () => Promise<any>;
            definition: () => any[];
            raw: (sql: any, ...args: any[]) => string;
            orderBy: (...columns: any[]) => {
                execute: () => Promise<any>;
                raw: (sql: any, ...args: any[]) => string;
            } | {
                execute: () => Promise<any>;
                definition: () => any[];
                raw: (sql: any, ...args: any[]) => string;
            };
            limit: (limit: any) => {
                execute: () => Promise<any>;
                offset: (offset: any) => {
                    execute: () => Promise<any>;
                    definition: () => any[];
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                };
                definition: () => any[];
                literal: (sql: any, args?: any[]) => any;
                raw: (sql: any, ...args: any[]) => string;
            };
            offset: (offset: any) => {
                execute: () => Promise<any>;
                definition: () => any[];
                literal: (sql: any, args?: any[]) => any;
                raw: (sql: any, ...args: any[]) => string;
            };
            literal: (sql: any, args?: any[]) => any;
        };
        limit: (limit: any) => {
            execute: () => Promise<any>;
            offset: (offset: any) => {
                execute: () => Promise<any>;
                definition: () => any[];
                literal: (sql: any, args?: any[]) => any;
                raw: (sql: any, ...args: any[]) => string;
            };
            definition: () => any[];
            literal: (sql: any, args?: any[]) => any;
            raw: (sql: any, ...args: any[]) => string;
        };
        offset: (offset: any) => {
            execute: () => Promise<any>;
            definition: () => any[];
            literal: (sql: any, args?: any[]) => any;
            raw: (sql: any, ...args: any[]) => string;
        };
        orderBy: (...columns: any[]) => {
            execute: () => Promise<any>;
            raw: (sql: any, ...args: any[]) => string;
        } | {
            execute: () => Promise<any>;
            definition: () => any[];
            raw: (sql: any, ...args: any[]) => string;
        };
        literal: (sql: any, args?: any[]) => any;
        definition: () => any[];
        raw: (sql: any, ...args: any[]) => string;
    };
    __limit(previousSQL: any, canExecute: any): (limit: any) => {
        execute: () => Promise<any>;
        offset: (offset: any) => {
            execute: () => Promise<any>;
            definition: () => any[];
            literal: (sql: any, args?: any[]) => any;
            raw: (sql: any, ...args: any[]) => string;
        };
        definition: () => any[];
        literal: (sql: any, args?: any[]) => any;
        raw: (sql: any, ...args: any[]) => string;
    };
    __offset(previousSQL: any, canExecute: any): (offset: any) => {
        execute: () => Promise<any>;
        definition: () => any[];
        literal: (sql: any, args?: any[]) => any;
        raw: (sql: any, ...args: any[]) => string;
    };
    __having(previousSQL: any, canExecute: any): (...conditions: any[]) => {
        execute: () => Promise<any>;
        definition: () => any[];
        raw: (sql: any, ...args: any[]) => string;
        orderBy: (...columns: any[]) => {
            execute: () => Promise<any>;
            raw: (sql: any, ...args: any[]) => string;
        } | {
            execute: () => Promise<any>;
            definition: () => any[];
            raw: (sql: any, ...args: any[]) => string;
        };
        limit: (limit: any) => {
            execute: () => Promise<any>;
            offset: (offset: any) => {
                execute: () => Promise<any>;
                definition: () => any[];
                literal: (sql: any, args?: any[]) => any;
                raw: (sql: any, ...args: any[]) => string;
            };
            definition: () => any[];
            literal: (sql: any, args?: any[]) => any;
            raw: (sql: any, ...args: any[]) => string;
        };
        offset: (offset: any) => {
            execute: () => Promise<any>;
            definition: () => any[];
            literal: (sql: any, args?: any[]) => any;
            raw: (sql: any, ...args: any[]) => string;
        };
        literal: (sql: any, args?: any[]) => any;
    };
    __where(previousSQL: any, schema: any, table: any, alias: any, canExecute?: boolean): (...config: any[]) => {
        groupBy: (columns: any) => {
            execute: () => Promise<any>;
            having: (...conditions: any[]) => {
                execute: () => Promise<any>;
                definition: () => any[];
                raw: (sql: any, ...args: any[]) => string;
                orderBy: (...columns: any[]) => {
                    execute: () => Promise<any>;
                    raw: (sql: any, ...args: any[]) => string;
                } | {
                    execute: () => Promise<any>;
                    definition: () => any[];
                    raw: (sql: any, ...args: any[]) => string;
                };
                limit: (limit: any) => {
                    execute: () => Promise<any>;
                    offset: (offset: any) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    definition: () => any[];
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                };
                offset: (offset: any) => {
                    execute: () => Promise<any>;
                    definition: () => any[];
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                };
                literal: (sql: any, args?: any[]) => any;
            };
            limit: (limit: any) => {
                execute: () => Promise<any>;
                offset: (offset: any) => {
                    execute: () => Promise<any>;
                    definition: () => any[];
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                };
                definition: () => any[];
                literal: (sql: any, args?: any[]) => any;
                raw: (sql: any, ...args: any[]) => string;
            };
            offset: (offset: any) => {
                execute: () => Promise<any>;
                definition: () => any[];
                literal: (sql: any, args?: any[]) => any;
                raw: (sql: any, ...args: any[]) => string;
            };
            orderBy: (...columns: any[]) => {
                execute: () => Promise<any>;
                raw: (sql: any, ...args: any[]) => string;
            } | {
                execute: () => Promise<any>;
                definition: () => any[];
                raw: (sql: any, ...args: any[]) => string;
            };
            literal: (sql: any, args?: any[]) => any;
            definition: () => any[];
            raw: (sql: any, ...args: any[]) => string;
        };
        limit: (limit: any) => {
            execute: () => Promise<any>;
            offset: (offset: any) => {
                execute: () => Promise<any>;
                definition: () => any[];
                literal: (sql: any, args?: any[]) => any;
                raw: (sql: any, ...args: any[]) => string;
            };
            definition: () => any[];
            literal: (sql: any, args?: any[]) => any;
            raw: (sql: any, ...args: any[]) => string;
        };
        offset: (offset: any) => {
            execute: () => Promise<any>;
            definition: () => any[];
            literal: (sql: any, args?: any[]) => any;
            raw: (sql: any, ...args: any[]) => string;
        };
        orderBy: (...columns: any[]) => {
            execute: () => Promise<any>;
            raw: (sql: any, ...args: any[]) => string;
        } | {
            execute: () => Promise<any>;
            definition: () => any[];
            raw: (sql: any, ...args: any[]) => string;
        };
        raw: (sql: any, ...args: any[]) => string;
        execute: () => Promise<any>;
        definition: () => any[];
        literal: (sql: any, args?: any[]) => any;
    };
    __whereStatement(previousSQL: any, schema: any, table: any, alias: any, canExecute?: boolean): (...config: any[]) => {
        returning: (...columns: any[]) => {
            raw: (sql: any, ...args: any[]) => string;
            execute: () => Promise<any>;
            definition: () => any[];
        };
        execute: () => Promise<any>;
        definition: () => any[];
        raw: (sql: any, ...args: any[]) => string;
    };
    __orderBy(previousSQL: any, canExecute?: boolean): (...columns: any[]) => {
        execute: () => Promise<any>;
        raw: (sql: any, ...args: any[]) => string;
    } | {
        execute: () => Promise<any>;
        definition: () => any[];
        raw: (sql: any, ...args: any[]) => string;
    };
    insert(table: any, schema: any): {
        values: (...input: any[]) => {
            definition: () => any[];
            raw?: undefined;
            onConflict?: undefined;
            returning?: undefined;
            execute?: undefined;
        } | {
            raw: (sql: any, ...args: any[]) => string;
            onConflict: (...constraints: any[]) => {
                returning: (...columns: any[]) => {
                    raw: (sql: any, ...args: any[]) => string;
                    execute: () => Promise<any>;
                    definition: () => any[];
                };
                execute: () => Promise<any>;
                definition: () => any[];
                raw?: undefined;
                ignore?: undefined;
                update?: undefined;
            } | {
                raw: (sql: any, ...args: any[]) => string;
                ignore: () => {
                    raw: (sql: any, ...args: any[]) => string;
                    returning: (...columns: any[]) => {
                        raw: (sql: any, ...args: any[]) => string;
                        execute: () => Promise<any>;
                        definition: () => any[];
                    };
                    execute: () => Promise<any>;
                    definition: () => any[];
                };
                update: (update: any) => {
                    raw: (sql: any, ...args: any[]) => string;
                    returning: (...columns: any[]) => {
                        raw: (sql: any, ...args: any[]) => string;
                        execute: () => Promise<any>;
                        definition: () => any[];
                    };
                    execute: () => Promise<any>;
                    definition: () => any[];
                };
                definition: () => any[];
                returning?: undefined;
                execute?: undefined;
            };
            returning: (...columns: any[]) => {
                raw: (sql: any, ...args: any[]) => string;
                execute: () => Promise<any>;
                definition: () => any[];
            };
            execute: () => Promise<any>;
            definition: () => any[];
        };
    };
    __insert_values(previousSQL: any): (...input: any[]) => {
        definition: () => any[];
        raw?: undefined;
        onConflict?: undefined;
        returning?: undefined;
        execute?: undefined;
    } | {
        raw: (sql: any, ...args: any[]) => string;
        onConflict: (...constraints: any[]) => {
            returning: (...columns: any[]) => {
                raw: (sql: any, ...args: any[]) => string;
                execute: () => Promise<any>;
                definition: () => any[];
            };
            execute: () => Promise<any>;
            definition: () => any[];
            raw?: undefined;
            ignore?: undefined;
            update?: undefined;
        } | {
            raw: (sql: any, ...args: any[]) => string;
            ignore: () => {
                raw: (sql: any, ...args: any[]) => string;
                returning: (...columns: any[]) => {
                    raw: (sql: any, ...args: any[]) => string;
                    execute: () => Promise<any>;
                    definition: () => any[];
                };
                execute: () => Promise<any>;
                definition: () => any[];
            };
            update: (update: any) => {
                raw: (sql: any, ...args: any[]) => string;
                returning: (...columns: any[]) => {
                    raw: (sql: any, ...args: any[]) => string;
                    execute: () => Promise<any>;
                    definition: () => any[];
                };
                execute: () => Promise<any>;
                definition: () => any[];
            };
            definition: () => any[];
            returning?: undefined;
            execute?: undefined;
        };
        returning: (...columns: any[]) => {
            raw: (sql: any, ...args: any[]) => string;
            execute: () => Promise<any>;
            definition: () => any[];
        };
        execute: () => Promise<any>;
        definition: () => any[];
    };
    __onConflictInsert(previousSQL: any): (...constraints: any[]) => {
        returning: (...columns: any[]) => {
            raw: (sql: any, ...args: any[]) => string;
            execute: () => Promise<any>;
            definition: () => any[];
        };
        execute: () => Promise<any>;
        definition: () => any[];
        raw?: undefined;
        ignore?: undefined;
        update?: undefined;
    } | {
        raw: (sql: any, ...args: any[]) => string;
        ignore: () => {
            raw: (sql: any, ...args: any[]) => string;
            returning: (...columns: any[]) => {
                raw: (sql: any, ...args: any[]) => string;
                execute: () => Promise<any>;
                definition: () => any[];
            };
            execute: () => Promise<any>;
            definition: () => any[];
        };
        update: (update: any) => {
            raw: (sql: any, ...args: any[]) => string;
            returning: (...columns: any[]) => {
                raw: (sql: any, ...args: any[]) => string;
                execute: () => Promise<any>;
                definition: () => any[];
            };
            execute: () => Promise<any>;
            definition: () => any[];
        };
        definition: () => any[];
        returning?: undefined;
        execute?: undefined;
    };
    __ignoreInsert(previousSQL: any): () => {
        raw: (sql: any, ...args: any[]) => string;
        returning: (...columns: any[]) => {
            raw: (sql: any, ...args: any[]) => string;
            execute: () => Promise<any>;
            definition: () => any[];
        };
        execute: () => Promise<any>;
        definition: () => any[];
    };
    __updateInsert(previousSQL: any): (update: any) => {
        raw: (sql: any, ...args: any[]) => string;
        returning: (...columns: any[]) => {
            raw: (sql: any, ...args: any[]) => string;
            execute: () => Promise<any>;
            definition: () => any[];
        };
        execute: () => Promise<any>;
        definition: () => any[];
    };
    __returning(previousSQL: any): (...columns: any[]) => {
        raw: (sql: any, ...args: any[]) => string;
        execute: () => Promise<any>;
        definition: () => any[];
    };
    __literal(previousSQL: any, next: any, canExecute: any): (sql: any, args?: any[]) => any;
    update(table: any, schema: any): {
        set: (input: any) => {
            definition: () => any[];
            execute: () => Promise<any>;
            returning: (...columns: any[]) => {
                raw: (sql: any, ...args: any[]) => string;
                execute: () => Promise<any>;
                definition: () => any[];
            };
            where: (...config: any[]) => {
                returning: (...columns: any[]) => {
                    raw: (sql: any, ...args: any[]) => string;
                    execute: () => Promise<any>;
                    definition: () => any[];
                };
                execute: () => Promise<any>;
                definition: () => any[];
                raw: (sql: any, ...args: any[]) => string;
            };
        };
    };
    __updateSet(previousSQL: any): (input: any) => {
        definition: () => any[];
        execute: () => Promise<any>;
        returning: (...columns: any[]) => {
            raw: (sql: any, ...args: any[]) => string;
            execute: () => Promise<any>;
            definition: () => any[];
        };
        where: (...config: any[]) => {
            returning: (...columns: any[]) => {
                raw: (sql: any, ...args: any[]) => string;
                execute: () => Promise<any>;
                definition: () => any[];
            };
            execute: () => Promise<any>;
            definition: () => any[];
            raw: (sql: any, ...args: any[]) => string;
        };
    };
    delete(table: any, schema: any): {
        where: (...config: any[]) => {
            returning: (...columns: any[]) => {
                raw: (sql: any, ...args: any[]) => string;
                execute: () => Promise<any>;
                definition: () => any[];
            };
            execute: () => Promise<any>;
            definition: () => any[];
            raw: (sql: any, ...args: any[]) => string;
        };
        returning: (...columns: any[]) => {
            raw: (sql: any, ...args: any[]) => string;
            execute: () => Promise<any>;
            definition: () => any[];
        };
    };
    __toSQL(previousSQL: any): () => any[];
    __exec(previousSQL: any): () => Promise<any>;
    __makeColumns(columns: any, table: any, alias: any): string;
    __columnsInputIsEligible(columns: any): number | boolean;
    valueLiteral: typeof valueLiteral;
    column: typeof column;
    eq: typeof eq;
    neq: typeof neq;
    lt: typeof lt;
    lte: typeof lte;
    gt: typeof gt;
    gte: typeof gte;
    and: typeof and;
    or: typeof or;
    asc: typeof asc;
    desc: typeof desc;
    asc_nulls_first: typeof asc_nulls_first;
    asc_nulls_last: typeof asc_nulls_last;
    desc_nulls_first: typeof desc_nulls_first;
    desc_nulls_last: typeof desc_nulls_last;
    isNull: typeof isNull;
    isNotNull: typeof isNotNull;
    rawCondition: typeof rawCondition;
    inArray: typeof inArray;
    notInArray: typeof notInArray;
    inSelect: typeof inSelect;
    notInSelect: typeof notInSelect;
    excluded: typeof excluded;
    latest: typeof latest;
}
export class BaseSQL {
    constructor(client: any);
    builder: Builder;
    with(sql: any): {
        as: (alias: any) => {
            definition: () => any[];
            raw: (sql: any, ...args: any[]) => string;
            with: (sql: any) => {
                as: any;
            };
            select: any;
            delete: any;
            update: any;
            insert: any;
        };
    };
}
export class Query extends BaseSQL {
    constructor(client: any);
    select(columns: any): {
        from: (table: any, alias: any, schema: any) => {
            execute: () => Promise<any>;
            leftJoin: (table: any, column: any, alias: any, schema: any) => {
                on: (table: any, column: any, alias: any, schema: any) => {
                    execute: () => Promise<any>;
                    leftJoin: any;
                    leftOuterJoin: any;
                    innerJoin: any;
                    rightJoin: any;
                    rightOuterJoin: any;
                    groupBy: (columns: any) => {
                        execute: () => Promise<any>;
                        having: (...conditions: any[]) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                            orderBy: (...columns: any[]) => {
                                execute: () => Promise<any>;
                                raw: (sql: any, ...args: any[]) => string;
                            } | {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            limit: (limit: any) => {
                                execute: () => Promise<any>;
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            literal: (sql: any, args?: any[]) => any;
                        };
                        limit: (limit: any) => {
                            execute: () => Promise<any>;
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        orderBy: (...columns: any[]) => {
                            execute: () => Promise<any>;
                            raw: (sql: any, ...args: any[]) => string;
                        } | {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        literal: (sql: any, args?: any[]) => any;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    limit: (limit: any) => {
                        execute: () => Promise<any>;
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    offset: (offset: any) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    where: (...config: any[]) => {
                        groupBy: (columns: any) => {
                            execute: () => Promise<any>;
                            having: (...conditions: any[]) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                                orderBy: (...columns: any[]) => {
                                    execute: () => Promise<any>;
                                    raw: (sql: any, ...args: any[]) => string;
                                } | {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                limit: (limit: any) => {
                                    execute: () => Promise<any>;
                                    offset: (offset: any) => {
                                        execute: () => Promise<any>;
                                        definition: () => any[];
                                        literal: (sql: any, args?: any[]) => any;
                                        raw: (sql: any, ...args: any[]) => string;
                                    };
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                literal: (sql: any, args?: any[]) => any;
                            };
                            limit: (limit: any) => {
                                execute: () => Promise<any>;
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            orderBy: (...columns: any[]) => {
                                execute: () => Promise<any>;
                                raw: (sql: any, ...args: any[]) => string;
                            } | {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            literal: (sql: any, args?: any[]) => any;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        limit: (limit: any) => {
                            execute: () => Promise<any>;
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        orderBy: (...columns: any[]) => {
                            execute: () => Promise<any>;
                            raw: (sql: any, ...args: any[]) => string;
                        } | {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        raw: (sql: any, ...args: any[]) => string;
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                    };
                    orderBy: (...columns: any[]) => {
                        execute: () => Promise<any>;
                        raw: (sql: any, ...args: any[]) => string;
                    } | {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                    definition: () => any[];
                };
            };
            leftOuterJoin: (table: any, column: any, alias: any, schema: any) => {
                on: (table: any, column: any, alias: any, schema: any) => {
                    execute: () => Promise<any>;
                    leftJoin: any;
                    leftOuterJoin: any;
                    innerJoin: any;
                    rightJoin: any;
                    rightOuterJoin: any;
                    groupBy: (columns: any) => {
                        execute: () => Promise<any>;
                        having: (...conditions: any[]) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                            orderBy: (...columns: any[]) => {
                                execute: () => Promise<any>;
                                raw: (sql: any, ...args: any[]) => string;
                            } | {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            limit: (limit: any) => {
                                execute: () => Promise<any>;
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            literal: (sql: any, args?: any[]) => any;
                        };
                        limit: (limit: any) => {
                            execute: () => Promise<any>;
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        orderBy: (...columns: any[]) => {
                            execute: () => Promise<any>;
                            raw: (sql: any, ...args: any[]) => string;
                        } | {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        literal: (sql: any, args?: any[]) => any;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    limit: (limit: any) => {
                        execute: () => Promise<any>;
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    offset: (offset: any) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    where: (...config: any[]) => {
                        groupBy: (columns: any) => {
                            execute: () => Promise<any>;
                            having: (...conditions: any[]) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                                orderBy: (...columns: any[]) => {
                                    execute: () => Promise<any>;
                                    raw: (sql: any, ...args: any[]) => string;
                                } | {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                limit: (limit: any) => {
                                    execute: () => Promise<any>;
                                    offset: (offset: any) => {
                                        execute: () => Promise<any>;
                                        definition: () => any[];
                                        literal: (sql: any, args?: any[]) => any;
                                        raw: (sql: any, ...args: any[]) => string;
                                    };
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                literal: (sql: any, args?: any[]) => any;
                            };
                            limit: (limit: any) => {
                                execute: () => Promise<any>;
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            orderBy: (...columns: any[]) => {
                                execute: () => Promise<any>;
                                raw: (sql: any, ...args: any[]) => string;
                            } | {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            literal: (sql: any, args?: any[]) => any;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        limit: (limit: any) => {
                            execute: () => Promise<any>;
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        orderBy: (...columns: any[]) => {
                            execute: () => Promise<any>;
                            raw: (sql: any, ...args: any[]) => string;
                        } | {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        raw: (sql: any, ...args: any[]) => string;
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                    };
                    orderBy: (...columns: any[]) => {
                        execute: () => Promise<any>;
                        raw: (sql: any, ...args: any[]) => string;
                    } | {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                    definition: () => any[];
                };
            };
            innerJoin: (table: any, column: any, alias: any, schema: any) => {
                on: (table: any, column: any, alias: any, schema: any) => {
                    execute: () => Promise<any>;
                    leftJoin: any;
                    leftOuterJoin: any;
                    innerJoin: any;
                    rightJoin: any;
                    rightOuterJoin: any;
                    groupBy: (columns: any) => {
                        execute: () => Promise<any>;
                        having: (...conditions: any[]) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                            orderBy: (...columns: any[]) => {
                                execute: () => Promise<any>;
                                raw: (sql: any, ...args: any[]) => string;
                            } | {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            limit: (limit: any) => {
                                execute: () => Promise<any>;
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            literal: (sql: any, args?: any[]) => any;
                        };
                        limit: (limit: any) => {
                            execute: () => Promise<any>;
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        orderBy: (...columns: any[]) => {
                            execute: () => Promise<any>;
                            raw: (sql: any, ...args: any[]) => string;
                        } | {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        literal: (sql: any, args?: any[]) => any;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    limit: (limit: any) => {
                        execute: () => Promise<any>;
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    offset: (offset: any) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    where: (...config: any[]) => {
                        groupBy: (columns: any) => {
                            execute: () => Promise<any>;
                            having: (...conditions: any[]) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                                orderBy: (...columns: any[]) => {
                                    execute: () => Promise<any>;
                                    raw: (sql: any, ...args: any[]) => string;
                                } | {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                limit: (limit: any) => {
                                    execute: () => Promise<any>;
                                    offset: (offset: any) => {
                                        execute: () => Promise<any>;
                                        definition: () => any[];
                                        literal: (sql: any, args?: any[]) => any;
                                        raw: (sql: any, ...args: any[]) => string;
                                    };
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                literal: (sql: any, args?: any[]) => any;
                            };
                            limit: (limit: any) => {
                                execute: () => Promise<any>;
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            orderBy: (...columns: any[]) => {
                                execute: () => Promise<any>;
                                raw: (sql: any, ...args: any[]) => string;
                            } | {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            literal: (sql: any, args?: any[]) => any;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        limit: (limit: any) => {
                            execute: () => Promise<any>;
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        orderBy: (...columns: any[]) => {
                            execute: () => Promise<any>;
                            raw: (sql: any, ...args: any[]) => string;
                        } | {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        raw: (sql: any, ...args: any[]) => string;
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                    };
                    orderBy: (...columns: any[]) => {
                        execute: () => Promise<any>;
                        raw: (sql: any, ...args: any[]) => string;
                    } | {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                    definition: () => any[];
                };
            };
            rightJoin: (table: any, column: any, alias: any, schema: any) => {
                on: (table: any, column: any, alias: any, schema: any) => {
                    execute: () => Promise<any>;
                    leftJoin: any;
                    leftOuterJoin: any;
                    innerJoin: any;
                    rightJoin: any;
                    rightOuterJoin: any;
                    groupBy: (columns: any) => {
                        execute: () => Promise<any>;
                        having: (...conditions: any[]) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                            orderBy: (...columns: any[]) => {
                                execute: () => Promise<any>;
                                raw: (sql: any, ...args: any[]) => string;
                            } | {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            limit: (limit: any) => {
                                execute: () => Promise<any>;
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            literal: (sql: any, args?: any[]) => any;
                        };
                        limit: (limit: any) => {
                            execute: () => Promise<any>;
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        orderBy: (...columns: any[]) => {
                            execute: () => Promise<any>;
                            raw: (sql: any, ...args: any[]) => string;
                        } | {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        literal: (sql: any, args?: any[]) => any;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    limit: (limit: any) => {
                        execute: () => Promise<any>;
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    offset: (offset: any) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    where: (...config: any[]) => {
                        groupBy: (columns: any) => {
                            execute: () => Promise<any>;
                            having: (...conditions: any[]) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                                orderBy: (...columns: any[]) => {
                                    execute: () => Promise<any>;
                                    raw: (sql: any, ...args: any[]) => string;
                                } | {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                limit: (limit: any) => {
                                    execute: () => Promise<any>;
                                    offset: (offset: any) => {
                                        execute: () => Promise<any>;
                                        definition: () => any[];
                                        literal: (sql: any, args?: any[]) => any;
                                        raw: (sql: any, ...args: any[]) => string;
                                    };
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                literal: (sql: any, args?: any[]) => any;
                            };
                            limit: (limit: any) => {
                                execute: () => Promise<any>;
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            orderBy: (...columns: any[]) => {
                                execute: () => Promise<any>;
                                raw: (sql: any, ...args: any[]) => string;
                            } | {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            literal: (sql: any, args?: any[]) => any;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        limit: (limit: any) => {
                            execute: () => Promise<any>;
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        orderBy: (...columns: any[]) => {
                            execute: () => Promise<any>;
                            raw: (sql: any, ...args: any[]) => string;
                        } | {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        raw: (sql: any, ...args: any[]) => string;
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                    };
                    orderBy: (...columns: any[]) => {
                        execute: () => Promise<any>;
                        raw: (sql: any, ...args: any[]) => string;
                    } | {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                    definition: () => any[];
                };
            };
            rightOuterJoin: (table: any, column: any, alias: any, schema: any) => {
                on: (table: any, column: any, alias: any, schema: any) => {
                    execute: () => Promise<any>;
                    leftJoin: any;
                    leftOuterJoin: any;
                    innerJoin: any;
                    rightJoin: any;
                    rightOuterJoin: any;
                    groupBy: (columns: any) => {
                        execute: () => Promise<any>;
                        having: (...conditions: any[]) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                            orderBy: (...columns: any[]) => {
                                execute: () => Promise<any>;
                                raw: (sql: any, ...args: any[]) => string;
                            } | {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            limit: (limit: any) => {
                                execute: () => Promise<any>;
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            literal: (sql: any, args?: any[]) => any;
                        };
                        limit: (limit: any) => {
                            execute: () => Promise<any>;
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        orderBy: (...columns: any[]) => {
                            execute: () => Promise<any>;
                            raw: (sql: any, ...args: any[]) => string;
                        } | {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        literal: (sql: any, args?: any[]) => any;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    limit: (limit: any) => {
                        execute: () => Promise<any>;
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    offset: (offset: any) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    where: (...config: any[]) => {
                        groupBy: (columns: any) => {
                            execute: () => Promise<any>;
                            having: (...conditions: any[]) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                                orderBy: (...columns: any[]) => {
                                    execute: () => Promise<any>;
                                    raw: (sql: any, ...args: any[]) => string;
                                } | {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                limit: (limit: any) => {
                                    execute: () => Promise<any>;
                                    offset: (offset: any) => {
                                        execute: () => Promise<any>;
                                        definition: () => any[];
                                        literal: (sql: any, args?: any[]) => any;
                                        raw: (sql: any, ...args: any[]) => string;
                                    };
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                literal: (sql: any, args?: any[]) => any;
                            };
                            limit: (limit: any) => {
                                execute: () => Promise<any>;
                                offset: (offset: any) => {
                                    execute: () => Promise<any>;
                                    definition: () => any[];
                                    literal: (sql: any, args?: any[]) => any;
                                    raw: (sql: any, ...args: any[]) => string;
                                };
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            orderBy: (...columns: any[]) => {
                                execute: () => Promise<any>;
                                raw: (sql: any, ...args: any[]) => string;
                            } | {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            literal: (sql: any, args?: any[]) => any;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        limit: (limit: any) => {
                            execute: () => Promise<any>;
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        orderBy: (...columns: any[]) => {
                            execute: () => Promise<any>;
                            raw: (sql: any, ...args: any[]) => string;
                        } | {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        raw: (sql: any, ...args: any[]) => string;
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                    };
                    orderBy: (...columns: any[]) => {
                        execute: () => Promise<any>;
                        raw: (sql: any, ...args: any[]) => string;
                    } | {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                    definition: () => any[];
                };
            };
            groupBy: (columns: any) => {
                execute: () => Promise<any>;
                having: (...conditions: any[]) => {
                    execute: () => Promise<any>;
                    definition: () => any[];
                    raw: (sql: any, ...args: any[]) => string;
                    orderBy: (...columns: any[]) => {
                        execute: () => Promise<any>;
                        raw: (sql: any, ...args: any[]) => string;
                    } | {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    limit: (limit: any) => {
                        execute: () => Promise<any>;
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    offset: (offset: any) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    literal: (sql: any, args?: any[]) => any;
                };
                limit: (limit: any) => {
                    execute: () => Promise<any>;
                    offset: (offset: any) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    definition: () => any[];
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                };
                offset: (offset: any) => {
                    execute: () => Promise<any>;
                    definition: () => any[];
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                };
                orderBy: (...columns: any[]) => {
                    execute: () => Promise<any>;
                    raw: (sql: any, ...args: any[]) => string;
                } | {
                    execute: () => Promise<any>;
                    definition: () => any[];
                    raw: (sql: any, ...args: any[]) => string;
                };
                literal: (sql: any, args?: any[]) => any;
                definition: () => any[];
                raw: (sql: any, ...args: any[]) => string;
            };
            limit: (limit: any) => {
                execute: () => Promise<any>;
                offset: (offset: any) => {
                    execute: () => Promise<any>;
                    definition: () => any[];
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                };
                definition: () => any[];
                literal: (sql: any, args?: any[]) => any;
                raw: (sql: any, ...args: any[]) => string;
            };
            offset: (offset: any) => {
                execute: () => Promise<any>;
                definition: () => any[];
                literal: (sql: any, args?: any[]) => any;
                raw: (sql: any, ...args: any[]) => string;
            };
            where: (...config: any[]) => {
                groupBy: (columns: any) => {
                    execute: () => Promise<any>;
                    having: (...conditions: any[]) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                        orderBy: (...columns: any[]) => {
                            execute: () => Promise<any>;
                            raw: (sql: any, ...args: any[]) => string;
                        } | {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        limit: (limit: any) => {
                            execute: () => Promise<any>;
                            offset: (offset: any) => {
                                execute: () => Promise<any>;
                                definition: () => any[];
                                literal: (sql: any, args?: any[]) => any;
                                raw: (sql: any, ...args: any[]) => string;
                            };
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        literal: (sql: any, args?: any[]) => any;
                    };
                    limit: (limit: any) => {
                        execute: () => Promise<any>;
                        offset: (offset: any) => {
                            execute: () => Promise<any>;
                            definition: () => any[];
                            literal: (sql: any, args?: any[]) => any;
                            raw: (sql: any, ...args: any[]) => string;
                        };
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    offset: (offset: any) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    orderBy: (...columns: any[]) => {
                        execute: () => Promise<any>;
                        raw: (sql: any, ...args: any[]) => string;
                    } | {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    literal: (sql: any, args?: any[]) => any;
                    definition: () => any[];
                    raw: (sql: any, ...args: any[]) => string;
                };
                limit: (limit: any) => {
                    execute: () => Promise<any>;
                    offset: (offset: any) => {
                        execute: () => Promise<any>;
                        definition: () => any[];
                        literal: (sql: any, args?: any[]) => any;
                        raw: (sql: any, ...args: any[]) => string;
                    };
                    definition: () => any[];
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                };
                offset: (offset: any) => {
                    execute: () => Promise<any>;
                    definition: () => any[];
                    literal: (sql: any, args?: any[]) => any;
                    raw: (sql: any, ...args: any[]) => string;
                };
                orderBy: (...columns: any[]) => {
                    execute: () => Promise<any>;
                    raw: (sql: any, ...args: any[]) => string;
                } | {
                    execute: () => Promise<any>;
                    definition: () => any[];
                    raw: (sql: any, ...args: any[]) => string;
                };
                raw: (sql: any, ...args: any[]) => string;
                execute: () => Promise<any>;
                definition: () => any[];
                literal: (sql: any, args?: any[]) => any;
            };
            orderBy: (...columns: any[]) => {
                execute: () => Promise<any>;
                raw: (sql: any, ...args: any[]) => string;
            } | {
                execute: () => Promise<any>;
                definition: () => any[];
                raw: (sql: any, ...args: any[]) => string;
            };
            literal: (sql: any, args?: any[]) => any;
            raw: (sql: any, ...args: any[]) => string;
            definition: () => any[];
        };
    };
    subSelect(sql: any, alias: any): string;
}
export class Statement extends BaseSQL {
    constructor(client: any);
    insert(table: any, schema: any): {
        values: (...input: any[]) => {
            definition: () => any[];
            raw?: undefined;
            onConflict?: undefined;
            returning?: undefined;
            execute?: undefined;
        } | {
            raw: (sql: any, ...args: any[]) => string;
            onConflict: (...constraints: any[]) => {
                returning: (...columns: any[]) => {
                    raw: (sql: any, ...args: any[]) => string;
                    execute: () => Promise<any>;
                    definition: () => any[];
                };
                execute: () => Promise<any>;
                definition: () => any[];
                raw?: undefined;
                ignore?: undefined;
                update?: undefined;
            } | {
                raw: (sql: any, ...args: any[]) => string;
                ignore: () => {
                    raw: (sql: any, ...args: any[]) => string;
                    returning: (...columns: any[]) => {
                        raw: (sql: any, ...args: any[]) => string;
                        execute: () => Promise<any>;
                        definition: () => any[];
                    };
                    execute: () => Promise<any>;
                    definition: () => any[];
                };
                update: (update: any) => {
                    raw: (sql: any, ...args: any[]) => string;
                    returning: (...columns: any[]) => {
                        raw: (sql: any, ...args: any[]) => string;
                        execute: () => Promise<any>;
                        definition: () => any[];
                    };
                    execute: () => Promise<any>;
                    definition: () => any[];
                };
                definition: () => any[];
                returning?: undefined;
                execute?: undefined;
            };
            returning: (...columns: any[]) => {
                raw: (sql: any, ...args: any[]) => string;
                execute: () => Promise<any>;
                definition: () => any[];
            };
            execute: () => Promise<any>;
            definition: () => any[];
        };
    };
    update(table: any, schema: any): {
        set: (input: any) => {
            definition: () => any[];
            execute: () => Promise<any>;
            returning: (...columns: any[]) => {
                raw: (sql: any, ...args: any[]) => string;
                execute: () => Promise<any>;
                definition: () => any[];
            };
            where: (...config: any[]) => {
                returning: (...columns: any[]) => {
                    raw: (sql: any, ...args: any[]) => string;
                    execute: () => Promise<any>;
                    definition: () => any[];
                };
                execute: () => Promise<any>;
                definition: () => any[];
                raw: (sql: any, ...args: any[]) => string;
            };
        };
    };
    delete(table: any, schema: any): {
        where: (...config: any[]) => {
            returning: (...columns: any[]) => {
                raw: (sql: any, ...args: any[]) => string;
                execute: () => Promise<any>;
                definition: () => any[];
            };
            execute: () => Promise<any>;
            definition: () => any[];
            raw: (sql: any, ...args: any[]) => string;
        };
        returning: (...columns: any[]) => {
            raw: (sql: any, ...args: any[]) => string;
            execute: () => Promise<any>;
            definition: () => any[];
        };
    };
}
export function asc(entry: any): string;
export function asc_nulls_first(entry: any): string;
export function asc_nulls_last(entry: any): string;
export function desc(entry: any): string;
export function desc_nulls_first(entry: any): string;
export function desc_nulls_last(entry: any): string;
export function column(a: any, alias: any): {
    sql: string;
    $builderColumnEntry: boolean;
};
export function excluded(a: any): {
    sql: string;
    $isConflictingOperation: boolean;
};
export function latest(a: any): {
    sql: string;
    $isConflictingOperation: boolean;
};
export function eq(a: any, b: any): (binder: any) => any[];
export function neq(a: any, b: any): (binder: any) => any[];
export function lt(a: any, b: any): (binder: any) => any[];
export function lte(a: any, b: any): (binder: any) => any[];
export function gt(a: any, b: any): (binder: any) => any[];
export function gte(a: any, b: any): (binder: any) => any[];
export function isNull(a: any): (binder: any) => any[];
export function isNotNull(a: any): (binder: any) => any[];
export function inArray(column: any, ...queryArgs: any[]): (binder: any) => (string | any[])[];
export function notInArray(column: any, ...queryArgs: any[]): (binder: any) => (string | any[])[];
export function inSelect(column: any, b: any): (binder: any) => (string | any[])[];
export function notInSelect(a: any, b: any): (binder: any) => (string | any[])[];
export function rawCondition(sql: any, args?: any[]): (binder: any) => (string | any[])[];
export function and(...args: any[]): (binder: any, isFirstEntry?: boolean) => (string | any[])[];
export function or(...args: any[]): (binder: any, isFirstEntry?: boolean) => (string | any[])[];
export function valueLiteral(sql: any, args?: any[]): {
    $isUpdateLiteral: boolean;
    sql: any;
    args: any[];
};
