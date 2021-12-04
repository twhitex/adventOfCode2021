import { input } from "./input"

console.log("day four")
const randomOrder = `67,3,19,4,64,39,85,14,84,93,79,26,61,24,65,63,15,69,48,8,82,75,36,96,16,49,28,40,97,38,76,91,83,7,62,94,21,95,6,10,43,17,31,34,81,23,52,60,54,29,70,12,35,0,57,45,20,71,78,44,90,2,33,68,53,92,50,73,88,47,58,5,9,87,22,13,18,30,59,56,99,11,77,55,72,32,37,89,42,27,66,41,86,51,74,1,46,25,98,80`
let splitInput = input.split(" ").filter(item => item)
let inputArr = []
splitInput.forEach(item => { //have to clean the array beacuse of how the input was given/read.
    if (item.includes("\n"))
        item.split("\n").forEach(split => {
            if (!!split)
                inputArr.push(split)
        })
    else if (!!item)
        inputArr.push(item)
})

const board_size = 25
// console.log(inputArr)
//bingo 5x5
//find a winning board -> on that board find the sum of all unmarked numbers;
//then multiply that number by the last number that was called

//figure out which board will win first
//what will your final score be if you choose that board?
type BoardMember = { value: string, marked: boolean }
let boards: { [key: number]: BoardMember[] } = {}
// console.log(inputArr.length)
const numOfBoards = inputArr.length / 25

let stringHelper = ""
for (let index = 0; index < numOfBoards; index++) {
    stringHelper += "0"
}

Object.keys(stringHelper).forEach(key => {
    var keyAsNum = Number(key)
    if (!boards[keyAsNum])
        boards[keyAsNum] = []

    const lowerBounds = keyAsNum * board_size
    const upperBounds = lowerBounds + board_size

    for (let index = lowerBounds; index < upperBounds; index++) { //chunking 25
        boards[keyAsNum].push({ value: inputArr[index], marked: false })
    }
})

const callOutArray = randomOrder.split(",")


//so can only be bingo IF the first markedSpace is: 0  1  2  3  4 
//                                                  5 
//                                                  10
//                                                  15
//                                                  20
const horizontalBingo: { [key: number]: number[] } = {
    0: [1, 2, 3, 4],
    5: [6, 7, 8, 9],
    10: [11, 12, 13, 14],
    15: [16, 17, 18, 19],
    20: [21, 22, 23, 24],
}

const verticalBingo: { [key: number]: number[] } = {
    0: [5, 10, 15, 20],
    1: [6, 11, 16, 21],
    2: [7, 12, 17, 22],
    3: [8, 13, 18, 23],
    4: [9, 14, 19, 24],
}
let escape = false
let lastIndexCalledOut = 0
let firstBingoBoardIndex = 0
callOutArray.forEach((callOut, idx) => {
    if (!escape)
        Object.keys(boards).forEach(key => {
            if (!escape) {
                const currentBoard: BoardMember[] = boards[key]
                currentBoard.filter(board => board.value == callOut).forEach(bm => bm.marked = true)
                //now check if there is match
                var markedSpaces = currentBoard.map((item, i) => { if (item.marked) return i }).filter(item => item == 0 || !!item)
                if (markedSpaces.length > 0) {
                    markedSpaces.forEach((element, i) => {
                        if (!escape) {
                            if (!!horizontalBingo[element]) {
                                let isBingo = true
                                horizontalBingo[element]?.forEach((bingoIdx, j) => {
                                    if (isBingo) {
                                        const nextMarkedSpaceIdx = i + j + 1
                                        if (!markedSpaces[nextMarkedSpaceIdx])
                                            isBingo = false
                                        else if (bingoIdx != markedSpaces[nextMarkedSpaceIdx])
                                            isBingo = false
                                    }
                                })
                                if (!isBingo) { // try vertical
                                    verticalBingo[element]?.forEach((bingoIdx, j) => {
                                        if (isBingo) {
                                            const nextMarkedSpaceIdx = i + j + 1
                                            if (!markedSpaces[nextMarkedSpaceIdx])
                                                isBingo = false
                                            else if (bingoIdx != markedSpaces[nextMarkedSpaceIdx])
                                                isBingo = false
                                        }
                                    })
                                }
                                if (isBingo) {
                                    //winnner winner chicken dinner
                                    escape = true
                                    lastIndexCalledOut = idx
                                    firstBingoBoardIndex = Number(key)
                                }
                            }
                        }

                    });
                }
            }

        })
})
let unmarkedSpacesTotal = 0
boards[firstBingoBoardIndex].filter((item) => !item.marked).forEach(item => unmarkedSpacesTotal += Number(item.value))
console.log(`part one: ${Number(callOutArray[lastIndexCalledOut]) * unmarkedSpacesTotal}`)


//part two
//which board would bingo LAST ?
escape = false
const completedBoardIndexes: number[] = []
callOutArray.forEach((callOut, idx) => {
    Object.keys(boards).forEach(key => {
        if (!completedBoardIndexes.includes(Number(key))) {
            const currentBoard: BoardMember[] = boards[key]
            currentBoard.filter(board => board.value == callOut).forEach(bm => bm.marked = true)
            //now check if there is match
            var markedSpaces = currentBoard.map((item, i) => { if (item.marked) return i }).filter(item => item == 0 || !!item)
            if (markedSpaces.length > 0) {
                markedSpaces.forEach((element, i) => {
                    if (!!horizontalBingo[element]) {
                        let isBingo = true
                        horizontalBingo[element]?.forEach((bingoIdx, j) => {
                            if (isBingo) {
                                const nextMarkedSpaceIdx = i + j + 1
                                if (!markedSpaces[nextMarkedSpaceIdx])
                                    isBingo = false
                                else if (bingoIdx != markedSpaces[nextMarkedSpaceIdx])
                                    isBingo = false
                            }
                        })
                        if (!isBingo) { // try vertical
                            verticalBingo[element]?.forEach((bingoIdx, j) => {
                                if (isBingo) {
                                    const nextMarkedSpaceIdx = i + j + 1
                                    if (!markedSpaces[nextMarkedSpaceIdx])
                                        isBingo = false
                                    else if (bingoIdx != markedSpaces[nextMarkedSpaceIdx])
                                        isBingo = false
                                }
                            })
                        }
                        if (isBingo) {
                            //winnner winner chicken dinner
                            lastIndexCalledOut = idx
                            completedBoardIndexes.push(Number(key))
                        }
                    }
                });
            }
        }
    })
})

const lastCompletedBoard = boards[completedBoardIndexes[completedBoardIndexes.length - 1]]
unmarkedSpacesTotal = 0
lastCompletedBoard.filter((item) => !item.marked).forEach(item => unmarkedSpacesTotal += Number(item.value))
console.log(`part two: ${Number(callOutArray[lastIndexCalledOut]) * unmarkedSpacesTotal}`)