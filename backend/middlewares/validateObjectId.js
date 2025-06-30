// middlewares/validateObjectId.js

const mongoose = require("mongoose");
const AppError = require("../utils/AppError");

module.exports = (paramName = "id") => {
    return (req, res, next) => {
        if (!mongoose.Types.ObjectId.isValid(req.params[paramName])) {
            return next(new AppError(`Invalid ${paramName}`, 400));
        }
        next();
    };
};
