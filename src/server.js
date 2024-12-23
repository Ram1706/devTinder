const express = require("express");
const connectDB = require("./config/database");

const PORT = 7777;
const app = express();

app.use("/test", (req, res) => {
    console.log("App is running");
    res.end();
});

connectDB().then(() => {
    console.log("DB is connected successfully");
    app.listen(PORT, () => {
        console.log("Application is running in PORT " + PORT);
    });
}).catch((e) => {
    console.log("DB is not connected" + e.message);
})

app.use("/", (err, req, res, next) => {
    if (err) {
        return res.status(400).send("Something went wrong!")
    }
})
