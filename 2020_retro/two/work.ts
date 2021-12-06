import { input } from "./input"
const { log } = console

log("2020: day two")

//row 12 is invalid | row 7 is valid
let answer = 0
input
    .split("\n")
    .forEach((r, i) => {
        const split = r.split(" ")
        let bounds = split[0].split("-").map(s => Number(s)),
            match = split[1].split(":")[0],
            password: string = split[2]
        const hits = Object.keys(password).filter(i => password[i] == match)?.length
        if (hits >= bounds[0] && hits <= bounds[1])
            answer++
    })

log("part one", answer) //620

answer = 0
input
    .split("\n")
    .forEach(r => {
        const split = r.split(" ")
        let indexes = split[0].split("-").map(s => Number(s)),
            match = split[1].split(":")[0],
            password: string = split[2]

        const matchIndex = indexes[0] - 1, nonMatchIndex = indexes[1] - 1

        if (password[matchIndex] == match && password[nonMatchIndex] != match)
            answer++
        else if (password[matchIndex] != match && password[nonMatchIndex] == match)
            answer++
    })

log("part two", answer)