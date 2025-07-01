const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken"); // To generate JWT tokens for authentication
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const isAuthenticated = require("../middlewares/isAuthenticated");

// Middlewares
const validateWithJoi = require("../middlewares/validateWithJoi");

// Schemas
const {
    userSchema,
    userLoginSchema,
    changePasswordSchema,
    profileUpdateSchema,
} = require("../utils/joiSchemas");

const router = express.Router();

router.get("/me", isAuthenticated, async (req, res) => {
    // req.user was set by isAuthenticated middleware
    res.json({ user: req.user });
});

router.patch(
    "/me",
    isAuthenticated,
    validateWithJoi(profileUpdateSchema),
    catchAsync(async (req, res, next) => {
        const updates = (({ username, phoneNumber }) => ({
            username,
            phoneNumber,
        }))(req.body);

        const user = await User.findByIdAndUpdate(req.user._id, updates, {
            new: true,
            runValidators: true,
        });

        if (!user) return next(new AppError("User not found", 404));

        res.json({ user });
    })
);

router.post(
    "/register",
    validateWithJoi(userSchema),
    catchAsync(async (req, res, next) => {
        const { username, email, password, phoneNumber } = req.body;

        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return next(new AppError("Email already registered", 400));
        }

        const usernameExists = await User.findOne({ username });
        if (usernameExists) {
            return next(new AppError("Username already in use", 400));
        }

        // Determine role based on .env admin emails
        const adminEmails =
            process.env.ADMIN_EMAILS?.split(",").map((e) => e.trim()) || [];
        const role = adminEmails.includes(email) ? "admin" : "user";

        const user = new User({ username, email, password, phoneNumber, role });
        await user.save();

        // Create JWT token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(201).json({
            status: "success",
            token, // Send the JWT token to the client
        });
    })
);

// Login user
router.post(
    "/login",
    validateWithJoi(userLoginSchema),
    catchAsync(async (req, res, next) => {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return next(new AppError("Invalid email or password", 400));
        }

        // Compare the entered password with the stored hashed password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return next(new AppError("Invalid email or password", 400));
        }

        // Generate JWT token for the user
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d", // Token expiration time
            }
        );

        res.status(200).json({
            status: "success",
            token, // Send the JWT token to the client
        });
    })
);

// Change Password
router.post(
    "/change-password",
    isAuthenticated,
    validateWithJoi(changePasswordSchema),
    catchAsync(async (req, res) => {
        const { oldPassword, newPassword } = req.body;
        const user = await User.findById(req.user._id);
        if (!user || !(await user.comparePassword(oldPassword))) {
            throw new AppError("Incorrect old password", 403);
        }

        user.password = newPassword;
        await user.save();
        res.json({ message: "Password updated successfully." });
    })
);

module.exports = router;
