"use strict";
exports.__esModule = true;
//every 7 days
//number of days until it creates a new lanternfish
// const stateDict = {}
//each day 
var sampleInput = [3, 4, 3, 1, 2]; // input.split(",").map(r => Number(r)) 
var dict = new Map();
sampleInput.forEach(function (r, i) { return dict.set(i, r); });
console.log(dict);
var reproduce = function (fish, gen) {
    var i = 0;
    while (i < gen) {
        var offspring = new Map();
        var j = 0;
        while (j < fish.size) {
            // console.log("current", fish.get(j), "fish", fish, "offspring", offspring)
            var current = fish.get(j);
            if (current == 0) {
                offspring.set(j, 6);
                offspring.set(j + fish.size, 8);
            }
            else
                offspring.set(j, current - 1);
            j++;
        }
        // console.log("offspring", offspring)
        fish = offspring;
        i++;
    }
    return fish;
};
var p1 = reproduce(dict, 80);
console.log('p1 dict', p1);
var p1Total = 0;
Object.keys(p1).forEach(function (r) { return p1Total += p1[r]; });
console.log("p1", p1Total);
