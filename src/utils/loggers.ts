import dateFormat from 'dateformat'
import boxen from 'boxen'

import { Processor } from '../../typings/standard-types'

import { profile } from './profiles'

import { mergeProps } from './commons'

/**
 * Logger
 * @desc Type representing logging function
 */
type Logger<T, V> = (message: T, ...args: V[]) => void

const DATETIME_FORMAT = 'dddd, mmmm dS, yyyy, hh:MM:ss TT'

const getColor = (value: string, defaultValue = ''): string => (process.stdout.isTTY ? value : defaultValue)

const COLORS = {
    RESET: getColor('\u001B[0m'),
    BLACK: getColor('\u001B[0;30m'),
    RED: getColor('\u001B[0;31m'),
    GREEN: getColor('\u001B[0;32m'),
    BROWN: getColor('\u001B[0;33m'),
    BLUE: getColor('\u001B[0;34m'),
    PURPLE: getColor('\u001B[0;35m'),
    CYAN: getColor('\u001B[0;36m'),
    LIGHT_GRAY: getColor('\u001B[0;37m'),
    DARK_GRAY: getColor('\u001B[1;30m'),
    LIGHT_RED: getColor('\u001B[1;31m'),
    LIGHT_GREEN: getColor('\u001B[1;32m'),
    YELLOW: getColor('\u001B[1;33m'),
    LIGHT_BLUE: getColor('\u001B[1;34m'),
    LIGHT_PURPLE: getColor('\u001B[1;35m'),
    LIGHT_CYAN: getColor('\u001B[1;36m'),
    WHITE: getColor('\u001B[1;37m'),
}

const getTime = (format = DATETIME_FORMAT, utc = false): string => {
    return dateFormat(Date.now(), format, utc)
}

export const toLog = (message: string, ...args: any[]): void => {
    console.group('>>>')
    console.log(`${COLORS.PURPLE}${getTime()}:${COLORS.RESET}`, message, ...args)
    console.groupEnd()
}

export const createLogger = <T>(logger: Logger<T, any>, processor?: Processor<T, T>): Logger<T, any> => {
    return (message, ...args) => {
        logger(processor ? processor(message) : message, ...args)
    }
}

export const logs = createLogger((message, ...args) =>
    console.log(`${COLORS.PURPLE}${getTime()}:${COLORS.RESET}`, message, args)
)
export const errorLogs = createLogger((message, ...args) =>
    console.error(`${COLORS.RED}${getTime()}:${COLORS.RESET}`, message, args)
)
export const warnLogs = createLogger((message, ...args) =>
    console.warn(`${COLORS.GREEN}${getTime()}:${COLORS.RESET}`, message, args)
)
export const debugLogs = createLogger((message, ...args) =>
    console.debug(`${COLORS.BLUE}${getTime()}:${COLORS.RESET}`, message, args)
)
export const traceLogs = createLogger((message, ...args) =>
    console.trace(`${COLORS.CYAN}${getTime()}:${COLORS.RESET}`, message, args)
)

export const boxenLogs = createLogger(console.log, message => boxen(message, profile.outputOptions))

export const boxenErrorLogs = createLogger(console.error, message =>
    boxen(
        message,
        mergeProps(profile.outputOptions, {
            borderColor: 'red',
            borderStyle: 'double',
        })
    )
)
export const boxenWarnLogs = createLogger(console.warn, message =>
    boxen(message, mergeProps(profile.outputOptions, { borderColor: 'green' }))
)
export const boxenDebugLogs = createLogger(console.debug, message =>
    boxen(message, mergeProps(profile.outputOptions, { borderColor: 'blue' }))
)
export const boxenTraceLogs = createLogger(console.trace, message =>
    boxen(message, mergeProps(profile.outputOptions, { borderColor: 'cyan' }))
)

export const logArrayElements = <T>(index: number, array: T[]): void => {
    logs(`array[${index}] = ${array[index]}`)
}

export const dumpObject = (obj: any): string => {
    let out = ''
    if (obj && typeof obj === 'object') {
        for (const i in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, i)) {
                out += `${i}: ${obj[i]}n`
            }
        }
    } else {
        out = obj
    }

    return out
}
