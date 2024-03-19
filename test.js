// // const DB = require("./db");
// // const Model = require("./model");
// // const Column = require("./column");

// const { Model } = require("./dist");

// // DB.registerDatabase("public");
// // DB.registerConnectionConfig({
// //   user: "postgres",
// //   database: "postgres",
// //   schema: "public",
// //   password: "postgres",
// //   port: 5432,
// //   host: "localhost",
// // });

// // DB.enableLog = true;
// // DB.enablePOSTGIS(true);

// class Globe extends Model {
//   constructor(conn) {
//     super("products", conn);
//   }

//   columns = {
//     id: new Column({
//       name: "id",
//       type: "uuid",
//       primary: true,
//       defaultValue: "gen_random_uuid()",
//     }),
//     name: new Column({
//       name: "name",
//       type: "text",
//     }),
//   };
// }

// // class Globe2 extends Model {
// //   constructor(conn) {
// //     super("products", conn);
// //   }
// const model = new Globe()
// const x = await model.update()
// //   columns = {
// //     id: new Column({
// //       name: "id",
// //       type: "uuid",
// //       primary: true,
// //       defaultValue: "gen_random_uuid()",
// //     }),
// //     name: new Column({
// //       name: "name",
// //       type: "text",
// //     }),
// //   };
// // }

// // DB.register(Globe);
// // DB.register(Globe2);
// // DB.enableLog = true;
