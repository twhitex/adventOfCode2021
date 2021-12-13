import { stringBuilder } from "../../helper/helper"
import { input } from "./input"

const sample = `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`

const log2d = (arr: number[][], msg?: string) => {
    let str = ""
    arr.forEach(y => {
        y.forEach(x => {
            str += x == 0 ? " . " : " # "
        })
        str += "\n\n"
    })
    if (msg)
        console.log(msg)
    console.log(str)
}

const buildPlot = (input: string) => {
    let foldInstructions: { axis: "y" | "x", index: number }[] = []
    let topx = 0, topy = 0
    input.split("\n").filter(i => i).forEach(line => {
        if (line.startsWith("f")) {
            if (line.includes("y="))
                foldInstructions.push({ axis: "y", index: Number(line.replace("fold along y=", "")) })
            else foldInstructions.push({ axis: "x", index: Number(line.replace("fold along x=", "")) })
        }
        else {
            const [x, y] = line.split(",")
            if (Number(x) > topx)
                topx = Number(x)
            if (Number(y) > topy)
                topy = Number(y)
        }
    })
    let graph: number[][] = []
    for (let i = 0; i < topy + 1; i++) {
        graph[i] = []
        for (let j = 0; j < topx + 1; j++) {
            graph[i].push(0)
        }
    }

    input.split("\n").filter(i => !!i).forEach(line => {
        if (!line.startsWith("f")) {
            const [x, y] = line.split(",")
            graph[Number(y)][Number(x)] += 1
        }
    })
    let foldedGraph = graph
    foldInstructions.forEach((instruction, i) => {
        if (instruction.axis == "x")
            foldedGraph = foldX(instruction.index, foldedGraph)
        else
            foldedGraph = foldY(instruction.index, foldedGraph)
        console.log(`instruction ${i} dot count: ${countDots(foldedGraph)}`)
    })
    log2d(foldedGraph, "result")
}

const countDots = (arr: number[][]) => {
    let dots = 0
    arr.forEach(a => {
        a.forEach(dot => {
            if (dot > 0)
                dots++
        })
    })
    return dots
}

const foldY = (foldPoint: number, graph: number[][]) => {
    let newGraph = graph.concat()
    newGraph.splice(foldPoint, 1)
    const upperGraph = newGraph.splice(0, newGraph.length - foldPoint)
    let yLength = newGraph.length
    let xLength = newGraph[0].length
    for (let y = yLength; y > 0; y--) {
        for (let x = xLength; x > 0; x--) {
            upperGraph[yLength - y][x - 1] += newGraph[y - 1][x - 1]
        }
    }
    return upperGraph.concat()
}

const foldX = (foldPoint: number, graph: number[][]) => {
    let newGraph: number[][] = []
    let yLength = graph.length
    let xLength = graph[0].length - 1 //inclusive
    for (let y = 0; y < yLength; y++) {
        newGraph[y] = []
        for (let x = 0; x < foldPoint; x++) {
            newGraph[y].push(graph[y][x] + graph[y][xLength - x])
        }
    }
    return newGraph
}



buildPlot(input) 