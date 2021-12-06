import { input } from "./input"

const { log } = console
log("day one")

const splitInput = input.split("\n").map(item => Number(item))
let answer = 0

splitInput.forEach((row, i) => {
    if (answer)
        return
    splitInput.forEach(item => {
        if (row + item == 2020) {
            answer = row * item
            return
        }
    })
})

log("part one", answer)

answer = null
splitInput.forEach((r1, i) => {
    if (answer)
        return
    splitInput.forEach(r2 => {
        splitInput.forEach(r3 => {
            if (r1 + r2 + r3 == 2020) {
                answer = r1 * r2 * r3
                return
            }
        })
    })
})

log("part two",answer)