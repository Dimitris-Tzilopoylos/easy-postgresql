// const DB = require("./db");
// const Model = require("./model");
// const Column = require("./column");
// const Relation = require("./relation");

// DB.registerConnectionConfig({
//   schema: "public",
//   user: "postgres",
//   database: "postgres",
//   host: "localhost",
//   port: 5432,
//   password: "postgres",
// });

// class Product extends Model {
//   constructor(conn) {
//     super("products", conn);
//   }

//   columns = {
//     id: new Column({
//       name: "id",
//       type: "uuid",
//       nullable: false,
//       primary: true,
//       defaultValue: "gen_random_uuid()",
//     }),
//     name: new Column({
//       name: "name",
//       type: "varchar",
//       length: 255,
//       nullable: false,
//       unique: false,
//     }),
//     description: new Column({
//       name: "description",
//       type: "text",
//       nullable: true,
//     }),
//     created_at: new Column({
//       name: "created_at",
//       type: "timestamp",
//       nullable: false,
//       defaultValue: "now()",
//     }),
//     updated_at: new Column({
//       name: "updated_at",
//       type: "timestamp",
//       nullable: false,
//       defaultValue: "now()",
//     }),
//     enabled: new Column({
//       name: "enabled",
//       type: "boolean",
//       nullable: false,
//       defaultValue: false,
//     }),
//     image: new Column({
//       name: "image",
//       type: "varchar",
//       length: 255,
//       nullable: true,
//     }),
//     category_id: new Column({
//       name: "category_id",
//       type: "uuid",
//       nullable: true,
//     }),
//     user_id: new Column({
//       name: "user_id",
//       type: "uuid",
//       nullable: false,
//     }),
//     price: new Column({
//       name: "price",
//       type: "numeric(10,2)",
//       nullable: false,
//     }),
//     wholesale_price: new Column({
//       name: "wholesale_price",
//       type: "numeric(10,2)",
//       nullable: true,
//       defaultValue: 0,
//     }),
//     tax: new Column({
//       name: "tax",
//       type: "numeric(10,2)",
//       nullable: true,
//       defaultValue: 0,
//     }),
//     quantity: new Column({
//       name: "quantity",
//       type: "bigint",
//       nullable: false,
//     }),
//     images: new Column({
//       name: "images",
//       type: "varchar(255)[]",
//       defaultValue: "'{}'",
//       nullable: false,
//     }),
//     labels: new Column({
//       name: "labels",
//       type: "varchar(255)[]",
//       defaultValue: "'{}'",
//       nullable: false,
//     }),
//     sku: new Column({
//       name: "sku",
//       type: "varchar",
//       length: 255,
//       nullable: true,
//     }),
//     brand_id: new Column({
//       name: "brand_id",
//       type: "uuid",
//       nullable: true,
//     }),
//     weight: new Column({
//       name: "weight",
//       type: "double precision",
//       nullable: false,
//       defaultValue: 0,
//     }),
//     length: new Column({
//       name: "length",
//       type: "double precision",
//       nullable: false,
//       defaultValue: 0,
//     }),
//     width: new Column({
//       name: "width",
//       type: "double precision",
//       nullable: false,
//       defaultValue: 0,
//     }),
//     height: new Column({
//       name: "height",
//       type: "double precision",
//       nullable: false,
//       defaultValue: 0,
//     }),
//     discount: new Column({
//       name: "discount",
//       type: "double precision",
//       nullable: false,
//       defaultValue: 0,
//     }),
//     external_id: new Column({
//       name: "external_id",
//       type: "text",
//       nullable: true,
//     }),
//     courier_weight: new Column({
//       name: "courier_weight",
//       type: "double precision",
//       nullable: false,
//       defaultValue: 0,
//     }),
//     views: new Column({
//       name: "views",
//       type: "bigint",
//       nullable: false,
//       defaultValue: 0,
//     }),
//     keywords: new Column({
//       name: "keywords",
//       type: "text",
//       nullable: true,
//     }),
//     slug: new Column({
//       name: "slug",
//       type: "text",
//       unique: true,
//       nullable: true,
//     }),
//     meta: new Column({
//       name: "meta",
//       type: "json",
//       nullable: true,
//     }),
//   };

//   relations = {
//     category: new Relation({
//       from_table: "products",
//       to_table: "product_categories",
//       from_column: "category_id",
//       to_column: "id",
//       type: "object",
//       alias: "category",
//     }),
//     categories: new Relation({
//       from_table: "products",
//       to_table: "product_to_category",
//       from_column: "id",
//       to_column: "product_id",
//       type: "array",
//       alias: "categories",
//     }),
//     user: new Relation({
//       from_table: "products",
//       to_table: "users",
//       from_column: "user_id",
//       to_column: "id",
//       type: "object",
//       alias: "user",
//     }),
//     product_attributes: new Relation({
//       from_table: "products",
//       to_table: "product_to_attribute",
//       from_column: "id",
//       to_column: "product_id",
//       type: "array",
//       alias: "product_attributes",
//     }),
//     brand: new Relation({
//       from_table: "products",
//       to_table: "product_brands",
//       from_column: "brand_id",
//       to_column: "id",
//       type: "object",
//       alias: "brand",
//     }),
//     variants: new Relation({
//       from_table: "products",
//       to_table: "product_variants",
//       from_column: "id",
//       to_column: "product_id",
//       type: "array",
//       alias: "variants",
//     }),
//     parent_product: new Relation({
//       from_table: "products",
//       to_table: "product_variants",
//       from_column: "id",
//       to_column: "variant_id",
//       type: "object",
//       alias: "parent_product",
//     }),
//     orders: new Relation({
//       from_table: "products",
//       from_column: "id",
//       to_table: "order_items",
//       to_column: "product_id",
//       type: "array",
//       alias: "orders",
//     }),
//   };
// }

// class Category extends Model {
//   constructor(conn) {
//     super("product_categories", conn);
//   }

//   columns = {
//     id: new Column({
//       name: "id",
//       type: "uuid",
//       nullable: false,
//       primary: true,
//       defaultValue: "gen_random_uuid()",
//     }),
//     name: new Column({
//       name: "name",
//       type: "varchar",
//       length: 255,
//       nullable: false,
//     }),
//     description: new Column({
//       name: "description",
//       type: "text",
//       nullable: true,
//     }),
//     created_at: new Column({
//       name: "created_at",
//       type: "timestamp",
//       nullable: false,
//       defaultValue: "now()",
//     }),
//     enabled: new Column({
//       name: "enabled",
//       type: "boolean",
//       nullable: false,
//       defaultValue: false,
//     }),
//     image: new Column({
//       name: "image",
//       type: "varchar",
//       length: 255,
//       nullable: true,
//     }),
//     supercategory_id: new Column({
//       name: "supercategory_id",
//       type: "uuid",
//       nullable: true,
//     }),
//     grid_order: new Column({
//       name: "grid_order",
//       type: "int8",
//       nullable: false,
//       defaultValue: 1,
//     }),
//     external_id: new Column({
//       name: "external_id",
//       type: "text",
//       nullable: true,
//     }),
//     keywords: new Column({
//       name: "keywords",
//       type: "text",
//       nullable: true,
//     }),
//   };

//   relations = {
//     supercategories: new Relation({
//       type: "array",
//       to_table: "category_to_supercategory",
//       from_table: "product_categories",
//       to_column: "category_id",
//       from_column: "id",
//       alias: "supercategories",
//     }),
//     supercategory: new Relation({
//       type: "object",
//       to_table: "product_super_categories",
//       from_table: "product_categories",
//       to_column: "id",
//       from_column: "supercategory_id",
//       alias: "supercategory",
//     }),
//     products: new Relation({
//       type: "array",
//       to_table: "product_to_category",
//       from_table: "product_categories",
//       to_column: "category_id",
//       from_column: "id",
//       alias: "products",
//     }),
//   };
// }

// class ProductToCategory extends Model {
//   constructor(conn) {
//     super("product_to_category", conn);
//   }

//   columns = {
//     id: new Column({
//       name: "id",
//       type: "uuid",
//       nullable: false,
//       primary: true,
//       defaultValue: "gen_random_uuid()",
//     }),
//     category_id: new Column({
//       name: "category_id",
//       type: "uuid",
//       nullable: false,
//     }),
//     product_id: new Column({
//       name: "product_id",
//       type: "uuid",
//       nullable: false,
//     }),
//   };

//   relations = {
//     product: new Relation({
//       alias: "product",
//       from_column: "product_id",
//       to_column: "id",
//       type: "object",
//       from_table: "product_to_category",
//       to_table: "products",
//     }),
//     category: new Relation({
//       alias: "category",
//       from_column: "category_id",
//       to_column: "id",
//       type: "object",
//       from_table: "product_to_category",
//       to_table: "product_categories",
//     }),
//   };
// }

// DB.register(Category);
// DB.register(Product);
// DB.register(ProductToCategory);

// const model = new Product();
// DB.enableLog = true;
// model
//   .withTransaction(async () => {
//     await model.create({
//       name: "test",
//       price: 0.01,
//       description: "test",
//       categories: [{ category_id: "88b54d64-b723-4ab9-be21-3b077cdf8f65" }],
//       meta: {},
//       weight: 0,
//       length: 0,
//       width: 0,
//       height: 0,
//       user_id: "c0fd2096-b1d4-4fb9-a2d7-207494ace2f0",
//       quantity: 0,
//     });
//     throw new Error();
//   })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
