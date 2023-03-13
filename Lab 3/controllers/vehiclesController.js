const { getPostData } = require("../utils");
const { DEFAULT_HEADERS, CACHE_HEADERS } = require("../resources/constants");
const VehiclesModel = require("../models/vehiclesModel");
const StoresModel = require("../models/storesModel");

async function getVehicles(req, res) {
  try {
    const vehicles = await VehiclesModel.findAll();
    res.writeHead(200, CACHE_HEADERS);
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

async function createVehicle(req, res) {
  try {
    const body = await getPostData(req);
    let { maker, model, year, type, store_id } = JSON.parse(body);

    const vehicle = {
      type: type,
      maker: maker,
      year: year,
      store_id: store_id,
      model: model,
    };

    const newVehicle = await VehiclesModel.insertVehicle(vehicle);

    if (newVehicle === null) {
      res.writeHead(500, DEFAULT_HEADERS);
      return res.end(
        JSON.stringify({ message: "Something went wrong: Vehicle not added" })
      );
    }
    const store = await StoresModel.findById(vehicle.store_id);
    StoresModel.changeVehicleCount(store, store.id, 1);
    res.writeHead(201, DEFAULT_HEADERS);
    return res.end(JSON.stringify(newVehicle));
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

async function deleteVehicleById(req, res, id) {
  try {
    const vehicle = await VehiclesModel.findVehicleById(id);
    if (!vehicle) {
      res.writeHead(404, DEFAULT_HEADERS);
      res.end(JSON.stringify({ message: "Vehicle Not Found" }));
    } else {
      performDelete(req, res, vehicle);
    }
  } catch (error) {
    console.log(error);
    res.writeHead(500, DEFAULT_HEADERS);
    res.end(JSON.stringify({ message: "Something went wrong" }));
  }
}

async function deleteVehiclesByMaker(req, res, maker) {
  try {
    const vehicles = await VehiclesModel.findVehiclesByMaker(maker);
    if (!vehicles) {
      res.writeHead(404, DEFAULT_HEADERS);
      res.end(JSON.stringify({ message: "Vehicles Not Found" }));
    } else {
      const deleteResult = VehiclesModel.deleteVehiclesByMaker(maker);
      if (deleteResult === null) {
        res.writeHead(500, DEFAULT_HEADERS);
        res.end(
          JSON.stringify({
            message: "Vehicle not deleted: a problem occured!",
          })
        );
      } else {
        res.writeHead(204, DEFAULT_HEADERS);
        res.end(
          JSON.stringify({
            message: `All vehicles of maker ${maker} have been deleted!`,
          })
        );
      }
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

  if (vehicleInfo.store_id !== vehicle.store_id) {
    const oldStore = await StoresModel.findById(vehicle.store_id);
    const newStore = StoresModel.findById(vehicleInfo.store_id);
    StoresModel.changeVehicleCount(oldStore, oldStore.id, -1);
    StoresModel.changeVehicleCount(newStore, newStore.id, 1);
  }

  const updatedVehicle = await VehiclesModel.updateVehicle(
    vehicleInfo,
    vehicle.id
  );

  if (updatedVehicle === null) {
    res.writeHead(500, DEFAULT_HEADERS);
    res.end(
      JSON.stringify({
        message: "Vehicle not updated: a problem occured!",
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

async function performDelete(req, res, vehicle) {
  const deleteResult = VehiclesModel.deleteVehicle(vehicle.id);
  if (deleteResult === null) {
    res.writeHead(500, DEFAULT_HEADERS);
    res.end(
      JSON.stringify({ message: "Vehicle not deleted: a problem occured!" })
    );
  } else {
    const store = await StoresModel.findById(vehicle.store_id);
    StoresModel.changeVehicleCount(store, store.id, -1);
    res.writeHead(204, DEFAULT_HEADERS);
    res.end(
      JSON.stringify({
        message: `Vehicle ${vehicle.maker} ${vehicle.model} ${vehicle.year} deleted!`,
      })
    );
  }
}

module.exports = {
  getVehicles,
  getVehicleById,
  getVehiclesByMaker,
  updateVehicleById,
  deleteVehicleById,
  createVehicle,
  deleteVehiclesByMaker,
};
