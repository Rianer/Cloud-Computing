import express, { response } from "express";
import fetch from "node-fetch";
import * as fs from "fs";

const router = express.Router();
const vehiclesURL = "http://localhost:5000/api/vehicles";

const rawData = fs.readFileSync("app-config.json");
const APIData = JSON.parse(rawData);

router.get("/", (req, res) => {
  fetch(vehiclesURL)
    .then((response) => response.json())
    .then((data) => {
      let carsList = [];
      data.forEach((element) => {
        const car = {
          id: element.id,
          type: element.type,
          maker: element.maker,
          year: element.year,
          model: element.model,
        };
        carsList.push(car);
      });
      if (carsList.length == 0) {
        res.status(204);
        res.send();
      } else {
        res.status(200);
        res.send(carsList);
      }
    });
});

router.get("/models/:make", (req, res) => {
  const enginesURL = `https://car-api2.p.rapidapi.com/api/models?make=${req.params.make}&limit=10&sort=name&direction=asc&year=2020&verbose=yes`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": APIData["RapidAPI-Key"],
      "X-RapidAPI-Host": APIData["RapidAPI-Host"],
    },
  };
  fetch(enginesURL, options)
    .then((response) => response.json())
    .then((response) => res.send(response))
    .catch((err) => console.error(err));
});

router.post("/", (req, res) => {
  let { make, model, year, type } = req.body;
  const car = {
    maker: make,
    model: model,
    year: year,
    type: type,
    store_id: "b4699255-8448-44a8-9f55-cdbdd7305a58",
  };
  const options = {
    method: "POST",
    body: JSON.stringify(car),
  };
  fetch(vehiclesURL, options).then((response) => {
    if (response.status != 201) {
      res.status(503);
      res.send();
      console.log("Error");
    } else {
      res.status(201);
      res.send(
        JSON.stringify({
          message: `The vehicle ${car.maker} ${car.model} has been added!`,
        })
      );
    }
  });
});

router.delete("/:id", (req, res) => {
  const URL = vehiclesURL + `?id=${req.params.id}`;
  const options = {
    method: "DELETE",
  };
  fetch(URL, options).then((response) => {
    if (response.status > 204) {
      res.status(503);
      res.send();
    } else {
      res.status(204);
      res.send();
    }
  });
});

export default router;
