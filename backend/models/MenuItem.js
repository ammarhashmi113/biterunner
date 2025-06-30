//models/MenuItem.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menuItemSchema = new Schema(
    {
        name: { type: String, required: true }, // e.g. "Pepperoni Pizza"
        description: { type: String },
        price: { type: Number, required: true }, // e.g. 999
        imageUrl: { type: String }, // optional image
        isAvailable: { type: Boolean, default: true }, // useful to hide/show items
        category: {
            type: Schema.Types.ObjectId,
            ref: "MenuCategory",
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("MenuItem", menuItemSchema);
