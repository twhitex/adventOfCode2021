const sample = `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`




// representation of the graph    

// A utility function to find the
// vertex with minimum distance
// value, from the set of vertices
// not yet included in shortest
// path tree
function minDistance(dist, sptSet, max) {

    // Initialize min value
    let min = Number.MAX_VALUE;
    let min_index = -1;

    for (let v = 0; v < max; v++) {
        if (sptSet[v] == false && dist[v] <= min) {
            min = dist[v];
            min_index = v;
        }
    }
    console.log("min_index", min_index)
    return min_index;
}

// A utility function to print
// the constructed distance array
function printSolution(dist, max) {
    console.log("Vertex \t\t Distance from Source");
    for (let i = 0; i < max; i++) {
        console.log(i + " \t\t " + dist[i]);
    }
}

// Function that implements Dijkstra's
// single source shortest path algorithm
// for a graph represented using adjacency
// matrix representation
const dijkstra = (graph, src, max) => {
    let dist = new Array(max);
    let sptSet = new Array(max);

    // Initialize all distances as
    // INFINITE and stpSet[] as false
    for (let i = 0; i < max; i++) {
        dist[i] = Number.MAX_VALUE;
        sptSet[i] = false;
    }
    console.log(dist, sptSet)
    // Distance of source vertex
    // from itself is always 0
    dist[src] = 0;

    // Find shortest path for all vertices
    for (let count = 0; count < max - 1; count++) {

        // Pick the minimum distance vertex
        // from the set of vertices not yet
        // processed. u is always equal to
        // src in first iteration.
        let u = minDistance(dist, sptSet, max);

        // Mark the picked vertex as processed
        sptSet[u] = true;

        // Update dist value of the adjacent
        // vertices of the picked vertex.
        for (let v = 0; v < max; v++) {

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
}

const findLowestRist = (input: string) => {
    const split = input.split("\n")
    const grid: number[][] = []
    split.forEach((s, i) => {
        grid[i] = []
        new Array(s.length).fill(0).forEach((_, j) => {
            grid[i][j] = Number(s[j])
        })
    })
    dijkstra(grid, 0, grid.length)
}


//doesn't include all vertexes? how to do that?



findLowestRist(sample)
