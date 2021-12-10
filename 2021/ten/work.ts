import { stringBuilder, stringToArray } from "../../helper/helper";
import { input, workInput } from "./input";

const sample = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`

// If a chunk opens with (, it must close with ).
// If a chunk opens with [, it must close with ].
// If a chunk opens with {, it must close with }.
// If a chunk opens with <, it must close with >.

const correspondingTag = (c: string) => {
    switch (c) {
        case "(":
            return ")"
        case "[":
            return "]"
        case "{":
            return "}"
        case "<":
            return ">"
        case ")":
            return "("
        case "]":
            return "["
        case "}":
            return "{"
        case ">":
            return "<"
    }
}

const isOpenTag = (c: string) => ["(", "[", "{", "<"].includes(c)
const isCorrupted = (str: string) => {
    let openArr = []
    let corruptedChar = null
    stringToArray(str).forEach(c => {
        if (!corruptedChar)
            if (isOpenTag(c))
                openArr.push(c)
            else {
                //pop the open array and if it doesn't match .. it's corrupted
                const mostRecentOpen = openArr.pop()
                if (mostRecentOpen != correspondingTag(c)) {
                    corruptedChar = c
                    return
                }

            }
    })
    return corruptedChar
}

const findScore = (s: string[]) => {
    const scoreMap = new Map([[")", 3], ["]", 57], ["}", 1197], [">", 25137]])
    let score = 0
    s.forEach(l => {
        score += scoreMap.get(isCorrupted(l)) ?? 0
    })
    return score
}

console.log("p1", findScore(input.split("\n")))

const getMissingTags = (str: string) => {
    let openArr = []
    stringToArray(str).forEach(c => {
        if (isOpenTag(c))
            openArr.push(c)
        else
            openArr.pop()
    })
    let missingParts = []
    openArr.reverse().forEach(c => {
        missingParts.push(correspondingTag(c))
    })
    return missingParts
}

const incompleteLines = (s: string[]) => {
    s = s.filter(l => !isCorrupted(l))
    const scoreMap = new Map([[")", 1], ["]", 2], ["}", 3], [">", 4]])
    let scoreList = []
    s.forEach(l => {
        let score = 0
        getMissingTags(l).forEach(t => {
            score *= 5
            score += scoreMap.get(t)
        })
        scoreList.push(score)
    })
    scoreList = scoreList.sort((a, b) => a - b)
    return scoreList[scoreList.length - Math.round(scoreList.length / 2)]
}

console.log("p2", incompleteLines(input.split("\n")))