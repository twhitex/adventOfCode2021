"use strict";
exports.__esModule = true;
var helper_1 = require("../../helper/helper");
var input_1 = require("./input");
var sample = "2199943210\n3987894921\n9856789892\n8767896789\n9899965678";
//find lowpoints
var split = input_1.workInput.split("\n").filter(function (item) { return item; });
var lowestPointArr = [];
split.forEach(function (r, i) {
    var charArr = (0, helper_1.stringToArray)(r);
    //line below or above (if one last i)
    var nextLineCharArr = [];
    var prevLineCharArr = [];
    var action;
    if (i == split.length - 1) {
        prevLineCharArr = (0, helper_1.stringToArray)(split[i - 1]);
        action = "end";
    }
    else if (i == 0) {
        nextLineCharArr = (0, helper_1.stringToArray)(split[1]);
        action = "start";
    }
    else {
        prevLineCharArr = (0, helper_1.stringToArray)(split[i - 1]);
        nextLineCharArr = (0, helper_1.stringToArray)(split[i + 1]);
        action = "middle";
    }
    switch (action) {
        case "start":
            //2199943210
            //3987894921
            charArr.forEach(function (val, idx) {
                if (idx == 0 && val < nextLineCharArr[idx] && val < charArr[idx + 1]) { // beginnning
                    //is lowest point
                    lowestPointArr.push({ val: val, idx: idx + 1, line: i });
                    return;
                }
                if (idx == charArr.length - 1 && val < nextLineCharArr[idx] && val < charArr[idx - 1]) { //end
                    lowestPointArr.push({ val: val, idx: idx + 1, line: i });
                    return;
                }
                if (val < nextLineCharArr[idx] && val < charArr[idx - 1] && val < charArr[idx + 1]) {
                    lowestPointArr.push({ val: val, idx: idx + 1, line: i });
                }
                return;
            });
            break;
        case "end":
            // 8767896789
            // 9899965678
            charArr.forEach(function (val, idx) {
                if (idx == 0 && val < prevLineCharArr[idx] && val < charArr[idx + 1]) { // beginnning
                    //is lowest point
                    lowestPointArr.push({ val: val, idx: idx + 1, line: i });
                    return;
                }
                if (idx == charArr.length - 1 && val < prevLineCharArr[idx] && val < charArr[idx - 1]) { //end
                    lowestPointArr.push({ val: val, idx: idx + 1, line: i });
                    return;
                }
                if (val < prevLineCharArr[idx] && val < charArr[idx - 1] && val < charArr[idx + 1])
                    lowestPointArr.push({ val: val, idx: idx + 1, line: i });
                return;
            });
            break;
        case "middle":
            // 2199943210
            // 3987894921
            // 9856789892
            charArr.forEach(function (val, idx) {
                if (idx == 0 && val < prevLineCharArr[idx] && val < nextLineCharArr[idx] && val < charArr[idx + 1]) { // beginnning
                    //is lowest point
                    lowestPointArr.push({ val: val, idx: idx + 1, line: i });
                    return;
                }
                if (idx == charArr.length - 1 && val < prevLineCharArr[idx] && val < nextLineCharArr[idx] && val < charArr[idx - 1]) { //end
                    lowestPointArr.push({ val: val, idx: idx + 1, line: i });
                    return;
                }
                if (val < prevLineCharArr[idx] && val < nextLineCharArr[idx] && val < charArr[idx - 1] && val < charArr[idx + 1])
                    lowestPointArr.push({ val: val, idx: idx + 1, line: i });
                return;
            });
            break;
    }
});
var partOneAnswer = 0;
lowestPointArr.forEach(function (p) {
    partOneAnswer += Number(p.val) + 1;
});
console.log("part one", partOneAnswer);
