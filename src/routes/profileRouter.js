
const express = require("express");
const { signupValidation } = require("../utils/validation");
const User = require("../models/User")

const profileRouter = express.Router();

profileRouter.get("/profile", async (req, res, next) => {
    try {
        const data = await User.find({});
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