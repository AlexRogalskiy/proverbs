import fetch from 'isomorphic-unfetch'
import _ from 'lodash'
import { tmpdir } from 'os'
import { existsSync, mkdirSync } from 'fs'

export const delimiterBy = (value = '>', num = 80): string => value.repeat(num)

export const delim = delimiterBy()

export const tempDir = tmpdir()

export const random = (max: number): number => Math.floor(Math.random() * max)

export const randomElement = <T>(arr: T[]): T => arr[random(arr.length)]

export const ensureDirExists = (dir: string): void => {
    if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true })
    }
}

export const toBase64ImageUrl = async (request: RequestInfo): Promise<string> => {
    const fetchImageUrl = await fetch(request)
    const responseArrBuffer = await fetchImageUrl.arrayBuffer()

    return `data:${fetchImageUrl.headers.get('Content-Type') || 'image/png'};base64,${Buffer.from(
        responseArrBuffer
    ).toString('base64')}`
}

export const isBlankString = (value: string): boolean => !value || /^\s*$/.test(value)

export const toString = (value: string | string[]): string => (Array.isArray(value) ? value[0] : value)

export const randomEnum = <T>(value: T): T[keyof T] => {
    const enumValues = (Object.values(value) as unknown) as T[keyof T][]
    const randomIndex = random(enumValues.length)
    return enumValues[randomIndex]
}

export const toFormatString = (obj): string => {
    return `(${objToString(obj)})`
}

const objToString = (obj): string => {
    let res = ''
    let i = 0

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

export const iterateAsync = async <T>(
    obj,
    func: (item: T, index?: number) => Promise<void>
): Promise<void> => {
    await Promise.all(obj.map(async (item: T, index?: number) => await func(item, index)))
}

export const mergeProps = <T>(...obj: unknown[]): T =>
    _.mergeWith({}, ...obj, (o, s) => {
        return _.isArray(s) && _.isArray(o) ? _.union(o, s) : _.isNull(s) ? o : s
    })

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
