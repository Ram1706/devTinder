const express = require("express");
const { connectDB } = require("./config/database");
const { authRouter } = require("./routes/authRouter");
const { profileRouter } = require("./routes/profileRouter");
const cookieParser= require("cookie-parser");

const PORT = 7777;
const app = express();

// USIng JSON parser to convert into JSON objects
app.use(express.json());

app.use(cookieParser());

app.use("/", (req, res, next) => {
    console.log("wild card route running");
    next();
});

app.use("/", authRouter);

app.use("/", profileRouter);

connectDB
    .then(() => {
        console.log("DB is connected successfully");
        app.listen(PORT, () => {
            console.log("NodeJS Application is running in PORT ", PORT);
        });
        // Start your app or perform other tasks
    })
    .catch((error) => {
        console.error('Could not start app:', error.message);
    });

app.use("/test", (req, res) => {
    console.log("App is running");
    res.end();
});

app.use("/", (err, req, res, next) => {
    if (err) {
        return res.status(400).send("Something went wrong!")
    }
})
