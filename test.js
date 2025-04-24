const { Column, Model, Relation, DB } = require("./dist");

DB.registerConnectionConfig({
  user: "postgres",
  password: "password",
  database: "postgres",
  schema: "public",
  port: 5440,
  host: "localhost",
});

DB.enableLog = true;

class Building extends Model {
  constructor(conn) {
    super("buildings", conn);
  }

  columns = {
    id: new Column({
      name: "id",
      type: "text",
      defaultValue: "gen_random_uuid()::text",
      primary: true,
    }),
    name: new Column({
      name: "name",
      type: "text",
      nullable: true,
    }),
  };

  relations = {
    spaces: new Relation({
      alias: "spaces",
      from_table: "buildings",
      from_column: "id",
      to_table: "spaces",
      to_column: "building_id",
      type: "array",
    }),
  };
}

class Sensor extends Model {
  constructor(conn) {
    super("sensors", conn);
  }

  columns = {
    id: new Column({
      name: "id",
      type: "text",
      defaultValue: "gen_random_uuid()::text",
    }),
    space_id: new Column({
      name: "space_id",
      type: "text",
      nullable: false,
    }),
    building_id: new Column({
      name: "building_id",
      type: "text",
      nullable: false,
    }),
    name: new Column({
      name: "name",
      type: "text",
      nullable: true,
    }),
  };

  relations = {
    building: new Relation({
      alias: "building",
      to_table: "buildings",
      to_column: "id",
      from_table: "sensors",
      from_column: "parent_id",
      type: "object",
    }),
    space: new Relation({
      alias: "space",
      to_table: "spaces",
      to_column: "id",
      from_table: "sensors",
      from_column: "parent_id",
      type: "object",
    }),
  };
}

class Space extends Model {
  constructor(conn) {
    super("spaces", conn);
  }

  columns = {
    id: new Column({
      name: "id",
      type: "text",
      defaultValue: "gen_random_uuid()::text",
    }),
    name: new Column({
      name: "name",
      type: "text",
      nullable: true,
    }),
    building_id: new Column({
      name: "building_id",
      type: "text",
      nullable: false,
    }),
  };

  relations = {
    building: new Relation({
      alias: "building",
      to_table: "buildings",
      to_column: "id",
      from_table: "spaces",
      from_column: "building_id",
      type: "object",
    }),
    sensors: new Relation({
      alias: "sensors",
      to_table: "sensors",
      to_column: ["space_id", "building_id"],
      from_table: "spaces",
      from_column: ["id", "building_id"],
      type: "array",
    }),
  };
}

DB.register(Building);
DB.register(Space);
DB.register(Sensor);

const b = new Building();

b.create({
  id: "test",
  name: "test",
  spaces: [
    {
      id: "test_space_1",
      name: "test_space",
      sensors: [{ name: "test_sensor_1" }, { name: "test_sensor_2" }],
    },
    {
      id: "test_space_2",
      name: "test_space2",
      sensors: [{ name: "test_sensor_3" }, { name: "test_sensor_4" }],
    },
    {
      id: "test_space_3",
      name: "test_space2",
    },
  ],
}).then((res) => {
  console.log(res);
});
