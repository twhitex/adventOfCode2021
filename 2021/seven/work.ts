import { findLowest } from "../../helper/helper"
import { input } from "./input"

const horizontalStep = (input: number[]) => {
    let rule = 1 //skip zero
    let max = Math.max(...inputArr)
    let map: Map<number, number> = new Map()
    while (rule < max) {
        map.set(rule, 0)
        input.forEach(r => {
            var currentMap = map.get(rule)
            let amountToMove = Math.abs(r - rule)
            map.set(rule, currentMap + amountToMove)
        })
        rule++
    }
    return map
}

const inputArr = input.split(",").map(r => Number(r))
const { min, key } = findLowest(horizontalStep(inputArr))
console.log("part one: ", min, "min key", key)

//part two => each step costs 1 more unit: the first step costs 1, the second step costs 2, the third step costs 3, and so on.
const horizontalStep2 = (input: number[]) => {
    let rule = 1 //skip zero
    let max = Math.max(...inputArr)
    let map: Map<number, number> = new Map()
    while (rule < max) {
        map.set(rule, 0)
        input.forEach(r => {
            var currentMap = map.get(rule)
            let amountToMove = Math.abs(r - rule) //amount to move
            let i = 1
            let newAmount = amountToMove
            while (i < amountToMove) {
                newAmount += i
                i++
            }
            map.set(rule, currentMap + newAmount)
        })
        rule++
    }
    return map
}

const { min: min2, key: key2 } = findLowest(horizontalStep2(inputArr))
console.log("part two: ", min2, "min key", key2)

