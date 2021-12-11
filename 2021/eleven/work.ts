import { stringToArray } from "../../helper/helper"
import { input } from "./input"

const sample = `
5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`

const smallSample = `
11111
19991
19191
19991
11111`

const logMap = (map, length) => {
    let newStr = ""
    map.forEach((v, k) => {
        newStr += v.toString() + ((k + 1) % length == 0 ? "\n" : "")
    })
    console.log(newStr)
}

const findFlashes = (str: string, steps: number) => {
    const split = str.split("\n").filter(i => i)
    const lineLength = split[0].length
    let map = new Map(), base = 0
    split.forEach(l => {
        if (l)
            stringToArray(l).forEach((c, i) => {
                map.set(i + base, Number(c))
            })
        base += l.length
    })
    let i = 0, flashes = 0
    while (i < steps) {
        flashes += step(map, lineLength)
        logMap(map, lineLength)
        i++
    }
    return flashes
}

const step = (map: Map<number, number>, lineLength: number) => {
    let triggerActions: number[] = []
    let flashCount = 0
    map.forEach((v, k) => {
        if (v + 1 == 10) {
            map.set(k, 0)
            flashCount++
            triggerActions.push(k)
        } else {
            map.set(k, v + 1)
        }
    })
    triggerActions.forEach(t => flashCount += trigger(map, t, lineLength))
    return flashCount
}

const trigger = (map: Map<number, number>, idx: number, length: number) => {
    const l = idx - 1
    const r = idx + 1
    let flashCount = 0
    flashCount += setCube(map, l - length, length) //topleft
    flashCount += setCube(map, idx - length, length) //top
    flashCount += setCube(map, r - length, length) //topright

    flashCount += setCube(map, l, length) //left
    // flashCount += setCube(map, idx, length) //center
    flashCount += setCube(map, r, length) //right

    flashCount += setCube(map, l + length, length) //botleft
    flashCount += setCube(map, idx + length, length) //bot
    flashCount += setCube(map, r + length, length) //botright
    return flashCount

}

const setCube = (map: Map<number, number>, idx: number, length: number) => {
    const val = map.get(idx)
    if (!val)
        return 0
    if (val + 1 == 10) {
        map.set(idx, 0)
        return trigger(map, idx, length) + 1
    }
    map.set(idx, val + 1)
    return 0
}

console.log("p1", findFlashes(sample, 3))