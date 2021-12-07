"use strict";
exports.__esModule = true;
var helper_1 = require("../../helper/helper");
//every 7 days
//number of days until it creates a new lanternfish
// const stateDict = {}
//each day 
//answer 2 = 1746710169834
var sampleInput = [3, 4, 3, 1, 2]; // input.split(",").map(r => Number(r)) 
var dict = new Map();
sampleInput.forEach(function (r) {
    var get = dict.get(Number(r));
    if (get)
        dict.set(Number(r), get + 1);
    else
        dict.set(Number(r), 1);
});
console.log(dict);
var revolution = function (map, gens) {
    if (gens === void 0) { gens = 80; }
    var range = Object.keys((0, helper_1.stringBuilder)(gens, 1).split(","));
    console.log(range);
    var _loop_1 = function () {
        var newMap = new Map();
        map.forEach(function (num, age, m) {
            var _a, _b, _c;
            if (age <= 0) {
                newMap.set(6, num + ((_a = m.get(6)) !== null && _a !== void 0 ? _a : 0));
                newMap.set(8, num + ((_b = m.get(8)) !== null && _b !== void 0 ? _b : 0));
            }
            else {
                console.log();
                newMap.set(age - 1, num + ((_c = m.get(age - 1)) !== null && _c !== void 0 ? _c : 0));
            }
        });
        map = newMap;
    };
    for (var _ in range) {
        _loop_1();
    }
    return map;
};
console.log("result", revolution(dict, 1));
// const revolution2 = (map: {}, generation: number = 80) => {
//     let i = 0
//     while (i < generation) {
//         var mapLength = Object.keys(map).length
//         let newMap = {}
//         for (let age = 0; age < 9; age++) {
//             if (!map[age])
//                 map[age] = 0
//             if (!newMap[age])
//                 newMap[age] = 0
//             var number = map[age]
//             if (age <= 0) {
//                 if (!newMap[6])
//                     newMap[6] = number
//                 else
//                     newMap[6] += number
//                 if (!newMap[8])
//                     newMap[8] = number
//                 else
//                     newMap[8] += number
//             }
//             else {
//                 if (!newMap[age - 1])
//                     newMap[age - 1] = number
//                 else
//                     newMap[age - 1] += number
//             }
//             // console.log(`map after ${i} gens, key: ${key}`, map)
//         }
//         map = newMap
//         i++
//     }
//     return map
// }
// const x = revolution2(dict, 5)
// console.log("x", x)
// let total = 0
// Object.keys(x).forEach(r => total += Number(x[Number(r)]))
// console.log("result", total)
// console.log(revolution(dict))
// console.log("result", revolution(dict))
//after one revolution
// 1 = 1
// 2 = 2
// 3 = 1
// 4 = 0
// let i = 0
// while (i < 80) {
//     dict = revolution(dict)
//     i++
// }
// console.log(dict)
// let total = 0
// Object.keys(dict).forEach(r => total += dict[Number(r)])
// console.log("result", total)
// const reproduce = (fish: Map<number, number>, gen: number) => {
//     let i = 0
//     while (i < gen) {
//         let offspring = new Map<number, number>()
//         let j = 0
//         while (j < fish.size) {
//             // console.log("current", fish.get(j), "fish", fish, "offspring", offspring)
//             const current = fish.get(j)
//             if (current == 0) {
//                 offspring.set(6, current + 6)
//                 offspring.set(8, current + 8)
//             }
//             else
//                 offspring.set(current - 1, current + j)
//             j++
//         }
//         // console.log("offspring", offspring)
//         fish = offspring
//         i++
//     }
//     return fish
// }
// let p1 = reproduce(dict, 80)
// console.log('p1 dict', p1)
// let p1Total = 0
// Object.keys(p1).forEach(r => p1Total += p1[r])
// console.log("p1", p1Total)
