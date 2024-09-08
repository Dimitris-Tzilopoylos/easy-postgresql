// const { Model, DB, Column, Relation, SQL } = require("./dist");

// DB.registerConnectionConfig({
//   port: 5435,
//   database: "postgres",
//   host: "localhost",
//   max: 10,
//   min: 5,
//   user: "postgres",
//   password: "postgres",
//   schema: "public",
// });

// class User extends Model {
//   constructor(conn) {
//     super("users", conn, "public");
//   }

//   columns = {
//     id: new Column({
//       name: "id",
//       type: "uuid",
//     }),
//     name: new Column({
//       name: "name",
//       type: "text",
//     }),
//     role_id: new Column({
//       name: "role_id",
//       type: "uuid",
//     }),
//   };

//   relations = {
//     role: new Relation({
//       alias: "role",
//       from_table: "users",
//       from_column: "role_id",
//       to_table: "roles",
//       to_column: "id",
//       type: "object",
//       schema: "public",
//     }),
//   };
// }

// class Role extends Model {
//   constructor(conn) {
//     super("roles", conn, "public");
//   }

//   columns = {
//     id: new Column({
//       name: "id",
//       type: "uuid",
//     }),
//     name: new Column({
//       name: "name",
//       type: "text",
//     }),
//   };

//   relations = {
//     users: new Relation({
//       alias: "users",
//       to_table: "users",
//       to_column: "role_id",
//       from_table: "roles",
//       from_column: "id",
//       type: "array",
//       schema: "public",
//     }),
//   };
// }

// class SensorData extends Model {
//   constructor(conn) {
//     super("sensor_data", conn, "public");
//   }

//   columns = {
//     id: new Column({
//       name: "id",
//       type: "uuid",
//     }),
//     device_id: new Column({
//       name: "device_id",
//       type: "text",
//     }),
//     created_at: new Column({
//       name: "created_at",
//       type: "timestamptz",
//     }),
//   };

//   relations = {
//     users: new Relation({
//       alias: "users",
//       to_table: "users",
//       to_column: "role_id",
//       from_table: "roles",
//       from_column: "id",
//       type: "array",
//       schema: "public",
//     }),
//   };
// }

// DB.register(User);
// DB.register(Role);
// DB.enableLog = true;
// const mdl = new User();

// mdl
//   .select({
//     include: { role: true, role_aggregate: { _count: true } },
//   })
//   .then((res) => {
//     console.log(res);
//   });

// // role
// //   .find({
// //     include: {
// //       users_aggregate: {
// //         _count: true,
// //         _max: { name: true },
// //         where: {
// //           name: { _ilike: "" },
// //         },
// //       },
// //     },
// //     where: {
// //       name: { _ilike: "" },
// //     },
// //     groupBy: ["id", new SQL(() => "name")],
// //     orderBy: {
// //       test: new SQL((args) => [` %v = %v `, [1, 1]]),
// //       users_aggregate: { _count: "desc" },
// //       id: "asc",
// //     },
// //   })
// //   .then((res) => {
// //     console.log(JSON.stringify(res, null, 2));
// //   });
