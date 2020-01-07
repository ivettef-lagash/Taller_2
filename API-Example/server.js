var config = require("./settings/appsettings.secrets.json");
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const trace = require("./helpers/trace");
const api = require("./helpers/api");
const routes = require("./routes/routes");
// Constants
let { allowedOrigins, HOST, PORT } = config;

// App
const app = express();

app.use(
  cors({
    origin: function(origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = "Origen " + "no permitido.";
        console.log(msg + " origin:" + origin);
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    }
  })
);

app.use((req, res, next) => {
  let data = "";
  req.setEncoding("utf8");
  req.on("data", function(chunk) {
    data += chunk;
  });
  req.on("end", () => {
    req.body = data;
    next();
  });
});
app.use("/", routes);

app.get("/getUF:date", async function(req, res) {
  trace.trackEvent(`Request a /getUF correcta.`);
  var m = moment(date, "MMM-DD-YYYY");
  const request = await fetch(
    api.uriConfig.api.getUF("fecha en formato dd-mm-yyyy"),
    {
      method: "GET",
      mode: "cors",
      headers: { "Content-Type": "application/json" }
    }
  ).catch(error => {
    console.log(`error: ${error}`);
    trace.trackException(
      `Error llamando a ${api.uriConfig.api.getUF(
        "fecha en formato dd-mm-yyyy"
      )}. Error: ${error}`
    );
    res.status(500).send({
      msg:
        "Ha ocurrido un error llamando al API para obtener la información solicitada.",
      ok: false
    });
    res.end();
  });

  const response = await request.json();
  if (response) {
    trace.trackEvent(`Llamada a servicio correcta.`, response);
    res.send({ msg: "Mensaje requerido", ok: true });
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

app.listen(PORT, HOST);
console.log(`Corriendo  API en http://${HOST}:${PORT}`);
