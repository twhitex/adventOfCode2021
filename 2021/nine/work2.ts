import { stringBuilder, stringToArray } from "../../helper/helper"
import { input, workInput } from "./input"

const sample =
    `2199943210
3987894921
9856789892
8767896789
9899965678`

//find lowpoints

const split = input.split("\n").filter(item => item)
let lowestPointArr: { val: string, idx: number, line: number }[] = []

split.forEach((r, i) => {
    const charArr = stringToArray(r)
    //line below or above (if one last i)
    let nextLineCharArr = []
    let prevLineCharArr = []
    let action: "start" | "end" | "middle"
    if (i == split.length - 1) {
        prevLineCharArr = stringToArray(split[i - 1])
        action = "end"
    }
    else if (i == 0) {
        nextLineCharArr = stringToArray(split[1])
        action = "start"
    } else {
        prevLineCharArr = stringToArray(split[i - 1])
        nextLineCharArr = stringToArray(split[i + 1])
        action = "middle"
    }
    switch (action) {
        case "start":
            //2199943210
            //3987894921
            charArr.forEach((val, idx) => {
                if (idx == 0 && val < nextLineCharArr[idx] && val < charArr[idx + 1]) { // beginnning
                    //is lowest point
                    lowestPointArr.push({ val: val, idx, line: i })
                    return
                }
                if (idx == charArr.length - 1 && val < nextLineCharArr[idx] && val < charArr[idx - 1]) {//end
                    lowestPointArr.push({ val: val, idx, line: i })
                    return
                }
                if (val < nextLineCharArr[idx] && val < charArr[idx - 1] && val < charArr[idx + 1]) {
                    lowestPointArr.push({ val: val, idx, line: i })
                }
                return
            })
            break
        case "end":
            // 8767896789
            // 9899965678
            charArr.forEach((val, idx) => {
                if (idx == 0 && val < prevLineCharArr[idx] && val < charArr[idx + 1]) { // beginnning
                    //is lowest point
                    lowestPointArr.push({ val: val, idx, line: i })
                    return
                }
                if (idx == charArr.length - 1 && val < prevLineCharArr[idx] && val < charArr[idx - 1]) {//end
                    lowestPointArr.push({ val: val, idx, line: i })
                    return
                }
                if (val < prevLineCharArr[idx] && val < charArr[idx - 1] && val < charArr[idx + 1])
                    lowestPointArr.push({ val: val, idx, line: i })
                return
            })
            break
        case "middle":
            // 2199943210
            // 3987894921
            // 9856789892
            charArr.forEach((val, idx) => {
                if (idx == 0 && val < prevLineCharArr[idx] && val < nextLineCharArr[idx] && val < charArr[idx + 1]) { // beginnning
                    //is lowest point
                    lowestPointArr.push({ val: val, idx, line: i })
                    return
                }
                if (idx == charArr.length - 1 && val < prevLineCharArr[idx] && val < nextLineCharArr[idx] && val < charArr[idx - 1]) {//end
                    lowestPointArr.push({ val: val, idx, line: i })
                    return
                }
                if (val < prevLineCharArr[idx] && val < nextLineCharArr[idx] && val < charArr[idx - 1] && val < charArr[idx + 1])
                    lowestPointArr.push({ val: val, idx, line: i })
                return
            })
            break
    }
})

function findAllIndexes<T>(arr: T[], val: T) {
    let idxs = []
    arr.forEach((v, i) => {
        if (v == val)
            idxs.push(i)
    })
    return idxs
}

type PointHelper = { val: string, idx: number, line: number }


const checkPoint = (idx: number, lineIdx: number, line: string) => {
    if (!line)
        return null
    if (["9", undefined].includes(line[idx]))
        return null
    return { val: line[idx], idx, line: lineIdx }
}

const findBasinForPoint = (pt: PointHelper, input: string[]) => { //clockwise
    return [
        checkPoint(pt.idx, pt.line - 1, input[pt.line - 1]), //top
        checkPoint(pt.idx + 1, pt.line, input[pt.line]), //right
        checkPoint(pt.idx, pt.line + 1, input[pt.line + 1]), //bot
        checkPoint(pt.idx - 1, pt.line, input[pt.line]) //left
    ]
}

const basinIteration = (pt: PointHelper, input: string[], keys?: string[]) => {
    let basinPlot = []
    let next: PointHelper[] = findBasinForPoint(pt, input).filter(i => i)
    if (next.length == 0)
        return null
    if (keys && next.filter(n => keys.includes(n.line.toString() + n.idx.toString())).length == 0)
        return null

    keys ??= []
    keys.push(pt.line.toString() + pt.idx.toString())

    next.forEach(p => {
        const key = p.line.toString() + p.idx.toString()
        if (!keys.includes(key)) {
            basinPlot.push(p)
            const nextP = basinIteration({ val: null, idx: p.idx, line: p.line }, input, keys)
            if (nextP)
                basinPlot.push(...nextP)
        }
    })
    return basinPlot
}

const basinFinder = (ptArr: PointHelper[], input: string[]) => {
    let map = new Map()
    ptArr.forEach(p => {
        var basin = basinIteration(p, input) //want an array of all points here
        map.set(p.line.toString() + p.idx.toString(), [p, ...basin])
    })
    let large1 = 0
    let large2 = 0
    let large3 = 0
    map.forEach((v: PointHelper[], k) => {
        if (v.length > large1) {
            large3 = large2
            large2 = large1
            large1 = v.length
        }
        else if (v.length > large2) {
            large3 = large2
            large2 = v.length
        } else if (v.length > large3)
            large3 = v.length
    })
    return large1 * large2 * large3
}

console.log("part two", basinFinder(lowestPointArr, split))