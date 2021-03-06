"use strict";
exports.__esModule = true;
exports.stringToArray = exports.findLowest = exports.safeSet2 = exports.safeSet = exports.stringBuilderNeg = exports.stringBuilder = exports.sumOfNumArray = void 0;
var sumOfNumArray = function (arr) {
    var total = 0;
    arr.forEach(function (item) { return total += item; });
    return total;
};
exports.sumOfNumArray = sumOfNumArray;
var stringBuilder = function (length, base, log, exclusive) {
    var str = "";
    var i = exclusive ? (base !== null && base !== void 0 ? base : 0) + 1 : base !== null && base !== void 0 ? base : 0;
    var len = exclusive ? length - 1 : length;
    for (var index = i; index < i + len; index++) {
        if (index == i)
            str = index.toString();
        else
            str += ",".concat(index.toString());
    }
    if (log)
        console.log(str);
    return str;
};
exports.stringBuilder = stringBuilder;
var stringBuilderNeg = function (length, base, log) {
    var _a;
    var str = "";
    for (var index = base; index > base - length; index--) {
        if ((_a = index == base) !== null && _a !== void 0 ? _a : 0)
            str = index.toString();
        else
            str += ",".concat(index.toString());
    }
    if (log)
        console.log(str);
    return str;
};
exports.stringBuilderNeg = stringBuilderNeg;
var safeSet = function (dict, key, val) {
    if (!dict[key])
        dict[key] = val;
};
exports.safeSet = safeSet;
var safeSet2 = function (dict, key, val, setType) {
    if (!dict[key])
        dict[key] = val;
    else if (setType)
        switch (setType) {
            case "add":
                dict[key] += val;
                break;
            case "overwrite":
                dict[key] = val;
                break;
        }
};
exports.safeSet2 = safeSet2;
var findLowest = function (map) {
    var key = 0;
    var min = 0;
    map.forEach(function (v, k) {
        if (min == 0)
            min = v;
        if (v < min) {
            min = v;
            key = k;
        }
    });
    return { min: min, key: key };
};
exports.findLowest = findLowest;
var stringToArray = function (str) {
    return Object.keys(str).map(function (key) { return str[key]; });
};
exports.stringToArray = stringToArray;
