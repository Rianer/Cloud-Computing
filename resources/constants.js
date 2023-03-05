const ROUTES = {
  welcome: "/api/welcome",
  vehicles: "/api/vehicles",
  vehiclesId: /\/api\/vehicles\?id=([0-9a-f\-]+$)/,
  vehiclesMaker: /\/api\/vehicles\?maker=([a-zA-Z0-9_!\s.\(\)]+$)/,
  stores: "/api/stores",
};

const DEFAULT_HEADERS = {
  "Access-Control-Allow-Methods": "POST, GET, DELETE, PUT",
  "Content-Type": "application/json",
};

module.exports = {
  ROUTES,
  DEFAULT_HEADERS,
};
