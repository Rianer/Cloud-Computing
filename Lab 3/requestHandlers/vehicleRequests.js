const http = require("http");
const {
  getVehicles,
  getVehicleById,
  getVehiclesByMaker,
  updateVehicleById,
  createVehicle,
  deleteVehicleById,
  deleteVehiclesByMaker,
} = require("../controllers/vehiclesController");
const { DEFAULT_HEADERS } = require("../resources/constants");

function processVehicleIdRequest(req, res) {
  const id = getHttpQuerryParameter(req);
  if (req.method === "GET") {
    getVehicleById(req, res, id);
  } else if (req.method === "PUT") {
    updateVehicleById(req, res, id);
  } else if (req.method === "DELETE") {
    deleteVehicleById(req, res, id);
  } else {
    res.writeHead(405, DEFAULT_HEADERS);
    res.end(JSON.stringify({ message: "Forbiden method on this endpoint!" }));
  }
}

function processVehiclesRequest(req, res) {
  if (req.method === "GET") {
    getVehicles(req, res);
  } else if (req.method === "POST") {
    createVehicle(req, res);
  } else {
    res.writeHead(405, DEFAULT_HEADERS);
    res.end(JSON.stringify({ message: "Forbiden method on this endpoint!" }));
  }
}

function processVehicleMakerRequest(req, res) {
  if (req.method === "GET") {
    const maker = getHttpQuerryParameter(req);
    getVehiclesByMaker(req, res, maker);
  } else if (req.method === "DELETE") {
    const maker = getHttpQuerryParameter(req);
    deleteVehiclesByMaker(req, res, maker);
  } else {
    res.writeHead(405, DEFAULT_HEADERS);
    res.end(JSON.stringify({ message: "Forbiden method on this endpoint!" }));
  }
}

function getHttpQuerryParameter(req) {
  return req.url.split("?")[1].split("=")[1];
}

module.exports = {
  processVehicleIdRequest,
  processVehiclesRequest,
  processVehicleMakerRequest,
};
