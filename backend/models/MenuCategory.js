// models/MenuCategory.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menuCategorySchema = new Schema(
    {
        name: { type: String, required: true, unique: true }, // e.g. "Burgers"
        imageUrl: { type: String, required: true }, // horizontal banner image
        sortOrder: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("MenuCategory", menuCategorySchema);
