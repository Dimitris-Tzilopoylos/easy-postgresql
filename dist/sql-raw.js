const SQL = require("./sql");

function sqlRaw(callback) {
  return new SQL(callback);
}

module.exports = {
  sqlRaw,
};
