const Joi = require("joi");
const { assign } = require("lodash");

const productCreateBody = {
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    categoryId: Joi.string()
        .regex(/^[a-f\d]{24}$/i)
        .required(),
};

const updateCreateBody = {
    name: Joi.string(),
    description: Joi.string(),
    price: Joi.number(),
};

const create = assign({}, { body: Joi.object(productCreateBody) });
const update = assign({}, { body: Joi.object(updateCreateBody) });

module.exports = {
    update,
    create,
};
