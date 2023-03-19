import express from "express";
import fetch from "node-fetch";
import { DBCar, Car } from "../models/carModel.js";

const router = express.Router();
const vehiclesURI = "http://localhost:5000/api/vehicles";

router.get("/", (req, res) => {
  fetch(vehiclesURI)
    .then((response) => response.json())
    .then((data) => {
      let carsList = [];
      data.forEach((element) => {
        const car = new Car(element.maker, element.year, element.model);
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

router.post("/", (req, res) => {
  const car = req.body;
  cars.push(car);
  res.status(201);
  res.send(`The vehicle ${car.make} ${car.model} has been added!`);
});

export default router;
