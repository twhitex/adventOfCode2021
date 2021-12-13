"use strict";
exports.__esModule = true;
var input_1 = require("./input");
var sample = "6,10\n0,14\n9,10\n0,3\n10,4\n4,11\n6,0\n6,12\n4,1\n0,13\n10,12\n3,4\n3,0\n8,4\n1,10\n2,14\n8,10\n9,0\n\nfold along y=7\nfold along x=5";
var log2d = function (arr, msg) {
    var str = "";
    arr.forEach(function (y) {
        y.forEach(function (x) {
            str += x == 0 ? " . " : " # ";
        });
        str += "\n\n";
    });
    if (msg)
        console.log(msg);
    console.log(str);
};
var buildPlot = function (input) {
    var foldInstructions = [];
    var topx = 0, topy = 0;
    input.split("\n").filter(function (i) { return i; }).forEach(function (line) {
        if (line.startsWith("f")) {
            if (line.includes("y="))
                foldInstructions.push({ axis: "y", index: Number(line.replace("fold along y=", "")) });
            else
                foldInstructions.push({ axis: "x", index: Number(line.replace("fold along x=", "")) });
        }
        else {
            var _a = line.split(","), x = _a[0], y = _a[1];
            if (Number(x) > topx)
                topx = Number(x);
            if (Number(y) > topy)
                topy = Number(y);
        }
    });
    var graph = [];
    for (var i = 0; i < topy + 1; i++) {
        graph[i] = [];
        for (var j = 0; j < topx + 1; j++) {
            graph[i].push(0);
        }
    }
    input.split("\n").filter(function (i) { return !!i; }).forEach(function (line) {
        if (!line.startsWith("f")) {
            var _a = line.split(","), x = _a[0], y = _a[1];
            graph[Number(y)][Number(x)] += 1;
        }
    });
    var foldedGraph = graph;
    foldInstructions.forEach(function (instruction, i) {
        if (instruction.axis == "x")
            foldedGraph = foldX(instruction.index, foldedGraph);
        else
            foldedGraph = foldY(instruction.index, foldedGraph);
        console.log("instruction ".concat(i, " dot count: ").concat(countDots(foldedGraph)));
    });
    log2d(foldedGraph, "result");
};
var countDots = function (arr) {
    var dots = 0;
    arr.forEach(function (a) {
        a.forEach(function (dot) {
            if (dot > 0)
                dots++;
        });
    });
    return dots;
};
var foldY = function (foldPoint, graph) {
    var newGraph = graph.concat();
    newGraph.splice(foldPoint, 1);
    var upperGraph = newGraph.splice(0, newGraph.length - foldPoint);
    var yLength = newGraph.length;
    var xLength = newGraph[0].length;
    for (var y = yLength; y > 0; y--) {
        for (var x = xLength; x > 0; x--) {
            upperGraph[yLength - y][x - 1] += newGraph[y - 1][x - 1];
        }
    }
    return upperGraph.concat();
};
var foldX = function (foldPoint, graph) {
    var newGraph = [];
    var yLength = graph.length;
    var xLength = graph[0].length - 1; //inclusive
    for (var y = 0; y < yLength; y++) {
        newGraph[y] = [];
        for (var x = 0; x < foldPoint; x++) {
            newGraph[y].push(graph[y][x] + graph[y][xLength - x]);
        }
    }
    return newGraph;
};
buildPlot(input_1.input);
