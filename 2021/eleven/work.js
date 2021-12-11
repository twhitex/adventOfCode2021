"use strict";
exports.__esModule = true;
var helper_1 = require("../../helper/helper");
var sample = "\n5483143223\n2745854711\n5264556173\n6141336146\n6357385478\n4167524645\n2176841721\n6882881134\n4846848554\n5283751526";
var smallSample = "\n11111\n19991\n19191\n19991\n11111";
var logMap = function (map, length) {
    var newStr = "";
    map.forEach(function (v, k) {
        newStr += v.toString() + ((k + 1) % length == 0 ? "\n" : "");
    });
    console.log(newStr);
};
var findFlashes = function (str, steps) {
    var split = str.split("\n").filter(function (i) { return i; });
    var lineLength = split[0].length;
    var map = new Map(), base = 0;
    split.forEach(function (l) {
        if (l)
            (0, helper_1.stringToArray)(l).forEach(function (c, i) {
                map.set(i + base, Number(c));
            });
        base += l.length;
    });
    var i = 0, flashes = 0;
    while (i < steps) {
        flashes += step(map, lineLength);
        logMap(map, lineLength);
        i++;
    }
    return flashes;
};
var step = function (map, lineLength) {
    var triggerActions = [];
    var flashCount = 0;
    map.forEach(function (v, k) {
        if (v + 1 == 10) {
            map.set(k, 0);
            flashCount++;
            triggerActions.push(k);
        }
        else {
            map.set(k, v + 1);
        }
    });
    triggerActions.forEach(function (t) { return flashCount += trigger(map, t, lineLength); });
    return flashCount;
};
var trigger = function (map, idx, length) {
    var l = idx - 1;
    var r = idx + 1;
    var flashCount = 0;
    flashCount += setCube(map, l - length, length); //topleft
    flashCount += setCube(map, idx - length, length); //top
    flashCount += setCube(map, r - length, length); //topright
    flashCount += setCube(map, l, length); //left
    // flashCount += setCube(map, idx, length) //center
    flashCount += setCube(map, r, length); //right
    flashCount += setCube(map, l + length, length); //botleft
    flashCount += setCube(map, idx + length, length); //bot
    flashCount += setCube(map, r + length, length); //botright
    return flashCount;
};
var setCube = function (map, idx, length) {
    var val = map.get(idx);
    if (!val)
        return 0;
    if (val + 1 == 10) {
        map.set(idx, 0);
        return trigger(map, idx, length) + 1;
    }
    map.set(idx, val + 1);
    return 0;
};
console.log("p1", findFlashes(sample, 3));
