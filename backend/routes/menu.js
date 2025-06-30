const express = require("express");
const { deleteImageByUrl } = require("../utils/cloudinary");

// Middlewares
const catchAsync = require("../utils/catchAsync");
const validateWithJoi = require("../middlewares/validateWithJoi");
const validateObjectId = require("../middlewares/validateObjectId");
const isAuthenticated = require("../middlewares/isAuthenticated");
const authorizeRoles = require("../middlewares/authorizeRoles");

// Schemas
const {
    menuItemSchema,
    menuItemUpdateSchema,
    menuCategorySchema,
    menuCategoryUpdateSchema,
    userSchema,
} = require("../utils/joiSchemas");

// Utility Functions
const AppError = require("../utils/AppError");

// Mongoose Models
const MenuItem = require("../models/MenuItem");
const MenuCategory = require("../models/MenuCategory");

const router = express.Router();

// GET all menu categories
router.get(
    "/categories",
    catchAsync(async (req, res) => {
        const categories = await MenuCategory.find().sort({ sortOrder: 1 });
        res.status(200).json(categories);
    })
);

// GET single menu category
router.get(
    "/categories/:id",
    validateObjectId("id"),
    catchAsync(async (req, res, next) => {
        const category = await MenuCategory.findById(req.params.id);
        if (!category) {
            return next(new AppError("Category not found", 404));
        }
        res.status(200).json(category);
    })
);

// CREATE a menu category
router.post(
    "/categories",
    isAuthenticated,
    authorizeRoles("admin"),
    validateWithJoi(menuCategorySchema),
    catchAsync(async (req, res) => {
        const { name, imageUrl, sortOrder } = req.body;
        const exists = await MenuCategory.findOne({ name });
        if (exists) {
            return res
                .status(409)
                .json({ error: "Category with this name already exists." });
        }

        // Check if sortOrder is already taken
        await MenuCategory.updateMany(
            { sortOrder: { $gte: sortOrder } },
            { $inc: { sortOrder: 1 } }
        );

        const newCategory = new MenuCategory({ name, imageUrl, sortOrder });
        await newCategory.save();
        res.status(201).json(newCategory);
    })
);

// UPDATE a menu category
router.put(
    "/categories/:id",
    isAuthenticated,
    authorizeRoles("admin"),
    validateObjectId("id"),
    validateWithJoi(menuCategoryUpdateSchema),
    catchAsync(async (req, res, next) => {
        const { id } = req.params;
        const incomingImageUrl = req.body.imageUrl;

        const existing = await MenuCategory.findById(id);
        if (!existing) {
            return next(new AppError("Category not found", 404));
        }

        // If image URL has changed, delete old one from Cloudinary
        if (existing.imageUrl && existing.imageUrl !== incomingImageUrl) {
            await deleteImageByUrl(existing.imageUrl);
        }

        const updated = await MenuCategory.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json(updated);
    })
);

// DELETE a menu category
router.delete(
    "/categories/:id",
    isAuthenticated,
    authorizeRoles("admin"),
    validateObjectId("id"),
    catchAsync(async (req, res, next) => {
        const { id } = req.params;

        // Check if any menu items use this category
        const linkedItemsCount = await MenuItem.countDocuments({
            category: id,
        });

        if (linkedItemsCount > 0) {
            return res.status(400).json({
                error: `Cannot delete category: it is used by ${linkedItemsCount} menu item(s).`,
            });
        }

        const deleted = await MenuCategory.findByIdAndDelete(id);

        // Deleting category image from Cloudinary
        if (deleted?.imageUrl) {
            await deleteImageByUrl(deleted.imageUrl);
        }

        if (!deleted) {
            return next(new AppError("Category not found", 404));
        }

        res.status(200).json({ message: "Category deleted successfully" });
    })
);

// GET All Menu Items
router.get(
    "/",
    catchAsync(async (req, res) => {
        const menuItems = await MenuItem.find({}).sort({ _id: -1 });
        res.json(menuItems);
    })
);

// GET Single Menu Item with ID
router.get(
    "/:id",
    validateObjectId("id"),
    catchAsync(async (req, res) => {
        const { id } = req.params;
        const menuItem = await MenuItem.findById(id);
        res.json(menuItem);
    })
);

// POST New Menu Item
router.post(
    "/",
    isAuthenticated,
    authorizeRoles("admin"),
    validateWithJoi(menuItemSchema),
    catchAsync(async (req, res) => {
        const newMenuItem = new MenuItem(req.body);
        await newMenuItem.save();
        // Responding with newly created menu item json
        res.status(201).json(newMenuItem);
    })
);

// Update a Menu Item
router.put(
    "/:id",
    isAuthenticated,
    authorizeRoles("admin"),
    validateObjectId("id"),
    validateWithJoi(menuItemUpdateSchema),
    catchAsync(async (req, res, next) => {
        const { id } = req.params;
        const incomingImageUrl = req.body.imageUrl;

        const existing = await MenuItem.findById(id);
        if (!existing) {
            return next(new AppError("Menu Item not found", 404));
        }

        // If image URL has changed, delete old one from Cloudinary
        if (existing.imageUrl && existing.imageUrl !== incomingImageUrl) {
            await deleteImageByUrl(existing.imageUrl);
        }

        const updatedMenuItem = await MenuItem.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json(updatedMenuItem);
    })
);

// Delete a Menu Item
router.delete(
    "/:id",
    isAuthenticated,
    authorizeRoles("admin"),
    validateObjectId("id"),
    catchAsync(async (req, res) => {
        const { id } = req.params;
        const deletedItem = await MenuItem.findByIdAndDelete(id);
        // Deleting Image From Cloudinary
        if (deletedItem?.imageUrl) {
            await deleteImageByUrl(deletedItem.imageUrl);
        }
        res.status(200).json({
            message: "Menu Item Deleted Successfully",
        });
    })
);

module.exports = router;
