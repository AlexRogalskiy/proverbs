import { Optional } from '../../typings/standard-types'
import { LayoutPattern } from '../../typings/enum-types'
import { LayoutOptions } from '../../typings/domain-types'

import defaultLayout from './default.layout'
import socratesLayout from './socrates.layout'
import churchillLayout from './churchill.layout'
import samuelLayout from './samuel.layout'
import plutoLayout from './pluto.layout'
import zuesLayout from './zues.layout'
import sophoclesLayout from './sophocles.layout'
import herculesLayout from './hercules.layout'
import diogenesLayout from './diogenes.layout'
import herodoteLayout from './herodote.layout'
import hermesLayout from './hermes.layout'
import pythagorasLayout from './pythagoras.layout'
import euclidLayout from './euclid.layout'
import ptolemyLayout from './ptolemy.layout'
import descartesLayout from './descartes.layout'

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
    ...sophoclesLayout,
    ...herculesLayout,
    ...diogenesLayout,
    ...herodoteLayout,
    ...hermesLayout,
    ...pythagorasLayout,
    ...euclidLayout,
    ...ptolemyLayout,
    ...descartesLayout,
}

/**
 * Returns {@link LayoutOptions} by input {@link LayoutPattern} value
 * @param value initial input {@link LayoutPattern} to fetch by
 */
export const getLayout = (value: Optional<LayoutPattern>): LayoutOptions => {
    return value ? layouts[value] : layouts[LayoutPattern.default]
}
