import { stringBuilder, stringToArray } from "../../helper/helper"
import { input } from "./input"
const sampleInput =
    `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`

const digitDict = {
    0: ['aaaa', 'bb', 'cc', 'ee', 'ff', 'gggg'],
    1: ['cc', 'ff'],
    2: ['aaaa', 'cc', 'dddd', 'ee', 'gggg'],
    3: ['aaaa', 'cc', 'dddd', 'ff', 'gggg'],
    4: ['bb', 'cc', 'dddd', 'ff'],
    5: ['aaaa', 'bb', 'dddd', 'ff', 'gggg'],
    6: ['aaaa', 'bb', 'dddd', 'ee', 'ff', 'gggg'],
    7: ['aaaa', 'cc', 'ff'],
    8: ['aaaa', 'bb', 'cc', 'dddd', 'ee', 'ff', 'gggg'],
    9: ['aaaa', 'bb', 'cc', 'dddd', 'ff', 'gggg'],
}

const digitLengthDict = {}
Object.keys(digitDict).forEach(key => {
    digitLengthDict[Number(key)] = digitDict[key].length
})
const determineOutput = (check: number[], input: string[]) => {
    let output = 0
    input.forEach(str => {
        const list = str.split("|")[1].split(" ").filter(item => item)
        console.log(str, list)
        list.forEach(r => {
            Object.keys(digitLengthDict).map(key => {
                if (check.includes(Number(key))) {
                    console.log("r", r, r.length)
                    if (r.length == digitLengthDict[Number(key)])
                        output++
                }
            })

        })

    })
    return output
}

console.log("p1", determineOutput([1, 4, 7, 8], input.split("\n")))

const map = (input: string[]) => {
    const map = new Map<number, string>()
    map.set(1, input.filter(item => item.length == 2)[0])
    map.set(4, input.filter(item => item.length == 4)[0])
    map.set(7, input.filter(item => item.length == 3)[0])
    map.set(8, input.filter(item => item.length == 7)[0])
    //0, 2, 3, 5, 6, 9
    input.forEach((val, idx) => {
        let isMapped = false
        map.forEach(v => {
            if (val == v) {
                isMapped = true
                return
            }
        })
        if (isMapped)
            return

        var one = map.get(1)
        var valAsArr = stringToArray(val)
        // var hasSet = false
        if (valAsArr.filter(char => one.includes(char)).length == 2) {                 //could be 0, 3 or 9
            var four = map.get(4)
            //is it 0 or 9 ?
            if (valAsArr.length == 5) {
                map.set(3, val)
                return
            }
            if (valAsArr.filter(char => four.includes(char)).length == 4) {  // all matched, so we know it's 9?
                map.set(9, val)
                return
            }
            map.set(0, val)
            return

        }
        else {
            //2, 5, 6
            if (val.length == 6) {
                map.set(6, val)
                return
            }
            var four = map.get(4)
            if (valAsArr.filter(char => four.includes(char)).length == 3) {
                map.set(5, val)
                return
            }

            map.set(2, val)
            return

        }
    })
    return map
}
const decode = (input: string[]) => {
    let total = 0
    input.forEach(row => {
        const split = row.split("|")
        const list1 = split[0].split(" ").filter(item => item)
        const list2 = split[1].split(" ").filter(item => item)
        const decodeMap = map(list1)
        let localTotal = ''
        list2.forEach(item => {
            let match = null
            if (item.length == 2) match = 1
            if (item.length == 4) match = 4
            if (item.length == 3) match = 7
            if (item.length == 7) match = 8
            if (!match) {
                decodeMap.forEach((v, k) => {
                    let itemAsArr = stringToArray(item)
                    var valAsArr = stringToArray(v)
                    if (valAsArr.length != itemAsArr.length)
                        return
                    valAsArr.forEach(char => {
                        var index = itemAsArr.findIndex(c => c == char)
                        if (index < 0)
                            return
                        itemAsArr.splice(index, 1)
                    })
                    if (itemAsArr.length == 0) {
                        match = k
                        return
                    }
                })
            }
            if (match > -1)
                localTotal += match.toString()
        })
        total += Number(localTotal)
    })
    return total
}

console.log("p2", decode(input.split("\n"))) //1055164