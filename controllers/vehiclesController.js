const { getPostData } = require("../utils");
const { DEFAULT_HEADERS } = require("../resources/constants");
const VehiclesModel = require("../models/vehiclesModel");

async function getVehicles(req, res) {
  try {
    const vehicles = await VehiclesModel.findAll();
    res.writeHead(200, DEFAULT_HEADERS);
    res.end(JSON.stringify(vehicles));
  } catch (error) {
    console.log(error);
    res.writeHead(500, DEFAULT_HEADERS);
    res.end(JSON.stringify({ message: "Something went wrong" }));
  }
}

async function getVehicleById(req, res, id) {
  try {
    const vehicle = await VehiclesModel.findVehicleById(id);
    if (!vehicle) {
      res.writeHead(404, DEFAULT_HEADERS);
      res.end(JSON.stringify({ message: "Vehicle Not Found" }));
    } else if (vehicle == "invalid format") {
      res.writeHead(400, DEFAULT_HEADERS);
      res.end(JSON.stringify({ message: "Wrong Id Format" }));
    } else {
      res.writeHead(200, DEFAULT_HEADERS);
      res.end(JSON.stringify(vehicle));
    }
  } catch (error) {
    console.log(error);
    res.writeHead(500, DEFAULT_HEADERS);
    res.end(JSON.stringify({ message: "Something went wrong" }));
  }
}

async function getVehiclesByMaker(req, res, maker) {
  try {
    const vehicles = await VehiclesModel.findVehiclesByMaker(maker);
    if (!vehicles) {
      res.writeHead(404, DEFAULT_HEADERS);
      res.end(JSON.stringify({ message: "Vehicles Not Found" }));
    } else {
      res.writeHead(200, DEFAULT_HEADERS);
      res.end(JSON.stringify(vehicles));
    }
  } catch (error) {
    console.log(error);
    res.writeHead(500, DEFAULT_HEADERS);
    res.end(JSON.stringify({ message: "Something went wrong" }));
  }
}

async function updateVehicleById(req, res, id) {
  try {
    const vehicle = await VehiclesModel.findVehicleById(id);
    if (!vehicle) {
      res.writeHead(404, DEFAULT_HEADERS);
      res.end(JSON.stringify({ message: "Vehicle Not Found" }));
    } else if (vehicle == "invalid format") {
      res.writeHead(400, DEFAULT_HEADERS);
      res.end(JSON.stringify({ message: "Wrong Id Format" }));
    } else {
      performUpdate(req, res, vehicle);
    }
  } catch (error) {
    console.log(error);
    res.writeHead(500, DEFAULT_HEADERS);
    res.end(JSON.stringify({ message: "Something went wrong" }));
  }
}

async function performUpdate(req, res, vehicle) {
  const body = await getPostData(req);
  let { maker, model, year, type, store_id } = JSON.parse(body);

  const vehicleInfo = {
    maker: maker || vehicle.maker,
    model: model || vehicle.model,
    year: year || vehicle.year,
    type: type || vehicle.type,
    store_id: store_id || vehicle.store_id,
  };

  const updatedVehicle = await VehiclesModel.updateVehicle(
    vehicleInfo,
    vehicle.id
  );

  if (updatedVehicle === null) {
    res.writeHead(400, DEFAULT_HEADERS);
    res.end(
      JSON.stringify({
        message: "Vehicle not updated: invalid parameters provided!",
      })
    );
  } else if (updatedVehicle === "duplicated value") {
    res.writeHead(400, DEFAULT_HEADERS);
    res.end(
      JSON.stringify({
        message: "Vehicle not updated: credentials not unique!",
      })
    );
  } else {
    res.writeHead(200, DEFAULT_HEADERS);
    res.end(JSON.stringify(updatedVehicle));
  }
}

module.exports = {
  getVehicles,
  getVehicleById,
  getVehiclesByMaker,
  updateVehicleById,
};
