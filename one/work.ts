import { sumOfNumArray } from "../helper/helper";
import { dayOneInput } from "./input";
console.log("day one")
//part one
const input = dayOneInput.split('\n').map(item => Number(item));
let prev = 0;
let partOneAsnwer = 0;
input.forEach((item, i) => {
    if (i != 0) {
        if (item > prev)
            partOneAsnwer++;
    }
    prev = item;
});
console.log(`part one: ${partOneAsnwer}`);
//part two
prev = 0;
let partTwoAnswer = 0;
let dict = {};
input.forEach((item, i) => {
    dict[i] = [item, input[i + 1], input[i + 2]];
});
Object.keys(dict).map((item, i) => {
    const sumOfCurrent = sumOfNumArray(dict[item]);
    if (i != 0) {
        if (sumOfCurrent > prev)
            partTwoAnswer++;
    }
    prev = sumOfCurrent;
});
console.log(`part two: ${partTwoAnswer}`);
