export const sumOfNumArray = (arr) => {
    let total = 0;
    arr.forEach(item => total += item);
    return total;
};

export const stringBuilder = (length: number, base?: number, log?: boolean) => {
    let str = ""
    for (let index = base ?? 0; index < (base ?? 0) + length; index++) {
        if (index == base ?? 0)
            str = index.toString();
        else
            str += `,${index.toString()}`
    }
    if (log)
        console.log(str)
    return str
}

export const stringBuilderNeg = (length: number, base?: number, log?: boolean) => {
    let str = ""
    for (let index = base; index > base - length; index--) {
        if (index == base ?? 0)
            str = index.toString();
        else
            str += `,${index.toString()}`
    }
    if (log)
        console.log(str)
    return str
}


type DictValType = string | number | boolean | {} | Array<any>

export const safeSet = (dict: {}, key: any, val: DictValType) => {
    if (!dict[key])
        dict[key] = val
}

export const safeSet2 = (dict: {}, key: any, val: DictValType, setType?: "overwrite" | "add") => {
    if (!dict[key])
        dict[key] = val
    else if (setType)
        switch (setType) {
            case "add":
                dict[key] += val
                break;
            case "overwrite":
                dict[key] = val
                break
        }
}

export const findLowest = (map: Map<number, number>) => {
    let key = 0
    let min = 0
    map.forEach((v, k) => {
        if (min == 0)
            min = v
        if (v < min) {
            min = v
            key = k
        }
    })
    return { min, key }
}

export const stringToArray = (str: string): string[] => {
    return Object.keys(str).map(key => str[key])
}