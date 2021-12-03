"use strict";
exports.__esModule = true;
var input_1 = require("./input");
console.log("day three");
//part one 
var inputSplit = input_1.dayThreeInput.split('\n');
var lengthArr = Object.keys(inputSplit[0]);
var bitDict = {}; // {[key: number] = string[]}
inputSplit.forEach(function (input, i) {
    lengthArr.forEach(function (element, j) {
        if (bitDict[j] == null)
            bitDict[j] = [];
        bitDict[j].push(input[element]);
    });
});
var mostCommonString = function (stringArr) {
    var strDict = {};
    stringArr.forEach(function (item) {
        if (!strDict[item])
            strDict[item] = 1;
        strDict[item]++;
    });
    var max = { key: "", value: 0 };
    Object.keys(strDict).forEach(function (key, i) {
        if (i == 0 || strDict[key] > max.value)
            max = { key: key, value: strDict[key] };
    });
    // console.log(strDict, "=", max)
    return max.key;
};
var gammaStr = ""; //most common
var epsilonStr = ""; //least common
Object.keys(bitDict).forEach(function (key) {
    var mostCommon = mostCommonString(bitDict[key]);
    gammaStr += mostCommon;
    epsilonStr += mostCommon == "0" ? "1" : "0";
});
var gammaRate = parseInt(gammaStr, 2);
var epsilonRate = parseInt(epsilonStr, 2);
console.log("part one: ".concat(gammaRate * epsilonRate));
//part two
//most common with in the remaining list..
//a little different than part one !
var csrArr = inputSplit;
var ogrArr = inputSplit;
var ogrArrResult = "";
var csrArrResult = "";
Object.keys(gammaStr).forEach(function (index) {
    //foreach index in gammaStr (12 digit binary number)
    //find the most common bit in the 'index' position
    //if 0 and 1 are equally common then use "1" as most common
    //ogr
    if (!ogrArrResult) {
        var numOfZeros_1 = 0;
        var numOfOnes_1 = 0;
        ogrArr.forEach(function (binary) {
            if (binary[index] == "0")
                numOfZeros_1++;
            else
                numOfOnes_1++;
        });
        var mostCommon_1 = "";
        if (numOfZeros_1 == numOfOnes_1)
            mostCommon_1 = "1";
        else
            mostCommon_1 = numOfZeros_1 > numOfOnes_1 ? "0" : "1";
        //found mostCommon for the current position
        ogrArr = ogrArr.filter(function (item) { return item[index] == mostCommon_1; });
        if (ogrArr.length == 1)
            ogrArrResult = ogrArr[0];
    }
    //csr
    if (!csrArrResult) {
        var numOfZeros_2 = 0;
        var numOfOnes_2 = 0;
        csrArr.forEach(function (binary) {
            if (binary[index] == "0")
                numOfZeros_2++;
            else
                numOfOnes_2++;
        });
        var leastCommon_1 = "";
        if (numOfZeros_2 == numOfOnes_2)
            leastCommon_1 = "0";
        else
            leastCommon_1 = numOfZeros_2 > numOfOnes_2 ? "1" : "0";
        //found leastCommon for the current position
        csrArr = csrArr.filter(function (item) { return item[index] == leastCommon_1; });
        if (csrArr.length == 1)
            csrArrResult = csrArr[0];
    }
});
var ogrRating = parseInt(ogrArrResult, 2);
var csrRating = parseInt(csrArrResult, 2);
console.log("part two: ".concat(ogrRating * csrRating));
