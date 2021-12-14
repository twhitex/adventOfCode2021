"use strict";
exports.__esModule = true;
var input_1 = require("./input");
var sample = "NNCB\n\nCH -> B\nHH -> N\nCB -> H\nNH -> C\nHB -> C\nHC -> B\nHN -> C\nNN -> C\nBH -> H\nNC -> B\nNB -> B\nBN -> B\nBB -> N\nBC -> B\nCC -> N\nCN -> C";
var polymerize = function (input, steps) {
    var _a;
    var split = input.split("\n").filter(function (x) { return x; });
    var instructionDict = new Map(), stack = [];
    var countDict = new Map();
    split.forEach(function (l, i) {
        if (i == 0) {
            stack = new Array(l.length).fill(0).map(function (_, j) {
                var _a;
                countDict.set(l[j], ((_a = countDict.get(l[j])) !== null && _a !== void 0 ? _a : 0) + 1);
                return l[j];
            });
        }
        var instr = l.split(" ");
        instructionDict.set(instr[0], instr[2]);
    });
    var stepIdx = 0;
    while (stepIdx < steps) {
        var i = 0;
        while (true) {
            if (!stack[i + 1])
                break;
            var insert = instructionDict.get(stack[i] + stack[i + 1]);
            countDict.set(insert, ((_a = countDict.get(insert)) !== null && _a !== void 0 ? _a : 0) + 1);
            stack.splice(i + 1, 0, insert);
            i += 2; //skip 2 to make up for the item we just inserted
        }
        stepIdx++;
    }
    console.log(stack);
    console.log(countDict);
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
    console.log("p1: ", max.val - min.val);
};
polymerize(input_1.input, 40);
