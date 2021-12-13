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
var sample = "start-A\nstart-b\nA-c\nA-b\nb-d\nA-end\nb-end";
//start -> end
//lowercase letters are small caves
//can only travel through small caves once
var buildMap = function (input) {
    var paths = new Map();
    input.forEach(function (route) {
        var path = route.split("-");
        var p1 = path[0];
        var p2 = path[1];
        var mp1 = paths.get(p1);
        var mp2 = paths.get(p2);
        if (p1 == "start") {
            if (!mp1)
                paths.set(p1, [p2]);
            else
                paths.set(p1, __spreadArray(__spreadArray([], mp1, true), [p2], false));
        }
        else if (p2 == "start") {
            if (!mp2)
                paths.set(p2, [p1]);
            else
                paths.set(p2, __spreadArray(__spreadArray([], mp2, true), [p1], false));
        }
        else {
            if (!mp1)
                paths.set(p1, [p2]);
            else
                paths.set(p1, __spreadArray(__spreadArray([], mp1, true), [p2], false));
            if (!mp2)
                paths.set(p2, [p1]);
            else
                paths.set(p2, __spreadArray(__spreadArray([], mp2, true), [p1], false));
        }
    });
    return paths;
};
var navigate = function (paths) {
    var uniquePaths = [];
    paths.forEach(function (val, key) {
    });
    console.log(uniquePaths);
};
// navigate(buildMap(sample.split("\n")))
var x = function (input) {
    var uniqueCaves = [];
    var split = input.split("\n");
    // const starts = split.filter(item => item.includes("start")).map(str => str.replace("start", "").replace("-", ""))
    var stack = ["start"];
    //keep an array as the 'current' node to search for.. like a stack
    //loop through it until u get to the end .. save that to a string then unravel from there...
    var top = stack[0], depth = 0;
    var oneWayPathsVisited = [];
    var _loop_1 = function () {
        var dCheck = depth;
        split.forEach(function (path) {
            var singlePath = top.match(/a-z/);
            var caves = path.split("-");
            if (caves.includes(top)) {
                top = caves[0] == top ? caves[1] : caves[0];
                stack.push(top);
                depth++;
                return;
            }
            if (dCheck != depth)
                return;
        });
        console.log("depth: ".concat(depth, " - ").concat(stack));
        if (stack[stack.length - 1] == "end") {
            console.log("full path:", stack);
            stack.pop();
        }
        if (stack.length > 10)
            stack = [];
    };
    while (stack.length > 0) {
        _loop_1();
    }
    // console.log(starts)
    //from 'start' how many paths end at 'end' ?
};
var navigate2 = function (starts) {
};
x(sample);
