"use strict";
exports.__esModule = true;
var input_1 = require("./input");
var log = console.log;
var treeSquare = "#";
//right 3, down 1
var split = input_1.input.split("\n");
var i = 0, j = 0;
var count = 0;
while (i < split.length) {
    var line = split[i];
    // console.log(j % line.length)
    if (line[j % line.length] == treeSquare)
        count++;
    i += 1;
    j += 3;
}
console.log(count);
