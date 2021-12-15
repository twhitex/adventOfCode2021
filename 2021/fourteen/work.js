"use strict";
exports.__esModule = true;
var input_1 = require("./input");
var sample = "NNCB\n\nCH -> B\nHH -> N\nCB -> H\nNH -> C\nHB -> C\nHC -> B\nHN -> C\nNN -> C\nBH -> H\nNC -> B\nNB -> B\nBN -> B\nBB -> N\nBC -> B\nCC -> N\nCN -> C";
var polymerize = function (input, steps) {
    var split = input.split("\n").filter(function (x) { return x; });
    var instructionDict = new Map(), arr = [];
    var countDict = new Map();
    var matchDict = new Map();
    split.forEach(function (l, i) {
        var _a;
        if (i == 0) {
            arr = new Array(l.length).fill(0).map(function (_, j) {
                var _a;
                countDict.set(l[j], ((_a = countDict.get(l[j])) !== null && _a !== void 0 ? _a : 0) + 1);
                return l[j];
            });
            for (var j = 0; j < arr.length; j++) {
                if (arr[j + 1])
                    matchDict.set(arr[j] + arr[j + 1], ((_a = matchDict.get(arr[j] + arr[j + 1])) !== null && _a !== void 0 ? _a : 0) + 1);
            }
        }
        else {
            var instr = l.split(" ");
            instructionDict.set(instr[0], instr[2]);
        }
    });
    var stepIdx = 0;
    var _loop_1 = function () {
        var copy = new Map();
        matchDict.forEach(function (val, key) {
            var _a, _b, _c;
            var insert = instructionDict.get(key);
            countDict.set(insert, ((_a = countDict.get(insert)) !== null && _a !== void 0 ? _a : 0) + val);
            copy.set(key[0] + insert, ((_b = copy.get(key[0] + insert)) !== null && _b !== void 0 ? _b : 0) + val);
            copy.set(insert + key[1], ((_c = copy.get(insert + key[1])) !== null && _c !== void 0 ? _c : 0) + val);
        });
        matchDict = copy;
        stepIdx++;
    };
    while (stepIdx < steps) {
        _loop_1();
    }
    var min, max;
    countDict.forEach(function (v, k) {
        var val = { key: k, val: v };
        if (!min && !max) {
            min = val;
            max = val;
        }
        else {
            if (v < min.val)
                min = val;
            if (v > max.val)
                max = val;
        }
    });
    console.log("steps: ".concat(steps, " - result: "), max.val - min.val);
};
polymerize(input_1.input, 10); //p1
polymerize(input_1.input, 40); //p2
