import { workInput as input } from "./input"

//every 7 days
//number of days until it creates a new lanternfish
// const stateDict = {}
//each day 

let sampleInput = [3, 4, 3, 1, 2] // input.split(",").map(r => Number(r)) 
let dict = new Map<number, number>()
sampleInput.forEach((r, i) => dict.set(i, r))

console.log(dict)

const reproduce = (fish: Map<number, number>, gen: number) => {
    let i = 0
    while (i < gen) {
        let offspring = new Map<number, number>()
        let j = 0
        while (j < fish.size) {
            // console.log("current", fish.get(j), "fish", fish, "offspring", offspring)
            const current = fish.get(j)
            if (current == 0) {
                offspring.set(j, 6)
                offspring.set(j + fish.size, 8)
            }
            else
                offspring.set(j, current - 1)
            j++
        }
        // console.log("offspring", offspring)
        fish = offspring
        i++
    }
    return fish
}

let p1 = reproduce(dict, 80)
console.log('p1 dict', p1)
let p1Total = 0
Object.keys(p1).forEach(r => p1Total += p1[r])
console.log("p1", p1Total)
