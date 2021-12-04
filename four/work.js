"use strict";
exports.__esModule = true;
var input_1 = require("./input");
console.log("day four");
var randomOrder = "67,3,19,4,64,39,85,14,84,93,79,26,61,24,65,63,15,69,48,8,82,75,36,96,16,49,28,40,97,38,76,91,83,7,62,94,21,95,6,10,43,17,31,34,81,23,52,60,54,29,70,12,35,0,57,45,20,71,78,44,90,2,33,68,53,92,50,73,88,47,58,5,9,87,22,13,18,30,59,56,99,11,77,55,72,32,37,89,42,27,66,41,86,51,74,1,46,25,98,80";
var splitInput = input_1.input.split(" ").filter(function (item) { return item; });
var inputArr = [];
splitInput.forEach(function (item) {
    if (item.includes("\n"))
        item.split("\n").forEach(function (split) {
            if (!!split)
                inputArr.push(split);
        });
    else if (!!item)
        inputArr.push(item);
});
var board_size = 25;
var boards = {};
// console.log(inputArr.length)
var numOfBoards = inputArr.length / 25;
var stringHelper = "";
for (var index = 0; index < numOfBoards; index++) {
    stringHelper += "0";
}
Object.keys(stringHelper).forEach(function (key) {
    var keyAsNum = Number(key);
    if (!boards[keyAsNum])
        boards[keyAsNum] = [];
    var lowerBounds = keyAsNum * board_size;
    var upperBounds = lowerBounds + board_size;
    for (var index = lowerBounds; index < upperBounds; index++) { //chunking 25
        boards[keyAsNum].push({ value: inputArr[index], marked: false });
    }
});
var callOutArray = randomOrder.split(",");
//so can only be bingo IF the first markedSpace is: 0  1  2  3  4 
//                                                  5 
//                                                  10
//                                                  15
//                                                  20
var horizontalBingo = {
    0: [1, 2, 3, 4],
    5: [6, 7, 8, 9],
    10: [11, 12, 13, 14],
    15: [16, 17, 18, 19],
    20: [21, 22, 23, 24]
};
var verticalBingo = {
    0: [5, 10, 15, 20],
    1: [6, 11, 16, 21],
    2: [7, 12, 17, 22],
    3: [8, 13, 18, 23],
    4: [9, 14, 19, 24]
};
var escape = false;
var lastIndexCalledOut = 0;
var firstBingoBoardIndex = 0;
callOutArray.forEach(function (callOut, idx) {
    if (!escape)
        Object.keys(boards).forEach(function (key) {
            if (!escape) {
                var currentBoard = boards[key];
                currentBoard.filter(function (board) { return board.value == callOut; }).forEach(function (bm) { return bm.marked = true; });
                //now check if there is match
                var markedSpaces = currentBoard.map(function (item, i) { if (item.marked)
                    return i; }).filter(function (item) { return item == 0 || !!item; });
                if (markedSpaces.length > 0) {
                    markedSpaces.forEach(function (element, i) {
                        var _a, _b;
                        if (!escape) {
                            if (!!horizontalBingo[element]) {
                                var isBingo_1 = true;
                                (_a = horizontalBingo[element]) === null || _a === void 0 ? void 0 : _a.forEach(function (bingoIdx, j) {
                                    if (isBingo_1) {
                                        var nextMarkedSpaceIdx = i + j + 1;
                                        if (!markedSpaces[nextMarkedSpaceIdx])
                                            isBingo_1 = false;
                                        else if (bingoIdx != markedSpaces[nextMarkedSpaceIdx])
                                            isBingo_1 = false;
                                    }
                                });
                                if (!isBingo_1) { // try vertical
                                    (_b = verticalBingo[element]) === null || _b === void 0 ? void 0 : _b.forEach(function (bingoIdx, j) {
                                        if (isBingo_1) {
                                            var nextMarkedSpaceIdx = i + j + 1;
                                            if (!markedSpaces[nextMarkedSpaceIdx])
                                                isBingo_1 = false;
                                            else if (bingoIdx != markedSpaces[nextMarkedSpaceIdx])
                                                isBingo_1 = false;
                                        }
                                    });
                                }
                                if (isBingo_1) {
                                    //winnner winner chicken dinner
                                    escape = true;
                                    lastIndexCalledOut = idx;
                                    firstBingoBoardIndex = Number(key);
                                }
                            }
                        }
                    });
                }
            }
        });
});
var unmarkedSpacesTotal = 0;
boards[firstBingoBoardIndex].filter(function (item) { return !item.marked; }).forEach(function (item) { return unmarkedSpacesTotal += Number(item.value); });
console.log("part one: ".concat(Number(callOutArray[lastIndexCalledOut]) * unmarkedSpacesTotal));
//part two
//which board would bingo LAST ?
escape = false;
var completedBoardIndexes = [];
callOutArray.forEach(function (callOut, idx) {
    Object.keys(boards).forEach(function (key) {
        if (!completedBoardIndexes.includes(Number(key))) {
            var currentBoard = boards[key];
            currentBoard.filter(function (board) { return board.value == callOut; }).forEach(function (bm) { return bm.marked = true; });
            //now check if there is match
            var markedSpaces = currentBoard.map(function (item, i) { if (item.marked)
                return i; }).filter(function (item) { return item == 0 || !!item; });
            if (markedSpaces.length > 0) {
                markedSpaces.forEach(function (element, i) {
                    var _a, _b;
                    if (!!horizontalBingo[element]) {
                        var isBingo_2 = true;
                        (_a = horizontalBingo[element]) === null || _a === void 0 ? void 0 : _a.forEach(function (bingoIdx, j) {
                            if (isBingo_2) {
                                var nextMarkedSpaceIdx = i + j + 1;
                                if (!markedSpaces[nextMarkedSpaceIdx])
                                    isBingo_2 = false;
                                else if (bingoIdx != markedSpaces[nextMarkedSpaceIdx])
                                    isBingo_2 = false;
                            }
                        });
                        if (!isBingo_2) { // try vertical
                            (_b = verticalBingo[element]) === null || _b === void 0 ? void 0 : _b.forEach(function (bingoIdx, j) {
                                if (isBingo_2) {
                                    var nextMarkedSpaceIdx = i + j + 1;
                                    if (!markedSpaces[nextMarkedSpaceIdx])
                                        isBingo_2 = false;
                                    else if (bingoIdx != markedSpaces[nextMarkedSpaceIdx])
                                        isBingo_2 = false;
                                }
                            });
                        }
                        if (isBingo_2) {
                            //winnner winner chicken dinner
                            lastIndexCalledOut = idx;
                            completedBoardIndexes.push(Number(key));
                        }
                    }
                });
            }
        }
    });
});
var lastCompletedBoard = boards[completedBoardIndexes[completedBoardIndexes.length - 1]];
unmarkedSpacesTotal = 0;
lastCompletedBoard.filter(function (item) { return !item.marked; }).forEach(function (item) { return unmarkedSpacesTotal += Number(item.value); });
console.log("part two: ".concat(Number(callOutArray[lastIndexCalledOut]) * unmarkedSpacesTotal));
