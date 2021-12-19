import { stringToArray } from "../../helper/helper"

const dict = `0 = 0000
1 = 0001
2 = 0010
3 = 0011
4 = 0100
5 = 0101
6 = 0110
7 = 0111
8 = 1000
9 = 1001
A = 1010
B = 1011
C = 1100
D = 1101
E = 1110
F = 1111`

//typeId = 4 = literal value
//D2FE28
const str = `1101_0010_1111_1110_0010_1000`
//first 3 are the version
//second 3 are the type
//groups of five after the first 6
//typeId = 4 = literal value (100) - other types are operators

const buildMap = (str: string) => {
    let map = new Map()
    str.split("\n").forEach(x => {
        const inp = x.split(" ")
        map.set(inp[0], inp[2])
    })
    return map
}

const parseHierachy = (hex: string) => {
    let map = buildMap(dict)
    //first 3 bits encode the packet version
    //second 3 bits encode the packet type ID
    let binary = ""
    new Array(hex.length).fill(0).forEach((_, i) => {
        binary += map.get(hex.charAt(i))
    })
    let version = parseInt(binary[0] + binary[1] + binary[2], 2)
    let typeId = parseInt(binary[3] + binary[4] + binary[5], 2)
    binary = binary.slice(6)
    if (typeId == 4) { // literal conversion
        //leading zeroes til multiple of 4
        new Array(binary.length).fill(0).forEach((_, i) => {
            var val = binary.charAt(i)
            

        })
    }

}
parseHierachy('D2FE28')