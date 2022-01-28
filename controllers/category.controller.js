var Category = require("../models/category.model");
var jwt = require("jsonwebtoken");
const config = require("../config/config");
var _ = require("lodash");

const create = async (req, res, next) => {
    try {
        const newCategory = new Category(req.body);
        const category = await newCategory.save();
        res.json({ data: { category }, message: "Category created" });
    } catch (e) {
        next(e);
    }
};

const update = async (req, res, next) => {
    try {
        const category = await Category.findOneAndUpdate(
            { _id: req.params.categoryId },
            { $set: req.body },
            { new: true },
        );
        res.json({ data: { category }, message: "Category updated" });
    } catch (e) {
        next(e);
    }
};

const list = async (req, res, next) => {
    try {
        const { limit = 10, skip = 0 } = req.query;
        const query = _.omit(req.query, ["limit", "skip"]);
        const categories = await Category.find(query).skip(skip).limit(limit);
        res.json({ data: { categories } });
    } catch (e) {
        next(e);
    }
};

const get = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.categoryId);
        res.json({ data: { category } });
    } catch (e) {
        next(e);
    }
};

module.exports = {
    create,
    update,
    list,
    get,
};
