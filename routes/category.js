const express = require("express");
const categoryRouter = express.Router();
const categoryCtlr = require("../controllers/category.controller");
const { validate } = require("express-validation");
const categoryValidation = require("../validations/caterogy.validation");

categoryRouter.post(
    "/",
    validate(categoryValidation.create),
    categoryCtlr.create,
);

categoryRouter.put(
    "/:categoryId",
    validate(categoryValidation.update),
    categoryCtlr.update,
);

categoryRouter.get("/:categoryId", categoryCtlr.get);

categoryRouter.get("/", categoryCtlr.list);

module.exports = categoryRouter;
