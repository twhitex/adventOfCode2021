"use strict";
exports.__esModule = true;
var helper_1 = require("../../helper/helper");
var input_1 = require("./input");
var sampleInput = "be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe\nedbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc\nfgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg\nfbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb\naecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea\nfgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb\ndbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe\nbdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef\negadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb\ngcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce";
var digitDict = {
    0: ['aaaa', 'bb', 'cc', 'ee', 'ff', 'gggg'],
    1: ['cc', 'ff'],
    2: ['aaaa', 'cc', 'dddd', 'ee', 'gggg'],
    3: ['aaaa', 'cc', 'dddd', 'ff', 'gggg'],
    4: ['bb', 'cc', 'dddd', 'ff'],
    5: ['aaaa', 'bb', 'dddd', 'ff', 'gggg'],
    6: ['aaaa', 'bb', 'dddd', 'ee', 'ff', 'gggg'],
    7: ['aaaa', 'cc', 'ff'],
    8: ['aaaa', 'bb', 'cc', 'dddd', 'ee', 'ff', 'gggg'],
    9: ['aaaa', 'bb', 'cc', 'dddd', 'ff', 'gggg']
};
var digitLengthDict = {};
Object.keys(digitDict).forEach(function (key) {
    digitLengthDict[Number(key)] = digitDict[key].length;
});
var determineOutput = function (check, input) {
    var output = 0;
    input.forEach(function (str) {
        var list = str.split("|")[1].split(" ").filter(function (item) { return item; });
        console.log(str, list);
        list.forEach(function (r) {
            Object.keys(digitLengthDict).map(function (key) {
                if (check.includes(Number(key))) {
                    console.log("r", r, r.length);
                    if (r.length == digitLengthDict[Number(key)])
                        output++;
                }
            });
        });
    });
    return output;
};
console.log("p1", determineOutput([1, 4, 7, 8], input_1.input.split("\n")));
var map = function (input) {
    var map = new Map();
    map.set(1, input.filter(function (item) { return item.length == 2; })[0]);
    map.set(4, input.filter(function (item) { return item.length == 4; })[0]);
    map.set(7, input.filter(function (item) { return item.length == 3; })[0]);
    map.set(8, input.filter(function (item) { return item.length == 7; })[0]);
    //0, 2, 3, 5, 6, 9
    input.forEach(function (val, idx) {
        var isMapped = false;
        map.forEach(function (v) {
            if (val == v) {
                isMapped = true;
                return;
            }
        });
        if (isMapped)
            return;
        var one = map.get(1);
        var valAsArr = (0, helper_1.stringToArray)(val);
        // var hasSet = false
        if (valAsArr.filter(function (char) { return one.includes(char); }).length == 2) { //could be 0, 3 or 9
            var four = map.get(4);
            //is it 0 or 9 ?
            if (valAsArr.length == 5) {
                map.set(3, val);
                return;
            }
            if (valAsArr.filter(function (char) { return four.includes(char); }).length == 4) { // all matched, so we know it's 9?
                map.set(9, val);
                return;
            }
            map.set(0, val);
            return;
        }
        else {
            //2, 5, 6
            if (val.length == 6) {
                map.set(6, val);
                return;
            }
            var four = map.get(4);
            if (valAsArr.filter(function (char) { return four.includes(char); }).length == 3) {
                map.set(5, val);
                return;
            }
            map.set(2, val);
            return;
        }
    });
    return map;
};
var decode = function (input) {
    var total = 0;
    input.forEach(function (row) {
        var split = row.split("|");
        var list1 = split[0].split(" ").filter(function (item) { return item; });
        var list2 = split[1].split(" ").filter(function (item) { return item; });
        var decodeMap = map(list1);
        var localTotal = '';
        list2.forEach(function (item) {
            var match = null;
            if (item.length == 2)
                match = 1;
            if (item.length == 4)
                match = 4;
            if (item.length == 3)
                match = 7;
            if (item.length == 7)
                match = 8;
            if (!match) {
                decodeMap.forEach(function (v, k) {
                    var itemAsArr = (0, helper_1.stringToArray)(item);
                    var valAsArr = (0, helper_1.stringToArray)(v);
                    if (valAsArr.length != itemAsArr.length)
                        return;
                    valAsArr.forEach(function (char) {
                        var index = itemAsArr.findIndex(function (c) { return c == char; });
                        if (index < 0)
                            return;
                        itemAsArr.splice(index, 1);
                    });
                    if (itemAsArr.length == 0) {
                        match = k;
                        return;
                    }
                });
            }
            if (match > -1)
                localTotal += match.toString();
        });
        total += Number(localTotal);
    });
    return total;
};
console.log("p2", decode(input_1.input.split("\n"))); //1055164
