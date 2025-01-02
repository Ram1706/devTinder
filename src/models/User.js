const mongoose = require("mongoose");


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

const user = mongoose.model("Users", userSchema);

module.exports = user;