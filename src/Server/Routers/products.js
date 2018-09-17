const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const express = require("express");
const router = express.Router();

const filePath = path.join(__dirname, "../Data/products.json");

const services = require("../Services/services");
let STARTING_ID = services.determineStartingId();

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const prepareData = async (req, res, next) => {
  let products = await readFileAsync(filePath, "utf8");
  products = JSON.parse(products);
  req.products = products;
  console.log("Prepare data : OK");
  next();
};

const checkForValidProductId = (req, res, next) => {
  if (isNaN(req.params.id)) {
    return res.status(500).send({ error: "Invalid id param" });
  }
  console.log("First validation : OK");
  next();
};

router.get("/", prepareData, async (request, response) => {
  try {
    return response.send(request.products);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

router.get(
  "/:id",
  checkForValidProductId,
  prepareData,
  async (request, response) => {
    console.log("Response function : OK");
    try {
      const product = request.products.find(el => el.id == request.params.id);

      if (product) {
        return response.send(product);
      }

      return response.status(404).send({ message: "No product found" });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error.message);
    }
  }
);

router.post("/", prepareData, async (request, response) => {
  try {
    const params = request.body.product;
    if (params) {
      const newProduct = {
        ...params,
        id: STARTING_ID++
      };

      request.products.push(newProduct);
      await writeFileAsync(filePath, JSON.stringify(request.products));

      return response.send(newProduct);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

/**
 * Modificare produs existent
 */
router.put("/", async (request, response) => {});

/**
 * Stergere produs existent
 */
router.delete("/:id", async (request, response) => {});

module.exports = router;
