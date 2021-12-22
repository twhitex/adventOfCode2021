var sample = "on x=10..12,y=10..12,z=10..12\non x=11..13,y=11..13,z=11..13\noff x=9..11,y=9..11,z=9..11\non x=10..10,y=10..10,z=10..10";
var getRange = function (str, magicChar) { return str.replace("".concat(magicChar, "="), "").split("..").map(function (x) { return Number(x); }); };
var cube = function (input) {
    var cuboidMap = new Map();
    input.split("\n").forEach(function (line, i) {
        var dir = line.split(" ");
        var onOff = dir[0];
        var xyz = dir[1].split(",");
        var xMap = getRange(xyz[0], "x");
        var yMap = getRange(xyz[1], "y");
        var zMap = getRange(xyz[2], "z");
        for (var x = xMap[0]; x < xMap[1] + 1; x++) {
            for (var y = yMap[0]; y < yMap[1] + 1; y++) {
                for (var z = zMap[0]; z < zMap[1] + 1; z++) {
                    cuboidMap.set("".concat(x, ",").concat(y, ",").concat(z), onOff == "on" ? true : false);
                }
            }
        }
    });
    var onCount = 0;
    cuboidMap.forEach(function (x) {
        if (x)
            onCount++;
    });
    console.log('on count', onCount);
};
cube(sample);
var biggerSample = "on x=-20..26,y=-36..17,z=-47..7\non x=-20..33,y=-21..23,z=-26..28\non x=-22..28,y=-29..23,z=-38..16\non x=-46..7,y=-6..46,z=-50..-1\non x=-49..1,y=-3..46,z=-24..28\non x=2..47,y=-22..22,z=-23..27\non x=-27..23,y=-28..26,z=-21..29\non x=-39..5,y=-6..47,z=-3..44\non x=-30..21,y=-8..43,z=-13..34\non x=-22..26,y=-27..20,z=-29..19\noff x=-48..-32,y=26..41,z=-47..-37\non x=-12..35,y=6..50,z=-50..-2\noff x=-48..-32,y=-32..-16,z=-15..-5\non x=-18..26,y=-33..15,z=-7..46\noff x=-40..-22,y=-38..-28,z=23..41\non x=-16..35,y=-41..10,z=-47..6\noff x=-32..-23,y=11..30,z=-14..3\non x=-49..-5,y=-3..45,z=-29..18\noff x=18..30,y=-20..-8,z=-3..13\non x=-41..9,y=-7..43,z=-33..15\non x=-54112..-39298,y=-85059..-49293,z=-27449..7877\non x=967..23432,y=45373..81175,z=27513..53682\nThe last two steps are fully outside the initial";
cube(biggerSample);
