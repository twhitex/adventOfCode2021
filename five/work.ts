import { safeSet, stringBuilder, stringBuilderNeg } from "../helper/helper"
import { input } from "./input"

const { log } = console
log("day five")
let coordDict: { [xy: string]: number } = {}
let partOneTotal = 0
let partTwoTotal = 0
input.split("\n").forEach((row) => {
    const rowSplit = row.split(",")
    const y1x2 = rowSplit[1].split("->")
    let x1 = Number(rowSplit[0]),
        y1 = Number(y1x2[0]),
        x2 = Number(y1x2[1]),
        y2 = Number(rowSplit[2])
    if (x1 == x2 || y1 == y2) {
        switch (Math.abs(x1 - x2) > 0 ? "x" : "y") {
            case "y":
                stringBuilder(Math.abs(y1 - y2) + 1, y1 > y2 ? y2 : y1)
                    .split(",")
                    .forEach(ele => {
                        const key = `${x1},${ele}`
                        safeSet(coordDict, key, 0)
                        coordDict[key]++
                        if (coordDict[key] == 2)
                            partOneTotal++
                    })
                break;
            case "x":
                stringBuilder(Math.abs(x1 - x2) + 1, x1 > x2 ? x2 : x1)
                    .split(",")
                    .forEach(ele => {
                        const key = `${ele},${y1}`
                        safeSet(coordDict, key, 0)
                        coordDict[key]++
                        if (coordDict[key] == 2)
                            partOneTotal++
                    })
                break;
        }
    }
    // comment out block for part one
    else {
        let ySb = y1 > y2 ? stringBuilderNeg(y1 - y2 + 1, y1).split(",") : stringBuilder(y2 - y1 + 1, y1).split(",");
        (x1 > x2 ? stringBuilderNeg(x1 - x2 + 1, x1).split(",") : stringBuilder(x2 - x1 + 1, x1).split(","))
            .forEach((item, i) => {
                const key = `${item},${ySb[i]}`
                safeSet(coordDict, key, 0)
                coordDict[key]++
                if (coordDict[key] == 2)
                    partTwoTotal++
            })
    }
})

// log('part one', partOneTotal) //7468
log('part two', partTwoTotal + partOneTotal) //22364 

