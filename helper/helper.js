"use strict";
exports.__esModule = true;
exports.sumOfNumArray = void 0;
var sumOfNumArray = function (arr) {
    var total = 0;
    arr.forEach(function (item) { return total += item; });
    return total;
};
exports.sumOfNumArray = sumOfNumArray;
