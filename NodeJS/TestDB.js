var mysql = require('mysql');
var moment = require('./moment.js');
var util = require('util');

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rodger1234',
    database:'log',
    port: 3309
});

conn.connect();
console.log("Start Connect DB ...");

//var date = moment().format('YYYY-MM-DD HH:mm:ss');
//var cmd = 'insert into game5837(context,type,DataTime) values("conan",1,"2016-04-14 13:49:35")';
var cmd = 'insert into game5044(ID_LOG,AccountName,bFreeGame,FG_Size,bAllCards,AC_ID,bScatter,SC_GridNum,SC_ID,bJackpot,JP_ID)values' +
    '("STAR97II_20160512024400","mobile003",1,1,1,1,1,1,1,1,1)';

var s = "AAA BBB CCC %s %s";
//s = util.format("AAA BBB CCC %s %s","DDD","EEE");
s = util.format(s,"DDD","EEE");

console.log(s);
console.log(cmd);

conn.query(cmd, function(err, rows, fields) {
    if (err) throw err;
});
conn.end();