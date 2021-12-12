import { stringToArray } from "../../helper/helper"
import { input } from "./input"

const sample =
    `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`

const smallSample =
    `11111
19991
19191
19991
11111`

// const log2d = (chars: number[][]) => {
//     let str = ""
//     chars.forEach(c => {
//         c.forEach(v => {
//             str += v
//         })
//         str += "\n"
//     })
//     console.log(str)
// }

//check for any octopus with an energy level > 9 - flash it
//flash: x x x
//       x i x
//       x x x
//if any of the x's have an energy level > 0 - they also flash
//any octopus that flashed (energy level > 9) has its energy level set to 0


//this could be a lot more efficient..
const countFlashes = (str: string, steps: number): number => {
    let chars: number[][] = []
    str.split("\n").forEach((l, i) => {
        chars[i] = []
        stringToArray(l).forEach(c => {
            chars[i].push(Number(c))
        })
    })
    let flashes = 0, i = 0
    while (i < steps) {
        step(chars)
        chars.forEach(c => {
            c.forEach(v => {
                if (v == 0)
                    flashes++
            })
        })
        i++
    }
    return flashes
}

const step = (chars: number[][]): number => {
    chars.forEach((c, y) => {
        c.forEach((_, x) => {
            chars[y][x] += 1
        })
    })
    if (canFlash(chars))
        flash(chars)
    return 0
}

const canFlash = (chars: number[][]) => {
    let willFlashArr = []
    chars.forEach(c => {
        c.forEach((v, x) => {
            if (v == 10)
                willFlashArr.push(x)
        })
    })
    return willFlashArr.length > 0
}

const flash = (chars: number[][]) => {
    if (!canFlash(chars))
        return
    chars.forEach((c, y) => {
        c.forEach((_, x) => {
            if (chars[y][x] == 10) {
                //flash it
                flashHelper(y - 1, x - 1, chars) //top left
                flashHelper(y - 1, x, chars) //top
                flashHelper(y - 1, x + 1, chars) //top right

                flashHelper(y, x - 1, chars)//left
                flashHelper(y, x + 1, chars)//right

                flashHelper(y + 1, x - 1, chars) //bot left
                flashHelper(y + 1, x, chars) //bot
                flashHelper(y + 1, x + 1, chars) //bot right

                chars[y][x] = 0 //set to zero
            }
        })
    })
    return flash(chars)
}
const flashHelper = (y, x, chars) => {
    if (chars[y])
        if (chars[y][x]) {
            if (chars[y][x] == 10 || chars[y][x] == 0)
                return
            chars[y][x] += 1
        }
}

console.log("p1", countFlashes(input, 100))

const part2 = (str: string) => {
    let chars: number[][] = [], maxLength = 0
    str.split("\n").forEach((l, i) => {
        chars[i] = []
        stringToArray(l).forEach(c => {
            chars[i].push(Number(c))
            maxLength++
        })
    })
    let stop = false, i = 0
    while (!stop) {
        step(chars)
        let flashCount = 0
        chars.forEach(c => {
            c.forEach(v => {
                if (v == 0)
                    flashCount++
            })
        })
        stop = flashCount == maxLength
        i++
    }
    return i
}

console.log("p2", part2(input))