const { getPostData } = require("../utils");
const { DEFAULT_HEADERS, CACHE_HEADERS } = require("../resources/constants");
const StoresModel = require("../models/storesModel");

async function getStores(req, res) {
  try {
    const stores = await StoresModel.findAll();
    res.writeHead(200, CACHE_HEADERS);
    res.end(JSON.stringify(stores));
  } catch (error) {
    console.log(error);
    res.writeHead(500, DEFAULT_HEADERS);
    res.end(JSON.stringify({ message: "Something went wrong" }));
  }
}

async function createStore(req, res) {
  try {
    const body = await getPostData(req);
    let { company } = JSON.parse(body);
    company = company.replace(" ", "_");
    const store = {
      company: company,
      total_vehicles: 0,
    };

    const newStore = await StoresModel.insertStore(store);

    if (newStore === null) {
      res.writeHead(500, DEFAULT_HEADERS);
      return res.end(
        JSON.stringify({ message: "Something went wrong: Store not added" })
      );
    }

    res.writeHead(201, DEFAULT_HEADERS);
    return res.end(JSON.stringify(newStore));
  } catch (error) {
    console.log(error);
    res.writeHead(500, DEFAULT_HEADERS);
    res.end(JSON.stringify({ message: "Something went wrong" }));
  }
}

async function getStoreById(req, res, id) {
  try {
    const store = await StoresModel.findById(id);
    if (!store) {
      res.writeHead(404, DEFAULT_HEADERS);
      res.end(JSON.stringify({ message: "Store Not Found" }));
    } else if (store == "invalid format") {
      res.writeHead(400, DEFAULT_HEADERS);
      res.end(JSON.stringify({ message: "Wrong Id Format" }));
    } else {
      res.writeHead(200, DEFAULT_HEADERS);
      res.end(JSON.stringify(store));
    }
  } catch (error) {
    console.log(error);
    res.writeHead(500, DEFAULT_HEADERS);
    res.end(JSON.stringify({ message: "Something went wrong" }));
  }
}

async function getStoreByCompany(req, res, company) {
  try {
    const store = await StoresModel.findByCompany(company);
    if (!store) {
      res.writeHead(404, DEFAULT_HEADERS);
      res.end(JSON.stringify({ message: "Store Not Found" }));
    } else if (store == "invalid format") {
      res.writeHead(400, DEFAULT_HEADERS);
      res.end(JSON.stringify({ message: "Wrong Id Format" }));
    } else {
      res.writeHead(200, DEFAULT_HEADERS);
      res.end(JSON.stringify(store));
    }
  } catch (error) {
    console.log(error);
    res.writeHead(500, DEFAULT_HEADERS);
    res.end(JSON.stringify({ message: "Something went wrong" }));
  }
}

async function updateStoreById(req, res, id) {
  try {
    const store = await StoresModel.findById(id);
    if (!store) {
      res.writeHead(404, DEFAULT_HEADERS);
      res.end(JSON.stringify({ message: "Store Not Found" }));
    } else if (store == "invalid format") {
      res.writeHead(400, DEFAULT_HEADERS);
      res.end(JSON.stringify({ message: "Wrong Id Format" }));
    } else {
      performUpdate(req, res, store);
    }
  } catch (error) {
    console.log(error);
    res.writeHead(500, DEFAULT_HEADERS);
    res.end(JSON.stringify({ message: "Something went wrong" }));
  }
}

async function updateStoreByCompany(req, res, company) {
  try {
    const store = await StoresModel.findByCompany(company);
    if (!store) {
      res.writeHead(404, DEFAULT_HEADERS);
      res.end(JSON.stringify({ message: "Store Not Found" }));
    } else if (store == "invalid format") {
      res.writeHead(400, DEFAULT_HEADERS);
      res.end(JSON.stringify({ message: "Wrong Id Format" }));
    } else {
      performUpdate(req, res, store);
    }
  } catch (error) {
    console.log(error);
    res.writeHead(500, DEFAULT_HEADERS);
    res.end(JSON.stringify({ message: "Something went wrong" }));
  }
}

async function deleteStoreById(req, res, id) {
  try {
    const store = await StoresModel.findById(id);
    if (!store) {
      res.writeHead(404, DEFAULT_HEADERS);
      res.end(JSON.stringify({ message: "Store Not Found" }));
    } else {
      performDelete(req, res, store);
    }
  } catch (error) {
    console.log(error);
    res.writeHead(500, DEFAULT_HEADERS);
    res.end(JSON.stringify({ message: "Something went wrong" }));
  }
}

async function deleteStoreByCompany(req, res, company) {
  try {
    const store = await StoresModel.findByCompany(company);
    if (!store) {
      res.writeHead(404, DEFAULT_HEADERS);
      res.end(JSON.stringify({ message: "Store Not Found" }));
    } else {
      performDelete(req, res, store);
    }
  } catch (error) {
    console.log(error);
    res.writeHead(500, DEFAULT_HEADERS);
    res.end(JSON.stringify({ message: "Something went wrong" }));
  }
}

async function performUpdate(req, res, store) {
  const body = await getPostData(req);
  let { company } = JSON.parse(body);
  company = company.replace(" ", "_");
  const storeInfo = {
    company: company || store.company,
  };

  const updatedStore = await StoresModel.updateStore(storeInfo, store.id);

  if (updatedStore === null) {
    res.writeHead(500, DEFAULT_HEADERS);
    res.end(
      JSON.stringify({
        message: "Store not updated: a problem occured!",
      })
    );
  } else if (updatedStore === "duplicated value") {
    res.writeHead(400, DEFAULT_HEADERS);
    res.end(
      JSON.stringify({
        message: "Store not updated: credentials not unique!",
      })
    );
  } else {
    res.writeHead(200, DEFAULT_HEADERS);
    res.end(JSON.stringify(updatedStore));
  }
}

async function performDelete(req, res, store) {
  const deleteResult = StoresModel.deleteStore(store.id);
  if (deleteResult === null) {
    res.writeHead(500, DEFAULT_HEADERS);
    res.end(
      JSON.stringify({ message: "Store not deleted: a problem occured!" })
    );
  } else {
    res.writeHead(204, DEFAULT_HEADERS);
    res.end(
      JSON.stringify({
        message: `The store ${store.company} is deleted!`,
      })
    );
  }
}

module.exports = {
  getStores,
  createStore,
  getStoreById,
  updateStoreById,
  deleteStoreById,
  getStoreByCompany,
  deleteStoreByCompany,
  updateStoreByCompany,
};
