import boxen from 'boxen'

import { ImageOptions, IndexOptions } from '../../typings/domain-types'

/**
 * Output configuration options
 */
export const OUTPUT_OPTIONS: Readonly<boxen.Options> = {
    padding: 1,
    margin: 1,
    borderStyle: 'single',
    borderColor: 'yellow',
}

/**
 * Image configuration options
 */
export const IMAGE_OPTIONS: Readonly<ImageOptions> = {
    width: '100%',
    height: '100%',
}

/**
 * Index configuration options
 */
export const INDEX_OPTIONS: Readonly<IndexOptions> = {
    delimiter: '_',
    path: '.cache',
    name: 'lunr-index.json',
}
