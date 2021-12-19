import { stringToArray } from "../../helper/helper"

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

const buildGraph = (input: string) => {
    let arr: number[][] = []
    input.split("\n").forEach((x, idx) => {
        arr[idx] = []
        stringToArray(x).forEach(y => {
            arr[idx].push(Number(y))
        })
    })
    return arr
}

const a = (graph: number[][]) => {
    let targetPoint = { y: graph.length - 1, x: graph[0].length - 1 }

    let curr = { point: { x: 0, y: 0 }, visited: new Map([["00", 0]]), riskLvl: 0 }
    let depth = 0
    while (curr.point.x != targetPoint.x && curr.point.y != targetPoint.y) {
        let pos = curr, allowedPoints = []
        if (graph[pos.point.y - 1])  //above
            allowedPoints.push({ y: pos.point.y - 1, x: pos.point.x })
        if (graph[pos.point.y + 1])  //below
            allowedPoints.push({ y: pos.point.y + 1, x: pos.point.x })
        if (graph[pos.point.y][pos.point.x - 1])  //left
            allowedPoints.push({ y: pos.point.y, x: pos.point.x - 1 })
        if (graph[pos.point.y][pos.point.x + 1])  //right
            allowedPoints.push({ y: pos.point.y, x: pos.point.x + 1 })

        let pointWithDist: { point, g, h, f }[] = []



        allowedPoints.forEach(x => {
            let g = manhattanDist(pos.point, x)
            let h = manhattanDist(pos.point, targetPoint) //dist from current position -> end pos
            let f = g + h
            pointWithDist.push({ point: x, g, h, f })
        })
        console.log("target", targetPoint, "pointWithDist", pointWithDist)
        let lowest: { point: Point, f: number } = null
        pointWithDist.forEach(x => {
            if (curr.visited.get(`${x.point.y}${x.point.y}`))
                return
            if (!lowest || x.f < lowest.f)
                lowest = { point: x.point, f: x.f }
        })
        curr = { point: lowest.point, visited: curr.visited, riskLvl: curr.riskLvl + graph[lowest.point.y][lowest.point.x] }
        
        depth++
    }

    console.log("curr", curr)
}



type Point = { x: number, y: number }
const manhattanDist = (from: Point, to: Point) => Math.abs(from.x - to.x) + Math.abs(from.y - to.y)
a(buildGraph(sample))

