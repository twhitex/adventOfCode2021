var sample = "1163751742\n1381373672\n2136511328\n3694931569\n7463417111\n1319128137\n1359912421\n3125421639\n1293138521\n2311944581";
// representation of the graph    
// A utility function to find the
// vertex with minimum distance
// value, from the set of vertices
// not yet included in shortest
// path tree
function minDistance(dist, sptSet, max) {
    // Initialize min value
    var min = Number.MAX_VALUE;
    var min_index = -1;
    for (var v = 0; v < max; v++) {
        if (sptSet[v] == false && dist[v] <= min) {
            min = dist[v];
            min_index = v;
        }
    }
    console.log("min_index", min_index);
    return min_index;
}
// A utility function to print
// the constructed distance array
function printSolution(dist, max) {
    console.log("Vertex \t\t Distance from Source");
    for (var i = 0; i < max; i++) {
        console.log(i + " \t\t " + dist[i]);
    }
}
// Function that implements Dijkstra's
// single source shortest path algorithm
// for a graph represented using adjacency
// matrix representation
var dijkstra = function (graph, src, max) {
    var dist = new Array(max);
    var sptSet = new Array(max);
    // Initialize all distances as
    // INFINITE and stpSet[] as false
    for (var i = 0; i < max; i++) {
        dist[i] = Number.MAX_VALUE;
        sptSet[i] = false;
    }
    console.log(dist, sptSet);
    // Distance of source vertex
    // from itself is always 0
    dist[src] = 0;
    // Find shortest path for all vertices
    for (var count = 0; count < max - 1; count++) {
        // Pick the minimum distance vertex
        // from the set of vertices not yet
        // processed. u is always equal to
        // src in first iteration.
        var u = minDistance(dist, sptSet, max);
        // Mark the picked vertex as processed
        sptSet[u] = true;
        // Update dist value of the adjacent
        // vertices of the picked vertex.
        for (var v = 0; v < max; v++) {
            // Update dist[v] only if is not in
            // sptSet, there is an edge from u
            // to v, and total weight of path
            // from src to v through u is smaller
            // than current value of dist[v]
            if (!sptSet[v] && graph[u][v] != 0 && dist[u] != Number.MAX_VALUE && dist[u] + graph[u][v] < dist[v]) {
                dist[v] = dist[u] + graph[u][v];
            }
        }
    }
    // Print the constructed distance array
    printSolution(dist, max);
};
var findLowestRist = function (input) {
    var split = input.split("\n");
    var grid = [];
    split.forEach(function (s, i) {
        grid[i] = [];
        new Array(s.length).fill(0).forEach(function (_, j) {
            grid[i][j] = Number(s[j]);
        });
    });
    dijkstra(grid, 0, grid.length);
};
//doesn't include all vertexes? how to do that?
findLowestRist(sample);
