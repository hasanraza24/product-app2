const express = require("express");
const router = express.Router();
const userRouter = require("./users");
const categoryRouter = require("./category");

router.use("/users", userRouter);
router.use("/categories", categoryRouter);

module.exports = router;
