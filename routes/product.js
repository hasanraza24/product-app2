const express = require("express");
const productRouter = express.Router();
const productCtlr = require("../controllers/product.controller");
const { validate } = require("express-validation");
const productValidation = require("../validations/product.validation");

productRouter.post("/", validate(productValidation.create), productCtlr.create);

productRouter.put(
    "/:productId",
    validate(productValidation.update),
    productCtlr.update,
);

productRouter.get("/:productId", productCtlr.get);

productRouter.get("/", productCtlr.list);

module.exports = productRouter;
