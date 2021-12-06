import { input } from "./input"

//every 7 days
//number of days until it creates a new lanternfish
// const stateDict = {}
//each day 


const sampleInput = [3, 4, 3, 1, 2]

let i = 0
const dict = new Map<number, number>()

// input.split(",")
let stateArr = sampleInput.map(r => Number(r))
let total = 0
while (i < 256) {
    const newFish: number[] = []
    stateArr = stateArr.map(r => {
        if (r == 0) {
            newFish.push(8)
            r = 6
        }
        else
            r--
        return r
    })
    //write the current state out to a file?
    stateArr = [...stateArr, ...newFish]
    
    i++
}

console.log(stateArr.length)


// console.log()