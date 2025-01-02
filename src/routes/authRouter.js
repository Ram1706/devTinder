
const express = require("express");
const { signupValidation } = require("../utils/validation");
const User = require("../models/User")

const authRouter = express.Router();

authRouter.post("/signup", async (req, res, next) => {
    try {
        signupValidation(req);
        const { firstName, lastName, emailId, password } = req;

        const userData = new User({
            firstName,
            lastName,
            password,
            emailId
        });

        const data = await userData.save();
        return res.status(200).json({
            message: "User Signup is successfull",
            data
        })

    } catch (error) {
        return res.status(400).json({
            message: "User Signup failed!" + error.message
        })
    }
})


module.exports = {
    authRouter
}