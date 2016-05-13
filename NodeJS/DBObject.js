var mysql = require('mysql');
var moment = require('./moment.js');
var util = require('util');

function DBObject () {

    this.lockpush;

    this.conn;
    this.logList = [];
    this.logQueue = [];
    this.tempQueue = [];

    this.updateID;

    this._init = function() {

        this.conn = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'rodger1234',
            database:'log',
            port: 3309
        });

        this.conn.connect();
        this.updateID = setInterval( this.update , 10000);
    };

    this.update = function() {
        var cmd ='insert into game5044(ID_LOG,AccountName,bFreeGame,FG_Size,bAllCards,AC_ID,bScatter,SC_GridNum,SC_ID,bJackpot,JP_ID)values';

        var i,command;

        if(this.logQueue.length > 0) {

            this.lockpush = true;
            this.logList = this.logQueue;
            this.logQueue = [];
            this.lockpush = false;

            this.tempQueue.forEach(function(item){
                this.logQueue.push(item);
            });

            for(i = 0; i < this.logList.length; i++){
                if(i != this.logList.length - 1) {

                    command = util.format("('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s'),",
                        this.logList[i].ID_LOG,
                        this.logList[i].AccountName,
                        this.logList[i].bFG,
                        this.logList[i].FG_Size,
                        this.logList[i].bAllCards,
                        this.logList[i].AC_ID,
                        this.logList[i].bScatter,
                        this.logList[i].SC_GridNum,
                        this.logList[i].SC_ID,
                        this.logList[i].bJP,
                        this.logList[i].JP_ID);

                }else{

                    command = util.format("('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')",
                        this.logList[i].ID_LOG,
                        this.logList[i].AccountName,
                        this.logList[i].bFG,
                        this.logList[i].FG_Size,
                        this.logList[i].bAllCards,
                        this.logList[i].AC_ID,
                        this.logList[i].bScatter,
                        this.logList[i].SC_GridNum,
                        this.logList[i].SC_ID,
                        this.logList[i].bJP,
                        this.logList[i].JP_ID);

                }
                cmd += command;
            }
            cmd += ";";


            this.logList = [];

            this.conn.query(cmd, function(err, rows, fields) {
                if (err) throw err;
            });
        }
    }.bind(this);

    this.addLog = function(obj) {
        if(this.lockpush){
            this.tempQueue.push(obj);
        }else {
            this.logQueue.push(obj);
        }
    }.bind(this);

    this.release = function() {
        this.conn.end();
    }.bind(this);

    this._init();
};
module.exports = DBObject;