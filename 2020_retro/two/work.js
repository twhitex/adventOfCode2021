"use strict";
exports.__esModule = true;
var input_1 = require("./input");
var log = console.log;
log("2020: day two");
//row 12 is invalid | row 7 is valid
var answer = 0;
input_1.input
    .split("\n")
    .forEach(function (r, i) {
    var _a;
    var split = r.split(" ");
    var bounds = split[0].split("-").map(function (s) { return Number(s); }), match = split[1].split(":")[0], password = split[2];
    var hits = (_a = Object.keys(password).filter(function (i) { return password[i] == match; })) === null || _a === void 0 ? void 0 : _a.length;
    if (hits >= bounds[0] && hits <= bounds[1])
        answer++;
});
log("part one", answer); //620
answer = 0;
input_1.input
    .split("\n")
    .forEach(function (r) {
    var split = r.split(" ");
    var indexes = split[0].split("-").map(function (s) { return Number(s); }), match = split[1].split(":")[0], password = split[2];
    var matchIndex = indexes[0] - 1, nonMatchIndex = indexes[1] - 1;
    if (password[matchIndex] == match && password[nonMatchIndex] != match)
        answer++;
    else if (password[matchIndex] != match && password[nonMatchIndex] == match)
        answer++;
});
log("part two", answer);
