// routes/orders.js
const express = require("express");
const router = express.Router();

const isAuthenticated = require("../middlewares/isAuthenticated");
const authorizeRoles = require("../middlewares/authorizeRoles");
const validateWithJoi = require("../middlewares/validateWithJoi");
const validateObjectId = require("../middlewares/validateObjectId");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const { orderSchema } = require("../utils/joiSchemas");
const Order = require("../models/Order");

// Get all orders (admin)
router.get(
    "/",
    isAuthenticated,
    authorizeRoles("admin"),
    catchAsync(async (req, res) => {
        const orders = await Order.find()
            .populate("items.menuItem")
            .populate("customer");
        res.json(orders);
    })
);

// Get my orders (user)
router.get(
    "/my",
    isAuthenticated,
    catchAsync(async (req, res) => {
        const orders = await Order.find({ customer: req.user._id }).populate(
            "items.menuItem"
        );
        res.json(orders);
    })
);

// Get a single order by ID
router.get(
    "/:id",
    isAuthenticated,
    validateObjectId("id"),
    catchAsync(async (req, res, next) => {
        const order = await Order.findById(req.params.id)
            .populate("items.menuItem")
            .populate("customer");

        if (!order) return next(new AppError("Order not found", 404));

        // Make sure the user can only view their own order (unless admin)
        if (
            order.customer._id.toString() !== req.user._id.toString() &&
            req.user.role !== "admin"
        ) {
            return next(new AppError("Unauthorized access", 403));
        }

        res.json(order);
    })
);

// Create new order
router.post(
    "/",
    isAuthenticated,
    validateWithJoi(orderSchema),
    catchAsync(async (req, res) => {
        const { _id } = req.user;
        const newOrder = new Order({
            ...req.body,
            customer: _id,
        });

        await newOrder.save();
        res.status(201).json(newOrder);
    })
);

// Update order status (admin only)
router.put(
    "/:id/status",
    isAuthenticated,
    authorizeRoles("admin"),
    validateObjectId("id"),
    catchAsync(async (req, res) => {
        const { id } = req.params;
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        );

        if (!order) return res.status(404).json({ error: "Order not found" });

        res.json(order);
    })
);

module.exports = router;
