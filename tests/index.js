"use strict";

require("./conditions.test");
require("./validation.test");
require("./column.test");
require("./sql.test");
require("./relation.test");
require("./json-operators.test");
require("./db.test");
require("./model.test");

const { summary } = require("./runner");
summary();
