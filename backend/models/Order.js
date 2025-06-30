// models/Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        items: [
            {
                menuItem: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "MenuItem",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },
            },
        ],
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        deliveryAddress: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: [
                "pending",
                "accepted",
                "preparing",
                "out-for-delivery",
                "delivered",
                "cancelled",
            ],
            default: "pending",
        },
        paymentStatus: {
            type: String,
            enum: ["unpaid", "paid"],
            default: "unpaid",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
