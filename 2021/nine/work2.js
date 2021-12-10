"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var helper_1 = require("../../helper/helper");
var input_1 = require("./input");
var sample = "2199943210\n3987894921\n9856789892\n8767896789\n9899965678";
//find lowpoints
var split = input_1.input.split("\n").filter(function (item) { return item; });
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
                    lowestPointArr.push({ val: val, idx: idx, line: i });
                    return;
                }
                if (idx == charArr.length - 1 && val < nextLineCharArr[idx] && val < charArr[idx - 1]) { //end
                    lowestPointArr.push({ val: val, idx: idx, line: i });
                    return;
                }
                if (val < nextLineCharArr[idx] && val < charArr[idx - 1] && val < charArr[idx + 1]) {
                    lowestPointArr.push({ val: val, idx: idx, line: i });
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
                    lowestPointArr.push({ val: val, idx: idx, line: i });
                    return;
                }
                if (idx == charArr.length - 1 && val < prevLineCharArr[idx] && val < charArr[idx - 1]) { //end
                    lowestPointArr.push({ val: val, idx: idx, line: i });
                    return;
                }
                if (val < prevLineCharArr[idx] && val < charArr[idx - 1] && val < charArr[idx + 1])
                    lowestPointArr.push({ val: val, idx: idx, line: i });
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
                    lowestPointArr.push({ val: val, idx: idx, line: i });
                    return;
                }
                if (idx == charArr.length - 1 && val < prevLineCharArr[idx] && val < nextLineCharArr[idx] && val < charArr[idx - 1]) { //end
                    lowestPointArr.push({ val: val, idx: idx, line: i });
                    return;
                }
                if (val < prevLineCharArr[idx] && val < nextLineCharArr[idx] && val < charArr[idx - 1] && val < charArr[idx + 1])
                    lowestPointArr.push({ val: val, idx: idx, line: i });
                return;
            });
            break;
    }
});
var checkPoint = function (idx, lineIdx, line) {
    if (!line)
        return null;
    if (["9", undefined].includes(line[idx]))
        return null;
    return { val: line[idx], idx: idx, line: lineIdx };
};
var findBasinForPoint = function (pt, input) {
    return [
        checkPoint(pt.idx, pt.line - 1, input[pt.line - 1]),
        checkPoint(pt.idx + 1, pt.line, input[pt.line]),
        checkPoint(pt.idx, pt.line + 1, input[pt.line + 1]),
        checkPoint(pt.idx - 1, pt.line, input[pt.line]) //left
    ];
};
var basinIteration = function (pt, input, keys) {
    var basinPlot = [];
    var next = findBasinForPoint(pt, input).filter(function (i) { return i; });
    if (next.length == 0)
        return null;
    if (keys && next.filter(function (n) { return keys.includes(n.line.toString() + n.idx.toString()); }).length == 0)
        return null;
    keys !== null && keys !== void 0 ? keys : (keys = []);
    keys.push(pt.line.toString() + pt.idx.toString());
    next.forEach(function (p) {
        var key = p.line.toString() + p.idx.toString();
        if (!keys.includes(key)) {
            basinPlot.push(p);
            var nextP = basinIteration({ val: null, idx: p.idx, line: p.line }, input, keys);
            if (nextP)
                basinPlot.push.apply(basinPlot, nextP);
        }
    });
    return basinPlot;
};
var basinFinder = function (ptArr, input) {
    var map = new Map();
    ptArr.forEach(function (p) {
        var basin = basinIteration(p, input); //want an array of all points here
        map.set(p.line.toString() + p.idx.toString(), __spreadArray([p], basin, true));
    });
    var large1 = 0;
    var large2 = 0;
    var large3 = 0;
    map.forEach(function (v, k) {
        if (v.length > large1) {
            large3 = large2;
            large2 = large1;
            large1 = v.length;
        }
        else if (v.length > large2) {
            large3 = large2;
            large2 = v.length;
        }
        else if (v.length > large3)
            large3 = v.length;
    });
    return large1 * large2 * large3;
};
console.log("part two", basinFinder(lowestPointArr, split));
