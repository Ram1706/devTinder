const mongoose = require("mongoose");

async function connectDB() {
     mongoose.connect('mongodb+srv://ramsksra:Z476Xua8OcSUGANz@devtinder.dljfw.mongodb.net/devTinder');
}

module.exports = connectDB;