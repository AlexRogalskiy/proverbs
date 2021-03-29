import * as pattern from 'hero-patterns'

import { Optional } from '../../typings/standard-types'
import { HeroPattern } from '../../typings/enum-types'

import { randomEnum, strToEnum } from '../utils/commons'

type PatternOperator = (fill: string, opacity: string) => string

type PatternMapper = Record<HeroPattern, PatternOperator>

const patternMapper: Readonly<PatternMapper> = strToEnum(Object.values(HeroPattern), value => pattern[value])

export const getHeroPattern = (
    pattern: Optional<HeroPattern>,
    opacity: string,
    colorPattern: string
): string => {
    const patternOperator: PatternOperator = pattern
        ? patternMapper[pattern]
        : patternMapper[randomEnum(HeroPattern)]

    return patternOperator(colorPattern, opacity)
}
