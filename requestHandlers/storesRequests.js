const http = require("http");
const {
  getStores,
  createStore,
  getStoreById,
  updateStoreById,
  deleteStoreById,
  getStoreByCompany,
  updateStoreByCompany,
  deleteStoreByCompany,
} = require("../controllers/storesController");
const { DEFAULT_HEADERS } = require("../resources/constants");

function processStoresRequest(req, res) {
  if (req.method === "GET") {
    getStores(req, res);
  } else if (req.method === "POST") {
    createStore(req, res);
  } else {
    res.writeHead(405, DEFAULT_HEADERS);
    res.end(JSON.stringify({ message: "Forbiden method on this endpoint!" }));
  }
}

function processStoreIdRequest(req, res) {
  const id = getHttpQuerryParameter(req);
  if (req.method === "GET") {
    getStoreById(req, res, id);
  } else if (req.method === "PUT") {
    updateStoreById(req, res, id);
  } else if (req.method === "DELETE") {
    deleteStoreById(req, res, id);
  } else {
    res.writeHead(405, DEFAULT_HEADERS);
    res.end(JSON.stringify({ message: "Forbiden method on this endpoint!" }));
  }
}

function processStoreCompanyRequest(req, res) {
  const company = getHttpQuerryParameter(req);
  if (req.method === "GET") {
    console.log("Here");
    getStoreByCompany(req, res, company);
  } else if (req.method === "PUT") {
    updateStoreByCompany(req, res, company);
  } else if (req.method === "DELETE") {
    deleteStoreByCompany(req, res, company);
  } else {
    res.writeHead(405, DEFAULT_HEADERS);
    res.end(JSON.stringify({ message: "Forbiden method on this endpoint!" }));
  }
}

function getHttpQuerryParameter(req) {
  return req.url.split("?")[1].split("=")[1];
}

module.exports = {
  processStoresRequest,
  processStoreIdRequest,
  processStoreCompanyRequest,
};
