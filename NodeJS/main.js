var WebSocketServer = require("ws").Server;
var http = require("http");
var express = require("express");
var app = express();
var port = 13000;

var MsgStore = require("./MsgStore.js");


var moment = require('./moment.js');

// Initial Server
app.use(express.static(__dirname + "/"));

var server = http.createServer(app);
server.listen(port);

console.log("http server listening on %d", port);

var wss = new WebSocketServer({server: server});
console.log("websocket server created");

var msgStore = new MsgStore();

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

                var str_logInfo = "*****************************" + "\r\n";
                str_logInfo += (client.AccountName + " have Inited !" + "\r\n" + "client.MachineName : " + client.MachineName + "\r\n"
                + "client.GameName : " + client.GameName + "\r\n" + client.MachineName + " login time : " + moment().format('HH:mm:sss YYYY-MM-DD') + "\r\n");
                str_logInfo += "*****************************" + "\r\n";

                console.log(str_logInfo);

                //console.log(client.AccountName + " have Inited !");
                //console.log("client.MachineName : " + client.MachineName);
                //console.log("client.GameName : " + client.GameName);
                //console.log(client.MachineName + " login time : " + moment().format('HH:mm:sss YYYY-MM-DD'));
                break;
            case 1:
                msgStore.store(client.GameName,client.MachineName,msgObj.msg);
                break;
            case 2:
                if(msgObj['AccountName'] != null) {
                    msgStore.store(client.GameName,client.MachineName,msgObj.msg , msgObj.logID);

                    if (msgObj.logID != "") {
                        
                    }
                }
                break;

        }
    });

    ws.on("close", function () {
        
        var str_logoutInfo = "*****************************" + "\r\n";
        str_logoutInfo += (client.MachineName + " websocket connection is close" + "\r\n" + client.MachineName + " left at " + moment().format('HH:mm:sss YYYY-MM-DD') + "\r\n");
        str_logoutInfo += "*****************************" + "\r\n";
        console.log(str_logoutInfo);
    });
});
