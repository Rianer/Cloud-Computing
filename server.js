const http = require("http");
const { ROUTES, DEFAULT_HEADERS } = require("./resources/constants");
const {
  processVehicleIdRequest,
  processVehiclesRequest,
  processVehicleMakerRequest,
} = require("./requestHandlers/vehicleRequests");
const {
  processStoresRequest,
  processStoreIdRequest,
  processStoreCompanyRequest,
} = require("./requestHandlers/storesRequests");

const server = http.createServer((req, res) => {
  if (req.url === ROUTES.welcome) {
    res.writeHead(200, DEFAULT_HEADERS);
    res.end(JSON.stringify({ message: "Welcome" }));
  } else if (req.url === ROUTES.vehicles) {
    processVehiclesRequest(req, res);
  } else if (req.url.match(ROUTES.vehiclesId)) {
    processVehicleIdRequest(req, res);
  } else if (req.url.match(ROUTES.vehiclesMaker)) {
    processVehicleMakerRequest(req, res);
  } else if (req.url === ROUTES.stores) {
    processStoresRequest(req, res);
  } else if (req.url.match(ROUTES.storesId)) {
    processStoreIdRequest(req, res);
  } else if (req.url.match(ROUTES.storesCompany)) {
    processStoreCompanyRequest(req, res);
  } else {
    res.writeHead(400, DEFAULT_HEADERS);
    res.end(JSON.stringify({ message: "Unknown Request" }));
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on PORT = ${PORT}`));
