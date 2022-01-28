const express = require('express');
const userRouter = express.Router();
const userCtlr = require('../controllers/user.controller');
const { validate } = require('express-validation');
const userValidation = require('../validations/user.validation');

userRouter.post('/register', validate(userValidation.create), userCtlr.register);

userRouter.post('/login', validate(userValidation.auth), userCtlr.login);

module.exports = userRouter;