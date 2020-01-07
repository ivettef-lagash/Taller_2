const fetch = require("node-fetch");
const express = require("express");
const literales = require("../helpers/literales");
const Age = require("../helpers/date");
const app = express.Router();

app.get("/transformarNumero/:num", (req, res) => {
  const { num } = req.params;
  res.send(`numero:${literales(num)}`);
});

app.get("/getAge/:date", (req, res) => {
  const { date } = req.params;
  res.send(`Edad:${Age(date)}`);
});

module.exports = app;
