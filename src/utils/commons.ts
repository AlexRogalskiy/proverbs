import _ from 'lodash'

export const delimiterBy = (value = '>', num = 80): string => value.repeat(num)

export const delim = delimiterBy()

export const random = (max: number): number => Math.floor(Math.random() * max)

export const randomElement = <T>(arr: T[]): T => arr[random(arr.length)]

export const randomEnum = <T>(value: T): T[keyof T] => {
    const enumValues = (Object.values(value) as unknown) as T[keyof T][]
    const randomIndex = random(enumValues.length)
    return enumValues[randomIndex]
}

export const toStringArray = (value: string | string[], delim = ','): string[] => {
    return _.isArray(value) ? value : value.split(delim)
}

export const join = (value?: string | string[], delim = ','): string => {
    return value ? `(${_.isArray(value) ? value.join(delim) : value})` : ''
}

export const toString = (value: string | string[]): string => (_.isArray(value) ? value[0] : value)

export const getFunctionArgs = (func: any): string[] => {
    const args = func.toString().match(/(function\s)?.*?\(([^)]*)\)/)[2]

    return args
        .split(',')
        .map(arg => arg.replace(/\/\*.*\*\//, '').trim())
        .filter(arg => arg)
}

export const toFormatString = (obj): string => {
    return `(${objToString(obj)})`
}

const objToString = (obj: any, defaultValue = 'null'): string => {
    let res = ''
    let i = 0

    if (!obj) return defaultValue

    const entries = Object.entries(obj)
    for (const [key, value] of entries) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            res += `${key} => ${typeof value === 'object' ? `[${objToString(value)}]` : `${value}, `}`
        }
        if (++i === entries.length) {
            res = res.substring(0, res.length - 2)
        }
    }

    return res
}

export const capitalize = (input: string): string => {
    const inputArray = input.split(' ')
    const output: string[] = []

    for (const inputArrayItem of inputArray) {
        output.push(inputArrayItem.charAt(0).toUpperCase() + inputArrayItem.slice(1))
    }

    return output.join(' ')
}

export const iterateAsync = async <T>(
    obj,
    func: (item: T, index?: number) => Promise<void>
): Promise<void> => {
    await Promise.all(obj.map(async (item: T, index?: number) => await func(item, index)))
}

export const mergeProps = <T>(...obj: any[]): T =>
    _.mergeWith({}, ...obj, (o, s) => {
        return _.isArray(s) && _.isArray(o) ? _.union(o, s) : _.isNull(s) ? o : s
    })

export const hasPrototypeProperty = (obj: any, name: string): boolean => {
    return !obj.hasOwnProperty(name) && name in obj
}

export const hasProperty = (obj: any, prop: PropertyKey): boolean => {
    const proto = obj.__proto__ || obj.constructor.prototype

    //return (prop in obj) && (!(prop in proto) || proto[prop] !== obj[prop]);
    return prop in obj || prop in proto || proto[prop] === obj[prop]
}

/**
 * Utility function to create a K:V from a list of strings
 * @param o initial input array to operate by
 * @param func
 */
export const strToEnum = <T extends string, V>(o: T[], func: (v: T) => V): { [K in T]: V } => {
    return o.reduce((res, key) => {
        res[key] = func(key)
        return res
    }, Object.create(null))
}
