"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var sample = "start-A\nstart-b\nA-c\nA-b\nb-d\nA-end\nb-end";
var sample2 = "dc-end\nHN-start\nstart-kj\ndc-start\ndc-HN\nLN-dc\nHN-end\nkj-sa\nkj-HN\nkj-dc";
var sample3 = "fs-end\nhe-DX\nfs-he\nstart-DX\npj-DX\nend-zg\nzg-sl\nzg-pj\npj-he\nRW-he\nfs-DX\npj-RW\nzg-RW\nstart-pj\nhe-WI\nzg-he\npj-fs\nstart-RW";
var buildMap = function (input) {
    var map = new Map();
    input.split("\n").forEach(function (x) {
        var c = x.split("-");
        if (c[1] != "start")
            map.set(c[0], map.get(c[0]) ? __spreadArray(__spreadArray([], map.get(c[0]), true), [c[1]], false) : [c[1]]);
        if (c[0] != "start")
            map.set(c[1], map.get(c[1]) ? __spreadArray(__spreadArray([], map.get(c[1]), true), [c[0]], false) : [c[0]]);
    });
    return map;
};
var part1 = function (map) {
    var paths = [], stack = [{ name: "start", visited: ["start"], smallCount: 0 }];
    var _loop_1 = function () {
        var pos = stack.pop();
        map.get(pos.name).forEach(function (next) {
            var path = __spreadArray(__spreadArray([], pos.visited, true), [next], false);
            var isLowerCase = next == next.toLowerCase();
            if (next == "end")
                paths.push({ path: path.join(", "), smallCount: pos.smallCount });
            else if (!isLowerCase)
                stack.push({ name: next, visited: path, smallCount: pos.smallCount });
            else if (!pos.visited.includes(next) && isLowerCase) {
                stack.push({ name: next, visited: path, smallCount: pos.smallCount + 1 });
            }
        });
    };
    while (stack.length > 0) {
        _loop_1();
    }
    console.log(paths.filter(function (x) { return x.smallCount > 0; }).length);
};
part1(buildMap(input_1.input)); // 4495
var part2 = function (map) {
    var uniqueSmallCaves = [];
    map.forEach(function (_, k) {
        if (!["start", "end"].includes(k))
            if (k == k.toLowerCase() && !uniqueSmallCaves.includes(k)) {
                uniqueSmallCaves.push(k);
            }
    });
    var paths = [], stack = [{ name: "start", visited: ["start"], smallCount: 0, allowedDuplicateSmallCaves: uniqueSmallCaves }];
    var _loop_2 = function () {
        var pos = stack.pop();
        map.get(pos.name).forEach(function (next) {
            var path = __spreadArray(__spreadArray([], pos.visited, true), [next], false);
            var isLowerCase = next == next.toLowerCase();
            if (next == "end")
                paths.push({ path: path.join(", "), smallCount: pos.smallCount });
            else if (!isLowerCase)
                stack.push(__assign(__assign({}, pos), { name: next, visited: path }));
            else if (isLowerCase) {
                if (!pos.visited.includes(next)) {
                    stack.push({ name: next, visited: path, smallCount: pos.smallCount + 1, allowedDuplicateSmallCaves: pos.allowedDuplicateSmallCaves });
                    return;
                }
                if (pos.allowedDuplicateSmallCaves.includes(next)) {
                    stack.push({ name: next, visited: path, smallCount: pos.smallCount + 1, allowedDuplicateSmallCaves: [] });
                }
            }
        });
    };
    while (stack.length > 0) {
        _loop_2();
    }
    console.log(paths.length);
};
part2(buildMap(input_1.input)); //131254
