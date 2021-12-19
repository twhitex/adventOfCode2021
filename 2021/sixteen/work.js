"use strict";
exports.__esModule = true;
var dict = "0 = 0000\n1 = 0001\n2 = 0010\n3 = 0011\n4 = 0100\n5 = 0101\n6 = 0110\n7 = 0111\n8 = 1000\n9 = 1001\nA = 1010\nB = 1011\nC = 1100\nD = 1101\nE = 1110\nF = 1111";
//typeId = 4 = literal value
//D2FE28
var str = "1101_0010_1111_1110_0010_1000";
//first 3 are the version
//second 3 are the type
//groups of five after the first 6
//typeId = 4 = literal value (100) - other types are operators
var buildMap = function (str) {
    var map = new Map();
    str.split("\n").forEach(function (x) {
        var inp = x.split(" ");
        map.set(inp[0], inp[2]);
    });
    return map;
};
var parseHierachy = function (hex) {
    var map = buildMap(dict);
    //first 3 bits encode the packet version
    //second 3 bits encode the packet type ID
    var binary = "";
    new Array(hex.length).fill(0).forEach(function (_, i) {
        binary += map.get(hex.charAt(i));
    });
    var version = parseInt(binary[0] + binary[1] + binary[2], 2);
    var typeId = parseInt(binary[3] + binary[4] + binary[5], 2);
    binary = binary.slice(6);
    console.log(version, typeId, binary);
};
parseHierachy('D2FE28');
