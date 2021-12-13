import { input } from "./input"

const sample = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`

//start -> end
//lowercase letters are small caves
//can only travel through small caves once
const buildMap = (input: string[]): Map<string, string[]> => {
    const paths = new Map()
    input.forEach(route => {
        const path = route.split("-")
        const p1 = path[0]
        const p2 = path[1]
        const mp1 = paths.get(p1)
        const mp2 = paths.get(p2)
        if (p1 == "start") {
            if (!mp1)
                paths.set(p1, [p2])
            else
                paths.set(p1, [...mp1, p2])
        } else if (p2 == "start") {
            if (!mp2)
                paths.set(p2, [p1])
            else
                paths.set(p2, [...mp2, p1])
        } else {
            if (!mp1)
                paths.set(p1, [p2])
            else
                paths.set(p1, [...mp1, p2])
            if (!mp2)
                paths.set(p2, [p1])
            else
                paths.set(p2, [...mp2, p1])
        }
    })
    return paths
}

const navigate = (paths: Map<string, string[]>) => {
    const uniquePaths = []
    paths.forEach((val, key) => {

    })
    console.log(uniquePaths)
}

// navigate(buildMap(sample.split("\n")))
const x = (input: string) => {
    const uniqueCaves = []
    const split = input.split("\n")
    // const starts = split.filter(item => item.includes("start")).map(str => str.replace("start", "").replace("-", ""))

    let stack = ["start"]

    //keep an array as the 'current' node to search for.. like a stack
    //loop through it until u get to the end .. save that to a string then unravel from there...
    let top = stack[0], depth = 0
    let oneWayPathsVisited = []
    while (stack.length > 0) {
        let dCheck = depth
        split.forEach(path => {
            let singlePath = top.match(/a-z/)
            
            const caves = path.split("-")
            if (caves.includes(top)) {
                top = caves[0] == top ? caves[1] : caves[0]
                stack.push(top)
                depth++
                return
            }
            if (dCheck != depth)
                return
        })
        console.log(`depth: ${depth} - ${stack}`)
        if (stack[stack.length - 1] == "end") {
            console.log("full path:", stack)
            stack.pop()
        }
        if (stack.length > 10)
            stack = []

    }

    // console.log(starts)
    //from 'start' how many paths end at 'end' ?
}

const navigate2 = (starts: string[],) => {

}

x(sample)
