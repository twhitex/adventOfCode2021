import { workInput as input } from "./input"

//every 7 days
//number of days until it creates a new lanternfish
// const stateDict = {}
//each day 


const sampleInput = [3, 4, 3, 1, 2]

let i = 0
let stateArr = input.split(",").map(r => Number(r))

while (i < 80) {
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
    stateArr = [...stateArr, ...newFish]
    i++
}



console.log("part one", stateArr.length)

