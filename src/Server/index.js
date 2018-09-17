const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const morganToolkit = require("morgan-toolkit")(morgan);
const port = 4000;
const host = "localhost";
const app = express();

app.use(bodyParser.json());
app.use(morganToolkit());
/**
 * Routes
 */
const products = require("./Routers/products");
app.use("/products", products);
app.use("*", (req, res) => res.end());
/**
 * End routes
 */
app.listen.apply(app, [port, host]);
console.log(`Server started on: http://${host}:${port}\n`);

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  if (err.stack) {
    err = err.stack;
  }
  res.json(err);
});
