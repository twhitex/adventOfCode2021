"use strict";
exports.__esModule = true;
var helper_1 = require("../../helper/helper");
var input_1 = require("./input");
var sample = "5483143223\n2745854711\n5264556173\n6141336146\n6357385478\n4167524645\n2176841721\n6882881134\n4846848554\n5283751526";
var smallSample = "11111\n19991\n19191\n19991\n11111";
// const log2d = (chars: number[][]) => {
//     let str = ""
//     chars.forEach(c => {
//         c.forEach(v => {
//             str += v
//         })
//         str += "\n"
//     })
//     console.log(str)
// }
//check for any octopus with an energy level > 9 - flash it
//flash: x x x
//       x i x
//       x x x
//if any of the x's have an energy level > 0 - they also flash
//any octopus that flashed (energy level > 9) has its energy level set to 0
//this could be a lot more efficient..
var countFlashes = function (str, steps) {
    var chars = [];
    str.split("\n").forEach(function (l, i) {
        chars[i] = [];
        (0, helper_1.stringToArray)(l).forEach(function (c) {
            chars[i].push(Number(c));
        });
    });
    var flashes = 0, i = 0;
    while (i < steps) {
        step(chars);
        chars.forEach(function (c) {
            c.forEach(function (v) {
                if (v == 0)
                    flashes++;
            });
        });
        i++;
    }
    return flashes;
};
var step = function (chars) {
    chars.forEach(function (c, y) {
        c.forEach(function (_, x) {
            chars[y][x] += 1;
        });
    });
    if (canFlash(chars))
        flash(chars);
    return 0;
};
var canFlash = function (chars) {
    var willFlashArr = [];
    chars.forEach(function (c) {
        c.forEach(function (v, x) {
            if (v == 10)
                willFlashArr.push(x);
        });
    });
    return willFlashArr.length > 0;
};
var flash = function (chars) {
    if (!canFlash(chars))
        return;
    chars.forEach(function (c, y) {
        c.forEach(function (_, x) {
            if (chars[y][x] == 10) {
                //flash it
                flashHelper(y - 1, x - 1, chars); //top left
                flashHelper(y - 1, x, chars); //top
                flashHelper(y - 1, x + 1, chars); //top right
                flashHelper(y, x - 1, chars); //left
                flashHelper(y, x + 1, chars); //right
                flashHelper(y + 1, x - 1, chars); //bot left
                flashHelper(y + 1, x, chars); //bot
                flashHelper(y + 1, x + 1, chars); //bot right
                chars[y][x] = 0; //set to zero
            }
        });
    });
    return flash(chars);
};
var flashHelper = function (y, x, chars) {
    if (chars[y])
        if (chars[y][x]) {
            if (chars[y][x] == 10 || chars[y][x] == 0)
                return;
            chars[y][x] += 1;
        }
};
console.log("p1", countFlashes(input_1.input, 100));
var part2 = function (str) {
    var chars = [], maxLength = 0;
    str.split("\n").forEach(function (l, i) {
        chars[i] = [];
        (0, helper_1.stringToArray)(l).forEach(function (c) {
            chars[i].push(Number(c));
            maxLength++;
        });
    });
    var stop = false, i = 0;
    var _loop_1 = function () {
        step(chars);
        var flashCount = 0;
        chars.forEach(function (c) {
            c.forEach(function (v) {
                if (v == 0)
                    flashCount++;
            });
        });
        stop = flashCount == maxLength;
        i++;
    };
    while (!stop) {
        _loop_1();
    }
    return i;
};
console.log("p2", part2(input_1.input));
