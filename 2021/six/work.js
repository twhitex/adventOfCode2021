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
var input_1 = require("./input");
//every 7 days
//number of days until it creates a new lanternfish
// const stateDict = {}
//each day 
var sampleInput = [3, 4, 3, 1, 2];
var i = 0;
var stateArr = input_1.workInput.split(",").map(function (r) { return Number(r); });
var _loop_1 = function () {
    var newFish = [];
    stateArr = stateArr.map(function (r) {
        if (r == 0) {
            newFish.push(8);
            r = 6;
        }
        else
            r--;
        return r;
    });
    stateArr = __spreadArray(__spreadArray([], stateArr, true), newFish, true);
    i++;
};
while (i < 80) {
    _loop_1();
}
console.log("part one", stateArr.length);
