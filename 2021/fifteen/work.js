"use strict";
exports.__esModule = true;
var helper_1 = require("../../helper/helper");
var sample = "1163751742\n1381373672\n2136511328\n3694931569\n7463417111\n1319128137\n1359912421\n3125421639\n1293138521\n2311944581";
var buildGraph = function (input) {
    var arr = [];
    input.split("\n").forEach(function (x, idx) {
        arr[idx] = [];
        (0, helper_1.stringToArray)(x).forEach(function (y) {
            arr[idx].push(Number(y));
        });
    });
    return arr;
};
var a = function (graph) {
    var targetPoint = { y: graph.length - 1, x: graph[0].length - 1 };
    var curr = { point: { x: 0, y: 0 }, visited: new Map([["00", 0]]), riskLvl: 0 };
    var depth = 0;
    var _loop_1 = function () {
        var pos = curr, allowedPoints = [];
        if (graph[pos.point.y - 1]) //above
            allowedPoints.push({ y: pos.point.y - 1, x: pos.point.x });
        if (graph[pos.point.y + 1]) //below
            allowedPoints.push({ y: pos.point.y + 1, x: pos.point.x });
        if (graph[pos.point.y][pos.point.x - 1]) //left
            allowedPoints.push({ y: pos.point.y, x: pos.point.x - 1 });
        if (graph[pos.point.y][pos.point.x + 1]) //right
            allowedPoints.push({ y: pos.point.y, x: pos.point.x + 1 });
        var pointWithDist = [];
        allowedPoints.forEach(function (x) {
            var g = manhattanDist(pos.point, x);
            var h = manhattanDist(pos.point, targetPoint); //dist from current position -> end pos
            var f = g + h;
            pointWithDist.push({ point: x, g: g, h: h, f: f });
        });
        console.log("target", targetPoint, "pointWithDist", pointWithDist);
        var lowest = null;
        pointWithDist.forEach(function (x) {
            if (curr.visited.get("".concat(x.point.y).concat(x.point.y)))
                return;
            if (!lowest || x.f < lowest.f)
                lowest = { point: x.point, f: x.f };
        });
        curr = { point: lowest.point, visited: curr.visited, riskLvl: curr.riskLvl + graph[lowest.point.y][lowest.point.x] };
        depth++;
    };
    while (curr.point.x != targetPoint.x && curr.point.y != targetPoint.y) {
        _loop_1();
    }
    console.log("curr", curr);
};
var manhattanDist = function (from, to) { return Math.abs(from.x - to.x) + Math.abs(from.y - to.y); };
a(buildGraph(sample));
