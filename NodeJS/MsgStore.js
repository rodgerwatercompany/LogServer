
var fs = require('fs');
var moment = require('./moment.js');

function MsgStore () {

    this.data;
    this._init = function(){
        this.date = moment().format('YYYY-MM-DD');
        console.log(this.date);
    };

    this.store = function(gameName,machineName,msg,logID){
        var path = "C:/Users/rodger_chen/Desktop/log/" + gameName + "/" + machineName + this.date + ".txt"

        var data = logID + " " + msg + "\r\n";

        fs.appendFile(path, data, function(err) {
            if(err) {
                console.log(err);
            }
        });
    }.bind(this);;

    this._init();
};

module.exports = MsgStore;