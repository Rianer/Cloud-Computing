const ROUTES = {
  welcome: "/api/welcome",
  vehicles: "/api/vehicles",
  vehiclesId: /\/api\/vehicles\?id=([0-9a-f\-]+$)/,
  vehiclesMaker: /\/api\/vehicles\?maker=([a-zA-Z0-9_!\s.\(\)]+$)/,
  stores: "/api/stores",
  storesId: /\/api\/stores\?id=([0-9a-f\-]+$)/,
  storesCompany: /\/api\/stores\?company=([a-zA-Z0-9_ !\s.\(\)]+$)/,
};

const DEFAULT_HEADERS = {
  "Access-Control-Allow-Methods": "POST, GET, DELETE, PUT, PATCH",
  "Content-Type": "application/json",
};

const CACHE_HEADERS = {
  "Access-Control-Allow-Methods": "POST, GET, DELETE, PUT, PATCH",
  "Content-Type": "application/json",
  "Cache-Control": "max-age=10, must-revalidate",
};

module.exports = {
  ROUTES,
  DEFAULT_HEADERS,
  CACHE_HEADERS,
};
