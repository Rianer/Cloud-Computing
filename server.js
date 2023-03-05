const http = require("http");
const { ROUTES, DEFAULT_HEADERS } = require("./resources/constants");
const {
  getVehicles,
  getVehicleById,
  getVehiclesByMaker,
  updateVehicleById,
} = require("./controllers/vehiclesController");

const server = http.createServer((req, res) => {
  if (req.url === ROUTES.welcome) {
    res.writeHead(200, DEFAULT_HEADERS);
    res.end(JSON.stringify({ message: "Welcome" }));
  } else if (req.url === ROUTES.vehicles && req.method === "GET") {
    getVehicles(req, res);
  } else if (req.url.match(ROUTES.vehiclesId)) {
    const id = getHttpQuerryParameter(req);
    processVehicleIdRequest(req, res, id);
  } else if (req.url.match(ROUTES.vehiclesMaker) && req.method === "GET") {
    const maker = getHttpQuerryParameter(req);
    getVehiclesByMaker(req, res, maker);
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on PORT = ${PORT}`));

function processVehicleIdRequest(req, res, id) {
  if (req.method === "GET") {
    getVehicleById(req, res, id);
  } else if (req.method === "PUT") {
    updateVehicleById(req, res, id);
  } else if (req.method === "DELETE") {
    //   deleteUserById(req, res, id);
  } else {
    res.writeHead(400, HEADERS);
    res.end(JSON.stringify({ message: "Unknown Request" }));
  }
}

function getHttpQuerryParameter(req) {
  return req.url.split("?")[1].split("=")[1];
}
