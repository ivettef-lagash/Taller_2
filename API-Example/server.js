var config = require("./settings/appsettings.secrets.json");
const express = require("express");
const cors = require("cors");
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
        const msg = "Origen no permitido.";
        console.log(`${msg} origin: ${origin}`);
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

app.listen(PORT, HOST);
console.log(`Corriendo  API en http://${HOST}:${PORT}`);
