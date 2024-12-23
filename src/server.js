const express = require("express");

const PORT = 7777;

const app = express();

app.use("/test", (req, res) => {
    res.send("Hello , I am  from server");
    res.end();
})

app.listen(PORT, () => {
    console.log("SERVER is running in PORT " + PORT);
})