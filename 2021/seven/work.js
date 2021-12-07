"use strict";
exports.__esModule = true;
var helper_1 = require("../../helper/helper");
var input_1 = require("./input");
var horizontalStep = function (input) {
    var rule = 1; //skip zero
    var max = Math.max.apply(Math, inputArr);
    var map = new Map();
    while (rule < max) {
        map.set(rule, 0);
        input.forEach(function (r) {
            var currentMap = map.get(rule);
            var amountToMove = Math.abs(r - rule);
            map.set(rule, currentMap + amountToMove);
        });
        rule++;
    }
    return map;
};
var inputArr = input_1.input.split(",").map(function (r) { return Number(r); });
var _a = (0, helper_1.findLowest)(horizontalStep(inputArr)), min = _a.min, key = _a.key;
console.log("part one: ", min, "min key", key);
//part two => each step costs 1 more unit: the first step costs 1, the second step costs 2, the third step costs 3, and so on.
var horizontalStep2 = function (input) {
    var rule = 1; //skip zero
    var max = Math.max.apply(Math, inputArr);
    var map = new Map();
    while (rule < max) {
        map.set(rule, 0);
        input.forEach(function (r) {
            var currentMap = map.get(rule);
            var amountToMove = Math.abs(r - rule); //amount to move
            var i = 1;
            var newAmount = amountToMove;
            while (i < amountToMove) {
                newAmount += i;
                i++;
            }
            map.set(rule, currentMap + newAmount);
        });
        rule++;
    }
    return map;
};
var _b = (0, helper_1.findLowest)(horizontalStep2(inputArr)), min2 = _b.min, key2 = _b.key;
console.log("part two: ", min2, "min key", key2);
