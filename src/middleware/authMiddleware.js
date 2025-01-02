const jwt = require('jsonwebtoken');
const User = require('../models/User');
require("dotenv").config();

const authMiddleware = async (req, res, next) => {
    try {
        const privateKey = process.env.PRIVATE_KEY;
        debugger;
        const { token } = req?.cookies;
        if (!token) {
            throw new Error("Token is not valid");
        }
        const decodedToken = jwt.verify(token, privateKey);
        if (!decodedToken) {
            throw new Error("Token is not valid");
        }

        const loggedInUser = decodedToken?.id;
        const fetchUser = await User.findOne({ _id: loggedInUser });

        let isAuthorized = false;
        if (fetchUser) {
            isAuthorized = true;
            req.user = fetchUser;
        }

        if (isAuthorized) {
            next();
        } else {
            throw new Error("UnAuthorized user");
        }
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized user" })
    }
}


module.exports = {
    authMiddleware
}