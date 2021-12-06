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
//every 7 days
//number of days until it creates a new lanternfish
// const stateDict = {}
//each day 
var sampleInput = [3, 4, 3, 1, 2];
var i = 0;
var dict = new Map();
// input.split(",")
var stateArr = sampleInput.map(function (r) { return Number(r); });
var total = 0;
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
    //write the current state out to a file?
    stateArr = __spreadArray(__spreadArray([], stateArr, true), newFish, true);
    //every 100 indexes write it out to a file..
    i++;
};
while (i < 256) {
    _loop_1();
}
console.log(stateArr.length);
// console.log()
