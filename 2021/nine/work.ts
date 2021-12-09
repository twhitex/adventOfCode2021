import { stringToArray } from "../../helper/helper"
import { input, workInput } from "./input"

const sample =
    `2199943210
3987894921
9856789892
8767896789
9899965678`

//find lowpoints

const split = workInput.split("\n").filter(item => item)
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
                    lowestPointArr.push({ val: val, idx: idx + 1, line: i })
                    return
                }
                if (idx == charArr.length - 1 && val < nextLineCharArr[idx] && val < charArr[idx - 1]) {//end
                    lowestPointArr.push({ val: val, idx: idx + 1, line: i })
                    return
                }
                if (val < nextLineCharArr[idx] && val < charArr[idx - 1] && val < charArr[idx + 1]) {
                    lowestPointArr.push({ val: val, idx: idx + 1, line: i })
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
                    lowestPointArr.push({ val: val, idx: idx + 1, line: i })
                    return
                }
                if (idx == charArr.length - 1 && val < prevLineCharArr[idx] && val < charArr[idx - 1]) {//end
                    lowestPointArr.push({ val: val, idx: idx + 1, line: i })
                    return
                }
                if (val < prevLineCharArr[idx] && val < charArr[idx - 1] && val < charArr[idx + 1])
                    lowestPointArr.push({ val: val, idx: idx + 1, line: i })
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
                    lowestPointArr.push({ val: val, idx: idx + 1, line: i })
                    return
                }
                if (idx == charArr.length - 1 && val < prevLineCharArr[idx] && val < nextLineCharArr[idx] && val < charArr[idx - 1]) {//end
                    lowestPointArr.push({ val: val, idx: idx + 1, line: i })
                    return
                }
                if (val < prevLineCharArr[idx] && val < nextLineCharArr[idx] && val < charArr[idx - 1] && val < charArr[idx + 1])
                    lowestPointArr.push({ val: val, idx: idx + 1, line: i })
                return
            })
            break
    }
})

let partOneAnswer = 0
lowestPointArr.forEach(p => {
    partOneAnswer += Number(p.val) + 1
})

console.log("part one", partOneAnswer)