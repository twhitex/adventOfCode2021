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
    let instructionDict = new Map(), stack = []
    let countDict = new Map()

    split.forEach((l, i) => {
        if (i == 0) {
            stack = new Array(l.length).fill(0).map((_, j) => {
                countDict.set(l[j], (countDict.get(l[j]) ?? 0) + 1)
                return l[j]
            })

        }
        const instr = l.split(" ")
        instructionDict.set(instr[0], instr[2])

    })

    let stepIdx = 0
    while (stepIdx < steps) {
        let i = 0
        while (true) {
            if (!stack[i + 1])
                break;
            let insert = instructionDict.get(stack[i] + stack[i + 1])

            countDict.set(insert, (countDict.get(insert) ?? 0) + 1)
            stack.splice(i + 1, 0, insert) //have to throw away what we don't need to stop it from getting so large.. I'm already tracking the counts of each so, it's fine..
            i += 2 //skip 2 to make up for the item we just inserted
        }
        stepIdx++
    }

    console.log(stack)
    console.log(countDict)

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

    console.log("result: ", max.val - min.val)
}

polymerize(input, 40)