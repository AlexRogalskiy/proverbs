import { Optional } from '../../typings/standard-types'
import { LayoutPattern } from '../../typings/enum-types'
import { LayoutOptions } from '../../typings/domain-types'

import defaultLayout from './defaultLayout'
import socratesLayout from './socratesLayout'
import churchillLayout from './churchillLayout'
import samuelLayout from './samuelLayout'
import plutoLayout from './plutoLayout'
import zuesLayout from './zuesLayout'

/**
 * LayoutRecord
 * @desc Type representing layout config options
 */
export type LayoutRecord = Record<LayoutPattern, LayoutOptions>

/**
 * Layout mappings
 * @desc Type representing supported layout mappings
 */
const layouts: Readonly<LayoutRecord> = {
    ...defaultLayout,
    ...socratesLayout,
    ...churchillLayout,
    ...samuelLayout,
    ...plutoLayout,
    ...zuesLayout,
}

/**
 * Returns {@link LayoutOptions} by input {@link LayoutPattern} value
 * @param value initial input {@link LayoutPattern} to fetch by
 */
export const getLayout = (value: Optional<LayoutPattern>): LayoutOptions => {
    return value ? layouts[value] : layouts[LayoutPattern.default]
}
