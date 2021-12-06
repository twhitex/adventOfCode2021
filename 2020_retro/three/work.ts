import { input } from "./input"

const { log } = console
const treeSquare = "#"
//right 3, down 1
const split = input.split("\n")

let i = 0, j = 0
let count = 0
while (i < split.length) {
    const line = split[i]
    // console.log(j % line.length)
    if (line[j % line.length] == treeSquare)
        count++
    i += 1
    j += 3
}
console.log(count)
