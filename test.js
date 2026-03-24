// const {
//   Column,
//   Model,
//   Relation,
//   DB,
//   JsonUpdateOperators,
//   JsonWhereClauseOperators,
//   sqlRaw,
// } = require("./dist");

// DB.registerConnectionConfig({
//   user: "postgres",
//   password: "postgres",
//   database: "postgres",
//   schema: "public",
//   port: 5440,
//   host: "localhost",
// });

// DB.enableLog = true;

// class Building extends Model {
//   constructor(conn) {
//     super("buildings", conn);
//   }

//   columns = {
//     id: new Column({
//       name: "id",
//       type: "text",
//       defaultValue: "gen_random_uuid()::text",
//       primary: true,
//     }),
//     name: new Column({
//       name: "name",
//       type: "text",
//       nullable: true,
//     }),
//     config: new Column({
//       name: "config",
//       type: "jsonb",
//       nullable: true,
//     }),
//   };

//   relations = {
//     spaces: new Relation({
//       alias: "spaces",
//       from_table: "buildings",
//       from_column: "id",
//       to_table: "spaces",
//       to_column: "building_id",
//       type: "array",
//     }),
//   };
// }

// class Sensor extends Model {
//   constructor(conn) {
//     super("sensors", conn);
//   }

//   columns = {
//     id: new Column({
//       name: "id",
//       type: "text",
//       defaultValue: "gen_random_uuid()::text",
//     }),
//     space_id: new Column({
//       name: "space_id",
//       type: "text",
//       nullable: false,
//     }),
//     building_id: new Column({
//       name: "building_id",
//       type: "text",
//       nullable: false,
//     }),
//     name: new Column({
//       name: "name",
//       type: "text",
//       nullable: true,
//     }),
//   };

//   relations = {
//     building: new Relation({
//       alias: "building",
//       to_table: "buildings",
//       to_column: "id",
//       from_table: "sensors",
//       from_column: "parent_id",
//       type: "object",
//     }),
//     space: new Relation({
//       alias: "space",
//       to_table: "spaces",
//       to_column: "id",
//       from_table: "sensors",
//       from_column: "parent_id",
//       type: "object",
//     }),
//   };
// }

// class Space extends Model {
//   constructor(conn) {
//     super("spaces", conn);
//   }

//   columns = {
//     id: new Column({
//       name: "id",
//       type: "text",
//       defaultValue: "gen_random_uuid()::text",
//     }),
//     name: new Column({
//       name: "name",
//       type: "text",
//       nullable: true,
//     }),
//     building_id: new Column({
//       name: "building_id",
//       type: "text",
//       nullable: false,
//     }),
//   };

//   relations = {
//     building: new Relation({
//       alias: "building",
//       to_table: "buildings",
//       to_column: "id",
//       from_table: "spaces",
//       from_column: "building_id",
//       type: "object",
//     }),
//     sensors: new Relation({
//       alias: "sensors",
//       to_table: "sensors",
//       to_column: ["space_id", "building_id"],
//       from_table: "spaces",
//       from_column: ["id", "building_id"],
//       type: "array",
//     }),
//   };
// }

// DB.register(Building);
// DB.register(Space);
// DB.register(Sensor);

// const b = new Building();

// const JSON_OPS_TEST_ROLLBACK = "JSONB operators test complete (intentional rollback)";

// /** Build SQL for every `json` (non-jsonb) operator without hitting the DB. */
// function runJsonTypeOperatorSmokeTests() {
//   const assertSql = (label, sqlInst) => {
//     const [str] = sqlInst.__getSQL({ index: 1 });
//     if (!str?.trim()) throw new Error(`sql smoke: empty fragment for ${label}`);
//   };

//   assertSql("unsetJson", JsonUpdateOperators.unsetJson("meta", "key"));
//   assertSql("equalsJson", JsonWhereClauseOperators.equalsJson("meta", "n", 1));
//   assertSql("notEqualsJson", JsonWhereClauseOperators.notEqualsJson("meta", "n", 2));
//   assertSql("greaterThanJson", JsonWhereClauseOperators.greaterThanJson("meta", "n", 0));
//   assertSql(
//     "greaterThanOrEqualJson",
//     JsonWhereClauseOperators.greaterThanOrEqualJson("meta", "n", 1),
//   );
//   assertSql("lessThanJson", JsonWhereClauseOperators.lessThanJson("meta", "n", 10));
//   assertSql(
//     "lessThanOrEqualJson",
//     JsonWhereClauseOperators.lessThanOrEqualJson("meta", "n", 5),
//   );
//   assertSql(
//     "containsJson",
//     JsonWhereClauseOperators.containsJson("meta", "keys", ["a", "b"]),
//   );
//   assertSql(
//     "containedInJson",
//     JsonWhereClauseOperators.containedInJson("meta", "arr", [1, 2, 3]),
//   );
// }

// // Sequence: smoke-test `json` operators, then exercise all JSONB paths in DB and rollback
// runJsonTypeOperatorSmokeTests();

// b.withTransaction(async () => {
//   // Ensure a row exists to operate on
//   const row = await b.insert({ name: "jsonb-ops-test" });
//   const id = sqlRaw((args) => {
//     return ["exists (SELECT id FROM buildings WHERE name = %v)", [row.name]];
//   });

//   // --- JSONB update operators ---
//   await b.update({
//     update: {
//       config: JsonUpdateOperators.setJsonb("config", "name", "test", true),
//     },
//     where: { id },
//   });

//   await b.update({
//     update: {
//       config: JsonUpdateOperators.mergeJsonb("config", {
//         tags: ["a"],
//         count: 0,
//         flag: false,
//       }),
//     },
//     where: { id },
//   });

//   await b.update({
//     update: {
//       config: JsonUpdateOperators.arrayAppendJsonb("config", "tags", "b"),
//     },
//     where: { id },
//   });

//   await b.update({
//     update: {
//       config: JsonUpdateOperators.arrayPrependJsonb("config", "tags", "z"),
//     },
//     where: { id },
//   });

//   await b.update({
//     update: {
//       config: JsonUpdateOperators.arrayMultiAppendJsonb("config", "tags", [
//         "c",
//         "d",
//       ]),
//     },
//     where: { id },
//   });

//   await b.update({
//     update: {
//       config: JsonUpdateOperators.arrayMultiPrependJsonb("config", "tags", [
//         "y",
//         "x",
//       ]),
//     },
//     where: { id },
//   });

//   await b.update({
//     update: {
//       config: JsonUpdateOperators.insertJsonb(
//         "config",
//         ["tags", "2"],
//         "inserted",
//         true,
//       ),
//     },
//     where: { id },
//   });

//   await b.update({
//     update: {
//       config: JsonUpdateOperators.counterJsonb("config", "count", 1),
//     },
//     where: { id },
//   });

//   await b.update({
//     update: {
//       config: JsonUpdateOperators.booleanToggleJsonb("config", "flag"),
//     },
//     where: { id },
//   });

//   await b.update({
//     update: {
//       config: JsonUpdateOperators.arrayRemoveAtJsonb("config", "tags", 0),
//     },
//     where: { id },
//   });

//   await b.update({
//     update: {
//       config: JsonUpdateOperators.unsetJsonb("config", "name"),
//     },
//     where: { id },
//   });

//   // --- JSONB where-clause operators (used in conditions) ---
//   await b.update({
//     update: { name: "after-equals" },
//     where: {
//       config: JsonWhereClauseOperators.equalsJsonb("config", "count", 1),
//     },
//   });

//   await b.update({
//     update: { name: "after-not-equals" },
//     where: {
//       config: JsonWhereClauseOperators.notEqualsJsonb("config", "flag", false),
//     },
//   });

//   await b.update({
//     update: { name: "after-gt" },
//     where: {
//       config: JsonWhereClauseOperators.greaterThanJsonb("config", "count", 0),
//     },
//   });

//   await b.update({
//     update: { name: "after-gte" },
//     where: {
//       config: JsonWhereClauseOperators.greaterThanOrEqualJsonb(
//         "config",
//         "count",
//         1,
//       ),
//     },
//   });

//   await b.update({
//     update: { name: "after-lt" },
//     where: {
//       config: JsonWhereClauseOperators.lessThanJsonb("config", "count", 10),
//     },
//   });

//   await b.update({
//     update: { name: "after-lte" },
//     where: {
//       config: JsonWhereClauseOperators.lessThanOrEqualJsonb(
//         "config",
//         "count",
//         1,
//       ),
//     },
//   });

//   await b.update({
//     update: { name: "after-contains" },
//     where: {
//       config: JsonWhereClauseOperators.containsJsonb("config", "tags", [
//         "a",
//         "b",
//       ]),
//     },
//   });

//   await b.update({
//     update: { name: "after-contained-in" },
//     where: {
//       config: JsonWhereClauseOperators.containedInJsonb("config", "tags", [
//         "a",
//         "b",
//         "c",
//         "d",
//         "z",
//         "y",
//         "x",
//         "inserted",
//       ]),
//     },
//   });

//   throw new Error(JSON_OPS_TEST_ROLLBACK);
// }).then((res) => {
//   // withTransaction catches failures and returns the Error (does not reject)
//   if (res instanceof Error) {
//     if (res.message === JSON_OPS_TEST_ROLLBACK) {
//       console.log(res.message);
//       process.exitCode = 0;
//       return;
//     }
//     console.error(res);
//     process.exitCode = 1;
//     return;
//   }
//   console.log(res);
//   process.exitCode = 0;
// });
