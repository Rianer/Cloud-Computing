const { v4: uuidv4 } = require("uuid");
const { getClient } = require("../databasePG");

function findAll() {
  return new Promise((resolve, reject) => {
    const client = getClient();
    client.connect();
    client.query("SELECT * FROM stores", (err, res) => {
      if (!err) {
        console.log("Transaction successful!");
        resolve(res.rows);
      } else {
        console.log(`Error code: ${err.code}`);
        console.log(err.stack);
        resolve(null);
      }
      client.end();
    });
  });
}

function insertStore(store) {
  return new Promise((resolve, reject) => {
    const newStore = { id: uuidv4(), ...store };
    const client = getClient();
    client.connect();
    client.query(
      "INSERT INTO stores(id, company, total_vehicles) VALUES ($1, $2, $3)",
      [newStore.id, newStore.company, newStore.total_vehicles],
      (err, res) => {
        if (!err) {
          resolve(newStore);
          console.log("Transaction successful!");
        } else if (err.code == 23505) {
          resolve("Company name already exists!");
        } else {
          resolve(null);
          console.log(`Error code: ${err.code}`);
          console.log(err.stack);
        }
        client.end();
      }
    );
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    const client = getClient();
    client.connect();
    client.query("SELECT * FROM stores WHERE id = $1", [id], (err, res) => {
      if (!err) {
        console.log("Transaction successful!");
        resolve(res.rows[0]);
      } else if (err.code == "22P02") {
        console.log("Invalid UUID format");
        resolve("invalid format");
      } else {
        console.log(`Error code: ${err.code}`);
        console.log(err.stack);
        resolve(null);
      }
      client.end();
    });
  });
}

function findByCompany(company) {
  return new Promise((resolve, reject) => {
    const client = getClient();
    client.connect();
    client.query(
      "SELECT * FROM stores WHERE company = $1",
      [company],
      (err, res) => {
        if (!err) {
          console.log("Transaction successful!");
          resolve(res.rows[0]);
        } else if (err.code == "22P02") {
          console.log("Invalid UUID format");
          resolve("invalid format");
        } else {
          console.log(`Error code: ${err.code}`);
          console.log(err.stack);
          resolve(null);
        }
        client.end();
      }
    );
  });
}

function updateStore(store, id) {
  return new Promise((resolve, reject) => {
    const client = getClient();
    client.connect();
    client.query(
      "UPDATE stores SET company = $1 WHERE id = $2",
      [store.company, id],
      (err, res) => {
        if (!err) {
          console.log("Transaction successful!");
          resolve(store);
        } else if (err.code === "23505") {
          console.log("Duplicated value!");
          resolve("duplicated value");
        } else {
          console.log(`Error code: ${err.code}`);
          console.log(err.stack);
          resolve(null);
        }
        client.end();
      }
    );
  });
}

function deleteStore(id) {
  return new Promise((resolve, reject) => {
    const client = getClient();
    client.connect();
    client.query("DELETE FROM stores WHERE id = $1", [id], (err, res) => {
      if (!err) {
        console.log("Deleted successfully!");
        resolve("deleted");
      } else {
        console.log(`Error code: ${err.code}`);
        console.log(err.stack);
        resolve(null);
      }
      client.end();
    });
  });
}

function changeVehicleCount(store, id, amount) {
  return new Promise((resolve, reject) => {
    const client = getClient();
    client.connect();
    client.query(
      "UPDATE stores SET total_vehicles = $1 WHERE id = $2",
      [store.total_vehicles + amount, id],
      (err, res) => {
        if (!err) {
          console.log("Transaction successful!");
          resolve(store);
        } else if (err.code === "23505") {
          console.log("Duplicated value!");
          resolve("duplicated value");
        } else {
          console.log(`Error code: ${err.code}`);
          console.log(err.stack);
          resolve(null);
        }
        client.end();
      }
    );
  });
}

module.exports = {
  findAll,
  insertStore,
  findById,
  updateStore,
  deleteStore,
  changeVehicleCount,
  findByCompany,
};
