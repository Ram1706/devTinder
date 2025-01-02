
const express = require("express");
const { signupValidation } = require("../utils/validation");
const User = require("../models/User");
const { authMiddleware } = require("../middleware/authMiddleware");

const profileRouter = express.Router();

profileRouter.get("/profile", authMiddleware, async (req, res, next) => {
    try {
        const loggedInUser = req?.user;
        const data = await User.find({ _id: loggedInUser._id });
        return res.status(200).json({
            message: "Fetching profile data is successfull",
            data
        })

    } catch (error) {
        return res.status(400).json({
            message: "Fetching profile data failed!" + error.message
        })
    }
})


module.exports = {
    profileRouter
}