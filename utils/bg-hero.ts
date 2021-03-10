import * as pattern from 'hero-patterns'

import { HeroPattern } from '../typings/types'
import { randomEnum, strToEnum } from './commons'

type PatternOperator = (fill: string, opacity: string) => string

type PatternMapper = { [K in HeroPattern]: PatternOperator }

const patternMapper: PatternMapper = strToEnum(Object.values(HeroPattern), value => pattern[value])

const getPattern = (pattern: HeroPattern | undefined, opacity: string, colorPattern: string): string => {
    const patternOperator: PatternOperator =
        typeof pattern === 'undefined' ? patternMapper[randomEnum(HeroPattern)] : patternMapper[pattern]

    return patternOperator(colorPattern, opacity)
}

export default getPattern
