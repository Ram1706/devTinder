
const express = require("express");
const { signupValidation, loginValidation } = require("../utils/validation");
const User = require("../models/User");
const bcryptjs = require("bcryptjs");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res, next) => {
    try {
        signupValidation(req);
        const { firstName, lastName, emailId, password } = req?.body;

        const hashedpassword = await bcryptjs.hash(password, 10);

        const userData = new User({
            firstName,
            lastName,
            password: hashedpassword,
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
});

authRouter.post("/login", async (req, res, next) => {
    try {
        loginValidation(req);
        const { emailId, password } = req?.body;
        const loggedInUserData = await User.findOne({ emailId });
        if (!loggedInUserData) {
            return res.status(400).json({
                message: "User login failed!"
            })
        }
        const isValidUser = await loggedInUserData.validatePassword(password);
        if (isValidUser) {
            const jwtToken = await loggedInUserData.getJwtToken();
            res.cookie("token", jwtToken);
            return res.status(200).json({
                message: "User Signup is successfull",
            });
        } else {
            return res.status(400).json({
                message: "User login failed!"
            });
        }
    } catch (error) {
        return res.status(400).json({
            message: "User Signup failed!" + error.message
        });
    }
})

authRouter.post("/logout", async (req, res, next) => {
    try {
        res.cookie("token", null);
        return res.status(200).json({
            message: "User Logout is successfull",
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "User Logout is failed!" + error.message
        });
    }
})


module.exports = {
    authRouter
}