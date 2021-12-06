"use strict";
exports.__esModule = true;
var helper_1 = require("../../helper/helper");
var input_1 = require("./input");
var log = console.log;
log("day five");
var coordDict = {};
var partOneTotal = 0;
var partTwoTotal = 0;
input_1.input.split("\n").forEach(function (row) {
    var rowSplit = row.split(",");
    var y1x2 = rowSplit[1].split("->");
    var x1 = Number(rowSplit[0]), y1 = Number(y1x2[0]), x2 = Number(y1x2[1]), y2 = Number(rowSplit[2]);
    if (x1 == x2 || y1 == y2) {
        switch (Math.abs(x1 - x2) > 0 ? "x" : "y") {
            case "y":
                (0, helper_1.stringBuilder)(Math.abs(y1 - y2) + 1, y1 > y2 ? y2 : y1)
                    .split(",")
                    .forEach(function (ele) {
                    var key = "".concat(x1, ",").concat(ele);
                    (0, helper_1.safeSet)(coordDict, key, 0);
                    coordDict[key]++;
                    if (coordDict[key] == 2)
                        partOneTotal++;
                });
                break;
            case "x":
                (0, helper_1.stringBuilder)(Math.abs(x1 - x2) + 1, x1 > x2 ? x2 : x1)
                    .split(",")
                    .forEach(function (ele) {
                    var key = "".concat(ele, ",").concat(y1);
                    (0, helper_1.safeSet)(coordDict, key, 0);
                    coordDict[key]++;
                    if (coordDict[key] == 2)
                        partOneTotal++;
                });
                break;
        }
    }
    // comment out block for part one
    else {
        var ySb_1 = y1 > y2 ? (0, helper_1.stringBuilderNeg)(y1 - y2 + 1, y1).split(",") : (0, helper_1.stringBuilder)(y2 - y1 + 1, y1).split(",");
        (x1 > x2 ? (0, helper_1.stringBuilderNeg)(x1 - x2 + 1, x1).split(",") : (0, helper_1.stringBuilder)(x2 - x1 + 1, x1).split(","))
            .forEach(function (item, i) {
            var key = "".concat(item, ",").concat(ySb_1[i]);
            (0, helper_1.safeSet)(coordDict, key, 0);
            coordDict[key]++;
            if (coordDict[key] == 2)
                partTwoTotal++;
        });
    }
});
// log('part one', partOneTotal) //7468
log('part two', partTwoTotal + partOneTotal); //22364 
