import { dayThreeInput } from "./input";

console.log("day three")
//part one 
var inputSplit = dayThreeInput.split('\n')
var lengthArr = Object.keys(inputSplit[0])
const bitDict = {} // {[key: number] = string[]}
inputSplit.forEach((input, i) => {
    lengthArr.forEach((element, j) => {
        if (bitDict[j] == null)
            bitDict[j] = []
        bitDict[j].push(input[element])
    })
})
const mostCommonString = (stringArr) => {
    const strDict = {}
    stringArr.forEach((item) => {
        if (!strDict[item])
            strDict[item] = 1
        strDict[item]++
    })

    let max = { key: "", value: 0 }
    Object.keys(strDict).forEach((key, i) => {
        if (i == 0 || strDict[key] > max.value)
            max = { key: key, value: strDict[key] }
    })
    // console.log(strDict, "=", max)
    return max.key
}

let gammaStr = "" //most common
let epsilonStr = "" //least common
Object.keys(bitDict).forEach((key) => {
    const mostCommon = mostCommonString(bitDict[key])
    gammaStr += mostCommon
    epsilonStr += mostCommon == "0" ? "1" : "0"
})

const gammaRate = parseInt(gammaStr, 2)
const epsilonRate = parseInt(epsilonStr, 2)

console.log(`part one: ${gammaRate * epsilonRate}`)

//part two

//most common with in the remaining list..
//a little different than part one !

let csrArr = inputSplit
let ogrArr = inputSplit
let ogrArrResult = ""
let csrArrResult = ""
Object.keys(gammaStr).forEach(index => {
    //foreach index in gammaStr (12 digit binary number)
    //find the most common bit in the 'index' position
    //if 0 and 1 are equally common then use "1" as most common
    //ogr
    if (!ogrArrResult) {
        let numOfZeros = 0
        let numOfOnes = 0
        ogrArr.forEach(binary => {
            if (binary[index] == "0")
                numOfZeros++
            else
                numOfOnes++
        })
        let mostCommon = ""
        if (numOfZeros == numOfOnes)
            mostCommon = "1"
        else
            mostCommon = numOfZeros > numOfOnes ? "0" : "1"

        //found mostCommon for the current position
        ogrArr = ogrArr.filter(item => item[index] == mostCommon)
        if (ogrArr.length == 1)
            ogrArrResult = ogrArr[0]
    }

    //csr
    if (!csrArrResult) {
        let numOfZeros = 0
        let numOfOnes = 0
        csrArr.forEach(binary => {
            if (binary[index] == "0")
                numOfZeros++
            else
                numOfOnes++
        })
        let leastCommon = ""
        if (numOfZeros == numOfOnes)
            leastCommon = "0"
        else
            leastCommon = numOfZeros > numOfOnes ? "1" : "0"
        //found leastCommon for the current position
        csrArr = csrArr.filter(item => item[index] == leastCommon)
        if (csrArr.length == 1)
            csrArrResult = csrArr[0]
    }
})

var ogrRating = parseInt(ogrArrResult, 2)
var csrRating = parseInt(csrArrResult, 2)
console.log(`part two: ${ogrRating * csrRating}`)