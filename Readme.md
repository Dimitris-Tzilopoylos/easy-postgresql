# test-easy-psql

## Description

Welcome to the test-easy-psql documentation! test-easy-psql is a simple intermediary for querying data in PostgreSQL databases. Whether you're a beginner or an experienced developer, this documentation will help you get started with test-easy-psql and leverage its capabilities to interact with your PostgreSQL databases efficiently.

**Note:** This package is intended for personal usage, and no tests have been written for it. Therefore, it is recommended to use it with caution and at your own responsibility. Like any software, there may be unforeseen bugs or issues that could affect your application. It is advisable to thoroughly review the package's functionality and integrate it into your projects with careful consideration of potential risks.
(This package was developed using nodejs 16)

## Installation

To install test-easy-psql, you can use npm:

```bash
npm install test-easy-psql
```

## Establishing Connection with PostgreSQL Database

```javascript
const { DB } = require("test-easy-psql");

DB.registerConnectionConfig({
  user: "postgres",
  database: "postgres",
  schema: "public",
  password: "postgres",
  port: 5432,
  host: "localhost",
  min: 5, // pool size limits
  max: 10, // pool size limits
});
```

## Defining Models and Relations for PostgreSQL Database

```javascript
const { Model, Column, Relation } = require("test-easy-psql");

class Role extends Model {
  constructor(connection) {
    super("roles", connection, "public" /* defaults to public */);
  }

  columns = {
    id: new Column({
      name: "id",
      type: "uuid",
      primary: true,
      defaultValue: "gen_random_uuid()",
    }),
    name: new Column({
      name: "name",
      type: "text",
      nullable: false,
    }),
  };
}

class User extends Model {
  constructor(connection) {
    super("users", connection);
  }

  columns = {
    id: new Column({
      name: "id",
      type: "uuid",
      primary: true,
      defaultValue: "gen_random_uuid()",
    }),
    role_id: new Column({
      name: "role_id",
      type: "uuid",
    }),
    email: new Column({
      name: "email",
      type: "text",
      unique: true,
    }),
    password: new Column({
      name: "password",
      type: "text",
      nullable: false,
    }),
    grid_order: new Column({
      name: "grid_order",
      type: "int",
      nullable: false,
      defaultValue: 1,
    }),
  };

  relations = {
    role: new Relation({
      from_table: "users",
      from_column: "role_id",
      to_table: "roles",
      to_column: "id",
      alias: "role",
      type: "object", // object or array
    }),
  };
}

// Register the models in order to be able to use relations
DB.register(User);
DB.regitser(Role);
```

## Basic examples

```javascript

const model = new User();
const data = await model.find() // multiple rows
const data = await model.findOne() // single row
const data = await model.create({email:'example@example.com',password:'12345678'});
const data = await model.createMany([{email:'example@example.com',password:'12345678'},{email:'example2@example.com',password:'12345678'}])
const data = await model.update({where:{...},update:{email:'example@updated.com'}});
const data = await model.delete({where: {...}});
const {count,max} = await model.aggregate({_count:true,max:{email:true},where:{...}}) // _count,max,min,sum,avg
```

## Use Relations

```javascript
const model = new User();
const usersWithRoles = await model.find({ include: { role: true } });
```

## Use Relations With Filters

```javascript
const model = new User();
const usersWithRoles = await model.find({ include: { role: {where:{...}} } });
```

## Basic Filtering Example

```javascript
const model = new User();
const data = await model.find({
  where: { email: { _eq: "example@example.com" } },
});
```

## Basic Filtering Operators

```javascript
const model = new User();
const data = await model.find({
  where: {
    password: { _in: ["12345678", "123456789"] },
    email: { _eq: "test@example.com" },
    _or: [{ password: { _is_not: null } }, { password: { _is: null } }],
    _and: [
      { grid_order: { _lte: 200 } },
      { grid_order: { _lt: 201 } },
      { grid_order: { _gte: 1 } },
      { grid_order: { _gt: 0 } },
      { password: { _nin: ["12345678", "123456789"] } },
      { email: { _ilike: "test" } },
      { email: { _neq: "test2@example.com" } },
      {
        _or: [
          { password: { _is_not: null } },
          { password: { _is: null } },
          {
            _and: [
              { email: { _neq: "test2@example.com" } },
              {
                _or: [
                  { password: { _is_not: null } },
                  { password: { _is: null } },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
});
```

## Basic Filtering Operators Are Applied to Relations too

```javascript
const model = new User();
const data = await model.find({
  where: {
    password: { _eq_: "12345678" },
    email: { _eq: "test@example.com" },
    // this is the role related entity
    role: {
      name: { _eq: "admin" },
    },
  },
});
```

## Other Operators

```javascript
const model = new Role();
const data = await model.find({where:{...},distinct:[...],groupBy:[...],limit:100,offset:0,orderBy: {
    name: 'asc',
    users_aggregate:{
        _count:true
    }
}})
```

## Using nested aggregations

```javascript
const { Model, Column } = require("test-easy-psql");

class Role extends Model {
  constructor(connection) {
    super("roles", connection);
  }

  columns = {
    id: new Column({
      name: "id",
      type: "uuid",
      primary: true,
      defaultValue: "gen_random_uuid()",
    }),
    name: new Column({
      name: "name",
      type: "text",
      nullable: false,
    }),
  };

  relations = {
    users: new Relation({
      from_table: "roles",
      from_column: "id",
      to_table: "users",
      to_column: "role_id",
      alias: "users",
      type: "array", // object or array
    }),
  };
}

class User extends Model {
  constructor(connection) {
    super("users", connection);
  }

  columns = {
    id: new Column({
      name: "id",
      type: "uuid",
      primary: true,
      defaultValue: "gen_random_uuid()",
    }),
    role_id: new Column({
      name: "role_id",
      type: "uuid",
    }),
    email: new Column({
      name: "email",
      type: "text",
      unique: true,
    }),
    password: new Column({
      name: "password",
      type: "text",
      nullable: false,
    }),
    grid_order: new Column({
      name: "grid_order",
      type: "int",
      nullable: false,
      defaultValue: 1,
    }),
  };

  relations = {
    role: new Relation({
      schema: "public", // refers to the schema of the referenced table. In this example it is "roles"
      from_table: "users",
      from_column: "role_id",
      to_table: "roles",
      to_column: "id",
      alias: "role",
      type: "object", // object or array
    }),
  };
}

// Register the models in order to be able to use relations
DB.register(User);
DB.regitser(Role);

const model = new Role();
const role = await model.findOne({
  where: { name: { _eq: "admin" } },
  include: {
    users_aggregate: {
      // _count,max,min,avg,sum
      _count: true,
      max: { grid_order: true },
      min: { grid_order: true, email: true },
      // you can use where inside here
    },
  },
});
```

## Using multiple nested relations

```javascript
const model = new User();
const data = await model.find({
  include: {
    role: {
      include: {
        users: {
          include: {
            role: true, // .....
          },
        },
      },
    },
  },
});
```

## Transactions Example 1

```javascript
const model = new User();

const result = await model.withTransaction(async (tx) => {
  const newUser = await model.create({
    email: "test@test2.com",
    password: "12345678",
    role_id: "...",
  });
  if (!newUser) {
    throw new Error("User not created");
  }

  return newUser;
});

// Errors inside withTransaction will use rollback; otherwise a commit is performed

// Check the result

if (result instanceof Error) {
  console.error(result);
} else {
  console.log(result);
}
```

## Transactions Example 2

```javascript
const model = new User();

const result = await model.withTransaction(async (tx) => {
  const newUser = await model.create({
    email: "test@test2.com",
    password: "12345678",
    role_id: "...",
  });
  if (!newUser) {
    throw new Error("User not created");
  }

  const roleModel = new Role(tx); // pass the tx -> connection to postgres otherwise this operation is not atomic

  const roleData = await role.create({ name: "testRole" });
  if (!roleData) {
    throw new Error("Role not created");
  }
  return [newUser, roleData];
});

// Errors inside withTransaction will use rollback; otherwise a commit is performed

// Check the result

if (result instanceof Error) {
  console.error(result);
} else {
  console.log(result);
}
```

## Transactions Example 3

```javascript
const model = new Role();
const inputData = {
  name: "newRole",
  users: [
    { email: "newUser@newRole.com", password: "12345678" },
    { email: "newUser2@newRole.com", password: "12345678" },
  ],
};

// Over here perform the createTX operation

const result = await model.createTX(inputData);

// or for multiple inserts use await model.createManyTX([inputData])   -> use an array of objects

// The roles.id generated from this query will be assigned to each users.role_id field
```

## Register Effects

```javascript
// The following events will be triggered only by using the model classes

// e.g : find and findOne  on model User -> will trigger onSelectAsync but DB.pool.query('select * from users'); will not!

DB.onSelectAsync("users", async (data, instance) => {
  // ...
});
DB.onInsertAsync("users", async (data, instance) => {
  // ...
});
DB.onUpdateAsync("users", async (data, instance) => {
  // ...
});
DB.onDeleteAsync("users", async (data, instance) => {
  // ...
});
DB.onErrorAsync("users", async (error, instance) => {
  // ...
});
```

## More generic with actions

```javascript
// The following actions will be triggered only by using the model classes

// e.g : find and findOne  on model User -> will trigger onSelectActionAsync but DB.pool.query('select * from users'); will not!

// Not like effects, you can register many actions of same type e.g Selection Actions and they are going to be executed using Promise.all in the end of each operation find,findOne,create,createTX,createMany,createManyTX,update,delete.

DB.onSelectActionAsync(async (data, instance) => {
  // ...
});
DB.onInsertActionAsync(async (data, instance) => {
  // ...
});
DB.onUpdateActionAsync(async (data, instance) => {
  // ...
});
DB.onDeleteActionAsync(async (data, instance) => {
  // ...
});
DB.onErrorActionAsync(async (error, instance) => {
  // ...
});
```

## AutoDiscoverAPI

```javascript
const { Postgres, Relation } = require('test-easy-psql');

const db = new Postgres({
  connectionConfig: {
    host: ...,
    port: ...,
    user: ...,
    password: ...,
    schema: ...,
    database: ...
  },
  relations: [new Relation({...}), {from_table:...,from_column:...,to_table:...,to_column:...,alias:...,type: 'object' | 'array'}], // not required
  options: {
      createFiles: false, // create files for the models
      skipIfDirectoryExists: true, // skip files' creation if the specified folder already exists
      dirname: "test-easy-psql-models", // folder name to create model files
      useESM: false, // true -> use exports / false -> require
      extension: "js", // can be js,ts or mjs
  }
});

const postgres = async () => {
  await db.init()
  return db
}


module.exports = postgres


// e.g in another file

const postgres = require('./path-of-the-file-above');

const run = async () => {
  const db = await postgres();
  // db.model(table_name,connection,schema)
  const data = await db.model('my-table').find({...}); //same api as the functions in the other examples

  return data; // ([{...},{...}])
}


run();

```
