const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
require('dotenv').config();


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    emailId: {
        type: String,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
    },
    age: {
        type: Number
    }
}, {
    timestamps: true
});

userSchema.methods.validatePassword = async function (userInputPassord) {
    const storedUserInput = this;
    const isValid = await bcrypt.compare(userInputPassord, storedUserInput.password);
    return isValid;
}

userSchema.methods.getJwtToken = async function () {
    const loggedinUser = this;
    const privateKey = process.env.PRIVATE_KEY;
    const jwttoken = await jwt.sign({ id: loggedinUser._id }, privateKey, { expiresIn:"15m" });
    return jwttoken;
}

const user = mongoose.model("Users", userSchema);

module.exports = user;