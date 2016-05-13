
var fs = require('fs');

fs.appendFile("C:/Users/rodger_chen/Desktop/log/Star97II/writefile1.txt", "Hello!\noutput file\nby Node.js", function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("The file was saved!");
    }
});