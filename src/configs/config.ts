import { Profile } from '../../typings/enum-types'
import { ProfileOptions } from '../../typings/domain-types'

import { IMAGE_OPTIONS, INDEX_OPTIONS, OUTPUT_OPTIONS } from '../constants/constants'

import { mergeProps } from '../utils/commons'

/**
 * ConfigRecord
 * @desc Type representing profile config options
 */
export type ConfigRecord = Record<Profile, ProfileOptions>

/**
 * Configuration options
 */
export const CONFIG: Readonly<ConfigRecord> = {
    dev: {
        imageOptions: IMAGE_OPTIONS,
        indexOptions: INDEX_OPTIONS,
        outputOptions: OUTPUT_OPTIONS,
    },
    prod: {
        imageOptions: IMAGE_OPTIONS,
        indexOptions: mergeProps(INDEX_OPTIONS, { delimiter: '__' }),
        outputOptions: OUTPUT_OPTIONS,
    },
    test: {
        imageOptions: IMAGE_OPTIONS,
        indexOptions: INDEX_OPTIONS,
        outputOptions: OUTPUT_OPTIONS,
    },
}
