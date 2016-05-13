var WebSocketServer = require("ws").Server;
var http = require("http");
var express = require("express");
var app = express();
var port = 13000;

var MsgStore = require("./MsgStore.js");
var DBObject = require("./DBObject.js");


// Initial Server
app.use(express.static(__dirname + "/"));

var server = http.createServer(app);
server.listen(port);

console.log("http server listening on %d", port);

var wss = new WebSocketServer({server: server});
console.log("websocket server created");

var msgStore = new MsgStore();
var dbObject = new DBObject();

wss.on('connection',function open(ws){

    var client ={};
    client.AccountName = "";
    client.MachineName = "";
    client.GameName = "";

    ws.send("Server say hi!");
    ws.on("message",function(msg){


        var msgObj = JSON.parse(msg);
        switch (msgObj.type) {

            case 0:
                client.AccountName = msgObj.AccountName;
                client.MachineName = msgObj.MachineName;
                client.GameName = msgObj.GameName;
                console.log(client.AccountName + " have Inited !");
                console.log("client.MachineName : " + client.MachineName);
                console.log("client.GameName : " + client.GameName);
                break;
            case 1:
                msgStore.store(client.GameName,client.MachineName,msgObj.msg);
                break;
            case 2:
                if(msgObj['AccountName'] != null) {
                    msgStore.store(client.GameName,client.MachineName,msgObj.msg , msgObj.logID);

                    if (msgObj.logID != "") {
                        dbObject.addLog({
                            "ID_LOG": msgObj.logID,
                            "AccountName": msgObj.AccountName,
                            "bFG": msgObj.bFG,
                            "FG_Size": msgObj.bFG_Size,
                            "bAllCards": msgObj.bAllCards,
                            "AC_ID": msgObj.AC_ID,
                            "bScatter": msgObj.bScatter,
                            "SC_GridNum": msgObj.SC_GridNum,
                            "SC_ID": msgObj.SC_ID,
                            "bJP": msgObj.bJP,
                            "JP_ID": msgObj.JP_ID
                        });
                    }
                }
                break;

        }
    });

    ws.on("close",function(){
        console.log("websocket connection is close");
    });
});
