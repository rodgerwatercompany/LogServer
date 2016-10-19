var WebSocketServer = require("ws").Server;
var http = require("http");
var express = require("express");
var app = express();
var port = 13000;

// Initial Server
app.use(express.static(__dirname + "/"));

var server = http.createServer(app);
server.listen(port);

console.log("http server listening on %d", port);

var wss = new WebSocketServer({ server: server });
console.log("websocket server created");


wss.on('connection', function open(ws) {

    var client = {};
    client.AccountName = "";
    client.MachineName = "";
    client.GameName = "";

    ws.send("Server say hi!");
    console.log("connect");

    ws.on("message", function (msg) {
        console.log("msg : " + msg);
    });

    ws.on("close", function () {

        console.log("Close");
    });
});
