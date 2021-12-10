"use strict";
exports.__esModule = true;
var helper_1 = require("../../helper/helper");
var input_1 = require("./input");
var sample = "[({(<(())[]>[[{[]{<()<>>\n[(()[<>])]({[<{<<[]>>(\n{([(<{}[<>[]}>{[]{[(<()>\n(((({<>}<{<{<>}{[]{[]{}\n[[<[([]))<([[{}[[()]]]\n[{[{({}]{}}([{[{{{}}([]\n{<[[]]>}<{[{[{[]{()[[[]\n[<(<(<(<{}))><([]([]()\n<{([([[(<>()){}]>(<<{{\n<{([{{}}[<[[[<>{}]]]>[]]";
// If a chunk opens with (, it must close with ).
// If a chunk opens with [, it must close with ].
// If a chunk opens with {, it must close with }.
// If a chunk opens with <, it must close with >.
var correspondingTag = function (c) {
    switch (c) {
        case "(":
            return ")";
        case "[":
            return "]";
        case "{":
            return "}";
        case "<":
            return ">";
        case ")":
            return "(";
        case "]":
            return "[";
        case "}":
            return "{";
        case ">":
            return "<";
    }
};
var isOpenTag = function (c) { return ["(", "[", "{", "<"].includes(c); };
var isCorrupted = function (str) {
    var openArr = [];
    var corruptedChar = null;
    (0, helper_1.stringToArray)(str).forEach(function (c) {
        if (!corruptedChar)
            if (isOpenTag(c))
                openArr.push(c);
            else {
                //pop the open array and if it doesn't match .. it's corrupted
                var mostRecentOpen = openArr.pop();
                if (mostRecentOpen != correspondingTag(c)) {
                    corruptedChar = c;
                    return;
                }
            }
    });
    return corruptedChar;
};
var findScore = function (s) {
    var scoreMap = new Map([[")", 3], ["]", 57], ["}", 1197], [">", 25137]]);
    var score = 0;
    s.forEach(function (l) {
        var _a;
        score += (_a = scoreMap.get(isCorrupted(l))) !== null && _a !== void 0 ? _a : 0;
    });
    return score;
};
console.log("p1", findScore(input_1.input.split("\n")));
var getMissingTags = function (str) {
    var openArr = [];
    (0, helper_1.stringToArray)(str).forEach(function (c) {
        if (isOpenTag(c))
            openArr.push(c);
        else
            openArr.pop();
    });
    var missingParts = [];
    openArr.reverse().forEach(function (c) {
        missingParts.push(correspondingTag(c));
    });
    return missingParts;
};
var incompleteLines = function (s) {
    s = s.filter(function (l) { return !isCorrupted(l); });
    var scoreMap = new Map([[")", 1], ["]", 2], ["}", 3], [">", 4]]);
    var scoreList = [];
    s.forEach(function (l) {
        var score = 0;
        getMissingTags(l).forEach(function (t) {
            score *= 5;
            score += scoreMap.get(t);
        });
        scoreList.push(score);
    });
    scoreList = scoreList.sort(function (a, b) { return a - b; });
    return scoreList[scoreList.length - Math.round(scoreList.length / 2)];
};
console.log("p2", incompleteLines(input_1.input.split("\n")));
