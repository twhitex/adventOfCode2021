import { dayTwoInput } from "./input";
//part one
console.log("day two")
let xPos = 0;
let yPos = 0;
dayTwoInput.split('\n').forEach(item => {
    if (item.includes("forward"))
        xPos += Number(item.replace("forward ", ""));
    if (item.includes("down"))
        yPos += Number(item.replace("down ", ""));
    if (item.includes("up"))
        yPos -= Number(item.replace("up ", ""));
});
console.log(`part one: ${xPos * yPos}`);
//part two
let aim = 0;
xPos = 0;
yPos = 0;
dayTwoInput.split('\n').forEach(item => {
    if (item.includes("forward")) {
        var num = Number(item.replace("forward ", ""));
        yPos += aim * num;
        xPos += Number(item.replace("forward ", ""));
    }
    if (item.includes("down"))
        aim += Number(item.replace("down ", ""));
    if (item.includes("up"))
        aim -= Number(item.replace("up ", ""));
});
console.log(`part two: ${xPos * yPos}`);
