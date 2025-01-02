const mongoose = require('mongoose');
require('dotenv').config();

const DB_NAME = process.env.DB_NAME;
const DB_USER_NAME = process.env.DB_USER_NAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

const dbURI = `mongodb+srv://${DB_USER_NAME}:${DB_PASSWORD}@devtinder.dljfw.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

// Define a function to connect to MongoDB
const connectDB = mongoose.connect(dbURI, {
    family: 4 // Use IPv4, skip trying IPv6
});

// Export the connectDB function for use in other parts of the application
module.exports = { connectDB };