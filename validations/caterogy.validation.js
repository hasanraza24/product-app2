const Joi = require("joi");
const { assign } = require("lodash");

const categoryCreateBody = {
    name: Joi.string().required(),
    description: Joi.string().required(),
};

const updateCreateBody = {
    name: Joi.string(),
    description: Joi.string(),
};

const create = assign({}, { body: Joi.object(categoryCreateBody) });
const update = assign({}, { body: Joi.object(updateCreateBody) });

module.exports = {
    update,
    create,
};
