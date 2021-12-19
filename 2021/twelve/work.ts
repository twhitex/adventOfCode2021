import { input } from "./input"

const sample = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`

const sample2 = `dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`

const sample3 = `fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`

type MyStack = { name: string, visited: string[], smallCount: number }

const buildMap = (input: string) => {
    let map = new Map()
    input.split("\n").forEach(x => {
        const c = x.split("-")
        if (c[1] != "start")
            map.set(c[0], map.get(c[0]) ? [...map.get(c[0]), c[1]] : [c[1]])
        if (c[0] != "start")
            map.set(c[1], map.get(c[1]) ? [...map.get(c[1]), c[0]] : [c[0]])
    })
    return map
}

const part1 = (map: Map<string, string[]>) => {
    const paths: { path: string, smallCount: number }[] = [], stack: MyStack[] = [{ name: "start", visited: ["start"], smallCount: 0 }]
    while (stack.length > 0) {
        let pos = stack.pop()
        map.get(pos.name).forEach(next => {
            let path = [...pos.visited, next]
            const isLowerCase = next == next.toLowerCase()
            if (next == "end")
                paths.push({ path: path.join(", "), smallCount: pos.smallCount })
            else if (!isLowerCase)
                stack.push({ name: next, visited: path, smallCount: pos.smallCount })
            else if (!pos.visited.includes(next) && isLowerCase) {
                stack.push({ name: next, visited: path, smallCount: pos.smallCount + 1 })
            }
        })
    }
    console.log(paths.filter(x => x.smallCount > 0).length)
}


part1(buildMap(input)) // 4495

type MyStack2 = MyStack & { allowedDuplicateSmallCaves: string[] }
const part2 = (map: Map<string, string[]>) => {
    let uniqueSmallCaves = []
    map.forEach((_, k) => {
        if (!["start", "end"].includes(k))
            if (k == k.toLowerCase() && !uniqueSmallCaves.includes(k)) {
                uniqueSmallCaves.push(k)
            }
    })
    const paths: { path: string, smallCount: number }[] = [], stack: MyStack2[] = [{ name: "start", visited: ["start"], smallCount: 0, allowedDuplicateSmallCaves: uniqueSmallCaves }]
    while (stack.length > 0) {
        let pos = stack.pop()
        map.get(pos.name).forEach(next => {
            let path = [...pos.visited, next]
            const isLowerCase = next == next.toLowerCase()
            if (next == "end")
                paths.push({ path: path.join(", "), smallCount: pos.smallCount })
            else if (!isLowerCase)
                stack.push({ ...pos, name: next, visited: path })
            else if (isLowerCase) {
                if (!pos.visited.includes(next)) {
                    stack.push({ name: next, visited: path, smallCount: pos.smallCount + 1, allowedDuplicateSmallCaves: pos.allowedDuplicateSmallCaves })
                    return
                }
                if (pos.allowedDuplicateSmallCaves.includes(next)) {
                    stack.push({ name: next, visited: path, smallCount: pos.smallCount + 1, allowedDuplicateSmallCaves: [] })
                }
            }
        })
    }
    console.log(paths.length)
}

part2(buildMap(input)) //131254



