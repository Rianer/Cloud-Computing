const { Client } = require("pg");

function getClient() {
  return new Client({
    host: "localhost",
    port: 5432,
    user: "developer",
    password: "developer",
    database: "ccomp",
  });
}

module.exports = {
  getClient,
};
