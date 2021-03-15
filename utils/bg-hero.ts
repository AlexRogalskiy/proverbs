import * as pattern from 'hero-patterns'

import { HeroPattern, Optional } from '../typings/types'
import { randomEnum, strToEnum } from './commons'

type PatternOperator = (fill: string, opacity: string) => string

type PatternMapper = { [K in HeroPattern]: PatternOperator }

const patternMapper: PatternMapper = strToEnum(Object.values(HeroPattern), value => pattern[value])

const getPattern = (pattern: Optional<HeroPattern>, opacity: string, colorPattern: string): string => {
    const patternOperator: PatternOperator = pattern
        ? patternMapper[pattern]
        : patternMapper[randomEnum(HeroPattern)]

    return patternOperator(colorPattern, opacity)
}

export default getPattern
