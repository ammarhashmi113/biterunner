// utils/joiSchemas.js

const Joi = require("joi");

// Menu Schemas
const menuItemSchema = Joi.object({
    name: Joi.string().min(2).max(100).required().messages({
        "string.base": "Name must be a string.",
        "string.empty": "Name is required.",
        "string.min": "Name must be at least 2 characters.",
        "any.required": "Name is required.",
    }),

    description: Joi.string().allow("").max(500).messages({
        "string.max": "Description must be under 500 characters.",
    }),

    price: Joi.number().positive().required().messages({
        "number.base": "Price must be a number.",
        "number.positive": "Price must be a positive value.",
        "any.required": "Price is required.",
    }),

    imageUrl: Joi.string().uri().allow("").messages({
        "string.uri": "Image URL must be a valid URI.",
    }),

    isAvailable: Joi.boolean().default(true),
    category: Joi.string().hex().length(24).required().messages({
        "string.hex": "Category ID must be a valid ObjectId.",
        "string.length": "Category ID must be 24 characters.",
        "any.required": "Category is required.",
    }),
});

const menuItemUpdateSchema = Joi.object({
    name: Joi.string().min(2).max(100),
    description: Joi.string().allow("").max(500),
    price: Joi.number().positive(),
    imageUrl: Joi.string().uri().allow(""),
    isAvailable: Joi.boolean(),
    category: Joi.string().hex().length(24).messages({
        "string.hex": "Category ID must be a valid ObjectId.",
        "string.length": "Category ID must be 24 characters.",
    }),
});

const menuCategorySchema = Joi.object({
    name: Joi.string().min(2).max(50).required().messages({
        "string.base": "Category name must be a string.",
        "string.min": "Category name must be at least 2 characters.",
        "string.max": "Category name must be less than 50 characters.",
        "any.required": "Category name is required.",
    }),
    imageUrl: Joi.string().uri().allow("").required().messages({
        "string.uri": "Image URL must be a valid URI.",
    }),
    sortOrder: Joi.number().integer().min(0).required().messages({
        "number.base": "Sort order must be a number.",
        "number.integer": "Sort order must be an integer.",
        "number.min": "Sort order must be 0 or higher.",
        "any.required": "Sort order is required.",
    }),
});

const menuCategoryUpdateSchema = Joi.object({
    name: Joi.string().min(2).max(50).messages({
        "string.base": "Category name must be a string.",
        "string.min": "Category name must be at least 2 characters.",
        "string.max": "Category name must be less than 50 characters.",
    }),
    imageUrl: Joi.string().uri().allow("").messages({
        "string.uri": "Image URL must be a valid URI.",
    }),
    sortOrder: Joi.number().integer().min(0).messages({
        "number.base": "Sort order must be a number.",
        "number.integer": "Sort order must be an integer.",
        "number.min": "Sort order must be 0 or higher.",
    }),
});

// User Schemas
const userSchema = Joi.object({
    username: Joi.string().min(3).max(30).required().messages({
        "string.base": "Username must be a string.",
        "string.empty": "Username is required.",
        "string.min": "Username must be at least 3 characters.",
        "any.required": "Username is required.",
    }),
    email: Joi.string().email().required().messages({
        "string.base": "Email must be a string.",
        "string.email": "Email must be a valid email address.",
        "any.required": "Email is required.",
    }),
    password: Joi.string().min(6).required().messages({
        "string.base": "Password must be a string.",
        "string.min": "Password must be at least 6 characters.",
        "any.required": "Password is required.",
    }),
    phoneNumber: Joi.string()
        .pattern(/^03[0-9]{9}$/)
        .required()
        .messages({
            "any.required": "Phone number is required.",
            "string.pattern.base":
                "Phone number must be a valid Pakistani number (e.g., 03XXXXXXXXX)",
        }),
    role: Joi.string().valid("user", "admin").optional().messages({
        "any.only": "Role must be one of: user, admin.",
    }),
});

const userLoginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.base": "Email must be a string.",
        "string.email": "Please enter a valid email address.",
        "any.required": "Email is required.",
    }),
    password: Joi.string().required().messages({
        "string.base": "Password must be a string.",
        "any.required": "Password is required.",
    }),
});

const changePasswordSchema = Joi.object({
    oldPassword: Joi.string().required().messages({
        "string.empty": "Old password is required.",
        "any.required": "Old password is required.",
    }),
    newPassword: Joi.string().min(6).required().messages({
        "string.min": "New password must be at least 6 characters.",
        "any.required": "New password is required.",
    }),
});

const profileUpdateSchema = Joi.object({
    username: Joi.string().min(3).max(30),
    phoneNumber: Joi.string().pattern(/^03[0-9]{9}$/),
});

// Order Schemas
const orderSchema = Joi.object({
    items: Joi.array()
        .items(
            Joi.object({
                menuItem: Joi.string().hex().length(24).required().messages({
                    "any.required": "Menu item ID is required",
                }),
                quantity: Joi.number().integer().min(1).required().messages({
                    "number.base": "Quantity must be a number",
                    "number.min": "Quantity must be at least 1",
                }),
            })
        )
        .min(1)
        .required(),

    deliveryAddress: Joi.string().min(5).required().messages({
        "string.empty": "Delivery address is required",
        "string.min": "Delivery address should be at least 5 characters",
    }),

    phoneNumber: Joi.string()
        .pattern(/^03\d{9}$/)
        .required()
        .messages({
            "string.pattern.base":
                "Phone number must be a valid Pakistani number (e.g., 03XXXXXXXXX)",
            "any.required": "Phone number is required",
        }),
});

module.exports = {
    menuItemSchema,
    menuItemUpdateSchema,
    menuCategorySchema,
    menuCategoryUpdateSchema,
    userSchema,
    userLoginSchema,
    changePasswordSchema,
    profileUpdateSchema,
    orderSchema,
};
