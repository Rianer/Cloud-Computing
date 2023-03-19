import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.get("/", (req, res) => {
  const url =
    "https://api.open-meteo.com/v1/forecast?latitude=47.17&longitude=27.60&current_weather=true";
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      const result = json.current_weather;
      res.send(result);
    })
    .catch((err) => console.error("error:" + err));
});

export default router;
