const http = require("http");

const PORT = 7777;


const server = http.createServer(function (req, res) {
    console.log("Server is calling");
    res.end();
});


server.listen(PORT, () => {
    console.log("SERVER is running in PORT " + PORT);
})