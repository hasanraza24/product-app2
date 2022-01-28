const mongoose = require("../db/dbconnection");
const createError = require("http-errors");

const categorySchema = mongoose.Schema(
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
    },
    { timestamps: true },
);

categorySchema.post("save", (err, res, next) => {
    if (err.code === 11000) {
        const error = createError(400, "User already exist");
        return next(error);
    }
    return next(err);
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
