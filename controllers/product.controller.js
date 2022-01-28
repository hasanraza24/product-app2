const Product = require("../models/product.model");
const _ = require("lodash");
const createError = require("http-errors");

const create = async (req, res, next) => {
    try {
        const newProduct = new Product(req.body);
        const product = await newProduct.save();
        res.json({ data: { product }, message: "Product created" });
    } catch (e) {
        next(e);
    }
};

const update = async (req, res, next) => {
    try {
        const product = await Product.findOneAndUpdate(
            { _id: req.params.productId },
            { $set: req.body },
            { new: true },
        );
        if (!product) {
            const err = createError(404, "product not found");
            throw err;
        }
        res.json({ data: { product }, message: "Product updated" });
    } catch (e) {
        next(e);
    }
};

const list = async (req, res, next) => {
    try {
        const { limit = 10, skip = 0 } = req.query;
        const query = _.omit(req.query, ["limit", "skip"]);
        const products = await Product.aggregate([
            { $match: query },
            {
                $lookup: {
                    from: "categories",
                    localField: "categoryId",
                    foreignField: "_id",
                    as: "category",
                },
            },
            {
                $unwind: {
                    path: "$category",
                    preserveNullAndEmptyArrays: false,
                },
            },
            { $skip: skip },
            { $limit: limit },
        ]);
        res.json({ data: { products } });
    } catch (e) {
        next(e);
    }
};

const get = async (req, res, next) => {
    try {
        console.log("req.params.productId", req.params.productId);
        const product = await Product.aggregate([
            { $match: { _id: req.params.productId } },
            {
                $lookup: {
                    from: "categories",
                    localField: "categoryId",
                    foreignField: "_id",
                    as: "category",
                },
            },
            {
                $unwind: {
                    path: "$category",
                    preserveNullAndEmptyArrays: false,
                },
            },
        ]);
        console.log("product", product);
        if (!product[0]) {
            const err = createError(404, "product not found");
            throw err;
        }
        res.json({ data: { product: product[0] } });
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
