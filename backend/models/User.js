const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // For password hashing

// User schema definition
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, "Please fill a valid email address"], // Basic email validation
        },
        password: {
            type: String,
            required: true,
            minlength: 6, // Minimum length for password
        },
        phoneNumber: {
            type: String,
            required: true,
            match: [
                /^03[0-9]{9}$/,
                "Invalid Pakistani phone number (must start with 03 and have 11 digits)",
            ],
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            //enum: ["user", "admin", "rider", "orderManager"],
            default: "user",
        },
    },
    { timestamps: true }
);

// Hash the password before saving (to ensure passwords are not stored in plain text)
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    // Generate a salt and hash the password with bcrypt
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Method to compare entered password with hashed password in DB
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password); // Returns true/false
};

const User = mongoose.model("User", userSchema);

module.exports = User;
