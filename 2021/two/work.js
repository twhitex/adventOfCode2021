"use strict";
exports.__esModule = true;
var input_1 = require("./input");
//part one
console.log("day two");
var xPos = 0;
var yPos = 0;
input_1.dayTwoInput.split('\n').forEach(function (item) {
    if (item.includes("forward"))
        xPos += Number(item.replace("forward ", ""));
    if (item.includes("down"))
        yPos += Number(item.replace("down ", ""));
    if (item.includes("up"))
        yPos -= Number(item.replace("up ", ""));
});
console.log("part one: ".concat(xPos * yPos));
//part two
var aim = 0;
xPos = 0;
yPos = 0;
input_1.dayTwoInput.split('\n').forEach(function (item) {
    if (item.includes("forward")) {
        var num = Number(item.replace("forward ", ""));
        yPos += aim * num;
        xPos += Number(item.replace("forward ", ""));
    }
    if (item.includes("down"))
        aim += Number(item.replace("down ", ""));
    if (item.includes("up"))
        aim -= Number(item.replace("up ", ""));
});
console.log("part two: ".concat(xPos * yPos));
