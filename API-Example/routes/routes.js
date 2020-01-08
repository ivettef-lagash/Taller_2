const fetch = require("node-fetch");
const express = require("express");
const literales = require("../helpers/literales");
const app = express.Router();
const trace = require("../helpers/trace");
const api = require("../helpers/api");
const { Age, Dates } = require("../helpers/date");
const QR = require("../helpers/QR");
/**
 * Ruta para obtener en palabras un número dado
 * @param {string, function} url Url correspondiente a transformarNumero con parámetro num: Number, función con params req,res
 */
app.get("/transformarNumero/:num", (req, res) => {
  const { num } = req.params;
  res.send(`numero:${literales(num)}`);
});

/**
 * Ruta para obtener la edad a partir de una fecha indicada
 * @param {string, function} url Url correspondiente a getDate con parámetro date: yyyy-mm-dd, función con params req,res
 */
app.get("/getAge/:date", (req, res) => {
  const { date } = req.params;
  res.send(`Edad:${Age(date)}`);
});

/**
 * Ruta para obtener el valor de la UF del día actual
 * Utiliza método GET
 * @param {string, async function} url Url correspondiente a getUF, función asíncrona con params req,res
 */
app.get("/getUF", async function(req, res) {
  trace.trackEvent(`Request a /getUF correcta.`);

  const request = await fetch(api.uriConfig.api.getUF(Dates()), {
    method: "GET",
    mode: "cors",
    headers: { "Content-Type": "application/json" }
  }).catch(error => {
    console.log(`error: ${error}`);
    trace.trackException(
      `Error llamando a ${api.uriConfig.api.getUF(Dates())}. Error: ${error}`
    );
    res.status(500).send({
      msg:
        "Ha ocurrido un error llamando al API para obtener la información solicitada.",
      ok: false
    });
    res.end();
  });

  const response = await request.json();
  const {
    serie: [{ valor }],
    nombre
  } = response;
  console.log(`${nombre}: ${valor}`);
  if (response) {
    trace.trackEvent(`Llamada a servicio correcta.`, `${nombre}: ${valor}`);
    res.send(`Valor de la ${nombre} de hoy: ${valor}`);
    res.end();
  } else {
    trace.trackException(
      `Error llamando a ${api.uriConfig.apiQR.tokens}. Error: ${error}`
    );
    res.status(500).send({
      msg:
        "Ha ocurrido un error llamando al API para obtener la información solicitada.",
      ok: false
    });
    res.end();
  }
});

/**
 * Ruta para obtener Uncódigo QR
 * @param {string, function} url Url correspondiente a qr , función con params req,res
 */
app.get("/qr", function(req, res) {
  var code = QR();
  res.setHeader("Content-type", "image/png");
  code.pipe(res);
});
module.exports = app;
