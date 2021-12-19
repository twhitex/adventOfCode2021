"use strict";
exports.__esModule = true;
exports.dijkstra = void 0;
var V = 10; // I think this should be 10???
var minDist = function (dist, sptSet) {
    var min = Number.MAX_VALUE, minIdx = -1;
    for (var v = 0; v < V; v++) {
        if (!sptSet[v] && dist[v] <= min) {
            min = dist[v];
            minIdx = v;
        }
    }
    return minIdx;
};
var print2 = function (dist, n) {
    for (var i = 0; i < V; i++) {
        console.log("index: ".concat(i, "    Distance from src: ").concat(dist[i]));
    }
};
var dijkstra = function (graph, src) {
    var sptSet = new Array(V), dist = new Array(V);
    for (var i = 0; i < V; i++) {
        dist[i] = Number.MAX_VALUE;
        sptSet[i] = false;
    }
    console.log();
    dist[src] = 0;
    for (var i = 0; i < V - 1; i++) {
        var u = minDist(dist, sptSet);
        sptSet[u] = true;
        for (var v = 0; v < V; v++) {
            if (!sptSet[v]
                && graph[u][v] != 0
                && dist[u] != Number.MAX_VALUE
                && dist[u] + graph[u][v] < dist[v])
                dist[v] = dist[u] + graph[u][v];
        }
    }
    print2(dist, V);
};
exports.dijkstra = dijkstra;
