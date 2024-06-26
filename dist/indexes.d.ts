export = Index;
declare class Index {
    constructor({ type, columns, auto_increment, table, onUpdate, onDelete }: {
        type: any;
        columns: any;
        auto_increment: any;
        table: any;
        onUpdate: any;
        onDelete: any;
    });
    type: any;
    columns: any;
    table: any;
    produceIndexCreateSQL(): {
        up: string;
        down: void;
    };
    produceCreatePrimaryKeySQL(): string;
    produceDropPrimaryKeySQL(): void;
    produceCreateForeignKeySQL(): void;
    productDropForeignKeySQL(): void;
}
