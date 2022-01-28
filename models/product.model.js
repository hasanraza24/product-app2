const mongoose = require("../db/dbconnection");
const createError = require("http-errors");
const Category = require("./category.model");

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            index: {
                unique: true,
            },
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        categoryId: {
            type: mongoose.Types.ObjectId,
            required: true,
        },
    },
    { timestamps: true },
);

productSchema.pre("save", async function (err, res, next) {
    const category = await Category.findById(this.categoryId);
    if (!category) {
        const error = createError(400, "Not correct category");
        return next(error);
    }
    return next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
