const Joi = require('joi');
const { assign } = require('lodash');

const authBody = {
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
};

const userBody = {
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(20).required()
}

const auth = assign({}, { body: Joi.object(authBody) });
const create = assign({}, { body: Joi.object(userBody) });

module.exports = {
  auth,
  create
};