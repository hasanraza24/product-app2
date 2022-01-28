const express = require("express");
const router = express.Router();
const userRouter = require("./users");
const categoryRouter = require("./category");
const productRouter = require("./product");

router.use("/users", userRouter);
router.use("/categories", categoryRouter);
router.use("/products", productRouter);

module.exports = router;
