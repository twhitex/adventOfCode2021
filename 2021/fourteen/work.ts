import { input } from "./input"
const sample = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`

const polymerize = (input: string, steps: number) => {
    let split = input.split("\n").filter(x => x)
    let instructionDict = new Map(), arr = []
    let countDict = new Map()
    let matchDict = new Map()
    split.forEach((l, i) => {
        if (i == 0) {
            arr = new Array(l.length).fill(0).map((_, j) => {
                countDict.set(l[j], (countDict.get(l[j]) ?? 0) + 1)
                return l[j]
            })
            for (let j = 0; j < arr.length; j++) {
                if (arr[j + 1])
                    matchDict.set(arr[j] + arr[j + 1], (matchDict.get(arr[j] + arr[j + 1]) ?? 0) + 1)
            }
        } else {
            const instr = l.split(" ")
            instructionDict.set(instr[0], instr[2])
        }
    })
    let stepIdx = 0
    while (stepIdx < steps) {
        let copy = new Map()
        matchDict.forEach((val, key) => {
            var insert = instructionDict.get(key)
            countDict.set(insert, (countDict.get(insert) ?? 0) + val)
            copy.set(key[0] + insert, (copy.get(key[0] + insert) ?? 0) + val)
            copy.set(insert + key[1], (copy.get(insert + key[1]) ?? 0) + val)
        })
        matchDict = copy
        stepIdx++
    }
    let min: { val: number, key: string }, max: { val: number, key: string }
    countDict.forEach((v, k) => {
        const val = { key: k, val: v }
        if (!min && !max) {
            min = val
            max = val
        } else {
            if (v < min.val)
                min = val
            if (v > max.val)
                max = val
        }
    })
    console.log(`steps: ${steps} - result: `, max.val - min.val)
}
polymerize(input, 10) //p1
polymerize(input, 40) //p2