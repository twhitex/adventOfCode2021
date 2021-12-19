let V = 10 // I think this should be 10???

const minDist = (dist: number[], sptSet: boolean[]) => {
    let min = Number.MAX_VALUE, minIdx = -1
    for (let v = 0; v < V; v++) {
        if (!sptSet[v] && dist[v] <= min) {
            min = dist[v]
            minIdx = v
        }
    }
    return minIdx
}
const print2 = (dist: number[], n: number) => {
    for (let i = 0; i < V; i++) {
        console.log(`index: ${i}    Distance from src: ${dist[i]}`)
    }
}

export const dijkstra = (graph: number[][], src: number) => {
    let sptSet = new Array<boolean>(V), dist = new Array<number>(V)
    for (let i = 0; i < V; i++) {
        dist[i] = Number.MAX_VALUE
        sptSet[i] = false
    }
    console.log()
    dist[src] = 0
    for (let i = 0; i < V - 1; i++) {
        let u = minDist(dist, sptSet)
        sptSet[u] = true
        for (let v = 0; v < V; v++) {
            if (!sptSet[v]
                && graph[u][v] != 0
                && dist[u] != Number.MAX_VALUE
                && dist[u] + graph[u][v] < dist[v])
                dist[v] = dist[u] + graph[u][v]
        }
    }
    print2(dist, V)
}