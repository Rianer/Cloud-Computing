const { v4: uuidv4 } = require("uuid");
const { getClient } = require("../databasePG");

function findAll() {
  return new Promise((resolve, reject) => {
    const client = getClient();
    client.connect();
    client.query("SELECT * FROM vehicles", (err, res) => {
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

function findVehicleById(id) {
  return new Promise((resolve, reject) => {
    const client = getClient();
    client.connect();
    client.query("SELECT * FROM vehicles WHERE id = $1", [id], (err, res) => {
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

function findVehiclesByMaker(maker) {
  return new Promise((resolve, reject) => {
    const client = getClient();
    client.connect();
    client.query(
      "SELECT * FROM vehicles WHERE maker = $1",
      [maker],
      (err, res) => {
        if (!err) {
          console.log("Transaction successful!");
          resolve(res.rows);
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

function updateVehicle(vehicle, id) {
  return new Promise((resolve, reject) => {
    const client = getClient();
    client.connect();
    client.query(
      "UPDATE vehicles SET maker = $1, type = $2, model = $3, year = $4, store_id = $5 WHERE id = $6",
      [
        vehicle.maker,
        vehicle.type,
        vehicle.model,
        vehicle.year,
        vehicle.store_id,
        id,
      ],
      (err, res) => {
        if (!err) {
          console.log("Transaction successful!");
          resolve(vehicle);
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

function deleteVehicle(id) {
  return new Promise((resolve, reject) => {
    const client = getClient();
    client.connect();
    client.query("DELETE FROM vehicles WHERE id = $1", [id], (err, res) => {
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

function deleteVehiclesByMaker(maker) {
  return new Promise((resolve, reject) => {
    const client = getClient();
    client.connect();
    client.query(
      "DELETE FROM vehicles WHERE maker = $1",
      [maker],
      (err, res) => {
        if (!err) {
          console.log("Deleted successfully!");
          resolve("deleted");
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

function insertVehicle(vehicle) {
  return new Promise((resolve, reject) => {
    const newVehicle = { id: uuidv4(), ...vehicle };
    const client = getClient();
    client.connect();
    client.query(
      "INSERT INTO vehicles(id, type, maker, year, store_id, model) VALUES ($1, $2, $3, $4, $5, $6)",
      [
        newVehicle.id,
        newVehicle.type,
        newVehicle.maker,
        newVehicle.year,
        newVehicle.store_id,
        newVehicle.model,
      ],
      (err, res) => {
        if (!err) {
          resolve(newVehicle);
          console.log("Transaction successful!");
        } else if (err.code == 23505) {
          resolve("invalid data");
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

module.exports = {
  findAll,
  findVehicleById,
  findVehiclesByMaker,
  updateVehicle,
  deleteVehicle,
  insertVehicle,
  deleteVehiclesByMaker,
};
