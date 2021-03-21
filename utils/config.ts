import { ProfileOptions } from '../typings/types'
import { Profile } from '../typings/enum-types'

export type ConfigOptions = Record<Profile, ProfileOptions>

export const CONFIG: Readonly<ConfigOptions> = {
    dev: {
        colorOptions: {
            colorPattern: '#FFE0E9',
            fontColor: '#0A83DC',
            backgroundColor: '#FFFFFF',
            opacity: '0.3',
        },
        imageOptions: {
            width: '100%',
            height: '100%',
        },
        indexOptions: {
            delimiter: '__',
            path: '.cache',
            name: 'lunr-index.json',
        },
    },
    prod: {
        colorOptions: {
            colorPattern: '#FFE0E9',
            fontColor: '#0A83DC',
            backgroundColor: '#FFFFFF',
            opacity: '0.3',
        },
        imageOptions: {
            width: '100%',
            height: '100%',
        },
        indexOptions: {
            delimiter: '_',
            path: '.cache',
            name: 'lunr-index.json',
        },
    },
}
