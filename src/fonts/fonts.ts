import { readFileSync } from 'fs'

import { Optional } from '../../typings/standard-types'
import { FontOptions } from '../../typings/domain-types'
import { FontPattern } from '../../typings/enum-types'

/**
 * FontRecord
 * @desc Type representing font config options
 */
export type FontRecord = Record<FontPattern, FontOptions>

/**
 * Font mappings
 * @desc Type representing supported font mappings
 */
const fonts: Readonly<FontRecord> = {
    'default': {
        fontFamily: 'Montserrat',
        fontSrc: readFileSync(`${__dirname}/../../fonts/montserrat-v15-latin-700.woff2`).toString('base64'),
    },
    'caveat': {
        fontFamily: 'caveat',
        fontSrc: readFileSync(`${__dirname}/../../fonts/caveat-v10-latin-regular.woff2`).toString('base64'),
    },
    'chicle': {
        fontFamily: 'Chicle',
        fontSrc: readFileSync(`${__dirname}/../../fonts/chicle-v11-latin-regular.woff2`).toString('base64'),
    },
    'chilanka': {
        fontFamily: 'Chilanka',
        fontSrc: readFileSync(`${__dirname}/../../fonts/chilanka-v8-latin-regular.woff2`).toString('base64'),
    },
    'coiny': {
        fontFamily: 'Coiny',
        fontSrc: readFileSync(`${__dirname}/../../fonts/coiny-v8-latin-regular.woff2`).toString('base64'),
    },
    'cookie': {
        fontFamily: 'Cookie',
        fontSrc: readFileSync(`${__dirname}/../../fonts/cookie-v12-latin-regular.woff2`).toString('base64'),
    },
    'damion': {
        fontFamily: 'Damion',
        fontSrc: readFileSync(`${__dirname}/../../fonts/damion-v10-latin-regular.woff2`).toString('base64'),
    },
    'delius': {
        fontFamily: 'Delius',
        fontSrc: readFileSync(`${__dirname}/../../fonts/delius-v10-latin-regular.woff2`).toString('base64'),
    },
    'devonshire': {
        fontFamily: 'Devonshire',
        fontSrc: readFileSync(`${__dirname}/../../fonts/devonshire-v11-latin-regular.woff2`).toString(
            'base64'
        ),
    },
    'italianno': {
        fontFamily: 'Italianno',
        fontSrc: readFileSync(`${__dirname}/../../fonts/italianno-v10-latin-regular.woff2`).toString(
            'base64'
        ),
    },
    'julee': {
        fontFamily: 'Julee',
        fontSrc: readFileSync(`${__dirname}/../../fonts/julee-v12-latin-regular.woff2`).toString('base64'),
    },
    'lacquer': {
        fontFamily: 'Lacquer',
        fontSrc: readFileSync(`${__dirname}/../../fonts/lacquer-v5-latin-regular.woff2`).toString('base64'),
    },
    'lily-script-one': {
        fontFamily: 'Lily Script One',
        fontSrc: readFileSync(`${__dirname}/../../fonts/lily-script-one-v10-latin-regular.woff2`).toString(
            'base64'
        ),
    },
    'lobster': {
        fontFamily: 'lobster',
        fontSrc: readFileSync(`${__dirname}/../../fonts/lobster-v23-latin-regular.woff2`).toString('base64'),
    },
    'macondo': {
        fontFamily: 'Macondo',
        fontSrc: readFileSync(`${__dirname}/../../fonts/macondo-v11-latin-regular.woff2`).toString('base64'),
    },
    'mansalva': {
        fontFamily: 'Mansalva',
        fontSrc: readFileSync(`${__dirname}/../../fonts/mansalva-v4-latin-regular.woff2`).toString('base64'),
    },
    'meddon': {
        fontFamily: 'Meddon',
        fontSrc: readFileSync(`${__dirname}/../../fonts/meddon-v15-latin-regular.woff2`).toString('base64'),
    },
    'mogra': {
        fontFamily: 'Mogra',
        fontSrc: readFileSync(`${__dirname}/../../fonts/mogra-v9-latin-regular.woff2`).toString('base64'),
    },
    'oregano': {
        fontFamily: 'Oregano',
        fontSrc: readFileSync(`${__dirname}/../../fonts/oregano-v8-latin-regular.woff2`).toString('base64'),
    },
    'paprika': {
        fontFamily: 'Paprika',
        fontSrc: readFileSync(`${__dirname}/../../fonts/paprika-v10-latin-regular.woff2`).toString('base64'),
    },
    'quando': {
        fontFamily: 'Quando',
        fontSrc: readFileSync(`${__dirname}/../../fonts/quando-v9-latin-regular.woff2`).toString('base64'),
    },
    'quintessential': {
        fontFamily: 'Quintessential',
        fontSrc: readFileSync(`${__dirname}/../../fonts/quintessential-v10-latin-regular.woff2`).toString(
            'base64'
        ),
    },
    'ramaraja': {
        fontFamily: 'Ramaraja',
        fontSrc: readFileSync(`${__dirname}/../../fonts/ramaraja-v7-latin-regular.woff2`).toString('base64'),
    },
    'rancho': {
        fontFamily: 'Rancho',
        fontSrc: readFileSync(`${__dirname}/../../fonts/rancho-v11-latin-regular.woff2`).toString('base64'),
    },
    'redressed': {
        fontFamily: 'Redressed',
        fontSrc: readFileSync(`${__dirname}/../../fonts/redressed-v13-latin-regular.woff2`).toString(
            'base64'
        ),
    },
    'risque': {
        fontFamily: 'Risque',
        fontSrc: readFileSync(`${__dirname}/../../fonts/risque-v10-latin-regular.woff2`).toString('base64'),
    },
    'rochester': {
        fontFamily: 'Rochester',
        fontSrc: readFileSync(`${__dirname}/../../fonts/rochester-v11-latin-regular.woff2`).toString(
            'base64'
        ),
    },
    'sail': {
        fontFamily: 'Sail',
        fontSrc: readFileSync(`${__dirname}/../../fonts/sail-v11-latin-regular.woff2`).toString('base64'),
    },
    'salsa': {
        fontFamily: 'Salsa',
        fontSrc: readFileSync(`${__dirname}/../../fonts/salsa-v12-latin-regular.woff2`).toString('base64'),
    },
    'shrikhand': {
        fontFamily: 'Shrikhand',
        fontSrc: readFileSync(`${__dirname}/../../fonts/shrikhand-v6-latin-regular.woff2`).toString('base64'),
    },
    'simonetta': {
        fontFamily: 'Simonetta',
        fontSrc: readFileSync(`${__dirname}/../../fonts/simonetta-v13-latin-regular.woff2`).toString(
            'base64'
        ),
    },
    'sniglet': {
        fontFamily: 'Sniglet',
        fontSrc: readFileSync(`${__dirname}/../../fonts/sniglet-v12-latin-regular.woff2`).toString('base64'),
    },
    'tillana': {
        fontFamily: 'Tillana',
        fontSrc: readFileSync(`${__dirname}/../../fonts/tillana-v6-latin-regular.woff2`).toString('base64'),
    },
    'unkempt': {
        fontFamily: 'Unkempt',
        fontSrc: readFileSync(`${__dirname}/../../fonts/unkempt-v12-latin-regular.woff2`).toString('base64'),
    },
    'vibur': {
        fontFamily: 'Vibur',
        fontSrc: readFileSync(`${__dirname}/../../fonts/vibur-v13-latin-regular.woff2`).toString('base64'),
    },
    'yesteryear': {
        fontFamily: 'Yesteryear',
        fontSrc: readFileSync(`${__dirname}/../../fonts/yesteryear-v9-latin-regular.woff2`).toString(
            'base64'
        ),
    },
    'stylish': {
        fontFamily: 'Stylish',
        fontSrc: readFileSync(`${__dirname}/../../fonts/stylish-v10-latin-regular.woff2`).toString('base64'),
    },
    'srisakdi': {
        fontFamily: 'Srisakdi',
        fontSrc: readFileSync(`${__dirname}/../../fonts/srisakdi-v6-latin-regular.woff2`).toString('base64'),
    },
    'sofia': {
        fontFamily: 'Sofia',
        fontSrc: readFileSync(`${__dirname}/../../fonts/sofia-v9-latin-regular.woff2`).toString('base64'),
    },
    'montez': {
        fontFamily: 'Montez',
        fontSrc: readFileSync(`${__dirname}/../../fonts/montez-v11-latin-regular.woff2`).toString('base64'),
    },
    'miniver': {
        fontFamily: 'Miniver',
        fontSrc: readFileSync(`${__dirname}/../../fonts/miniver-v11-latin-regular.woff2`).toString('base64'),
    },
    'miltonian-tattoo': {
        fontFamily: 'Miltonian Tattoo',
        fontSrc: readFileSync(`${__dirname}/../../fonts/miltonian-tattoo-v18-latin-regular.woff2`).toString(
            'base64'
        ),
    },
    'merienda': {
        fontFamily: 'Merienda',
        fontSrc: readFileSync(`${__dirname}/../../fonts/merienda-v9-latin-regular.woff2`).toString('base64'),
    },
    'carter-one': {
        fontFamily: 'Carter One',
        fontSrc: readFileSync(`${__dirname}/../../fonts/carter-one-v12-latin-regular.woff2`).toString(
            'base64'
        ),
    },
    'butterfly-kids': {
        fontFamily: 'Butterfly Kids',
        fontSrc: readFileSync(`${__dirname}/../../fonts/butterfly-kids-v11-latin-regular.woff2`).toString(
            'base64'
        ),
    },
    'bonbon': {
        fontFamily: 'Bonbon',
        fontSrc: readFileSync(`${__dirname}/../../fonts/bonbon-v14-latin-regular.woff2`).toString('base64'),
    },
    'bilbo': {
        fontFamily: 'Bilbo',
        fontSrc: readFileSync(`${__dirname}/../../fonts/bilbo-v12-latin-regular.woff2`).toString('base64'),
    },
    'bilbo-swash-caps': {
        fontFamily: 'Bilbo Swash Caps',
        fontSrc: readFileSync(`${__dirname}/../../fonts/bilbo-swash-caps-v15-latin-regular.woff2`).toString(
            'base64'
        ),
    },
    'beth-ellen': {
        fontFamily: 'Beth Ellen',
        fontSrc: readFileSync(`${__dirname}/../../fonts/beth-ellen-v5-latin-regular.woff2`).toString(
            'base64'
        ),
    },
    'bellota': {
        fontFamily: 'Bellota',
        fontSrc: readFileSync(`${__dirname}/../../fonts/bellota-v4-latin-regular.woff2`).toString('base64'),
    },
    'baumans': {
        fontFamily: 'Baumans',
        fontSrc: readFileSync(`${__dirname}/../../fonts/baumans-v10-latin-regular.woff2`).toString('base64'),
    },
    'bangers': {
        fontFamily: 'Bangers',
        fontSrc: readFileSync(`${__dirname}/../../fonts/bangers-v13-latin-regular.woff2`).toString('base64'),
    },
    'balthazar': {
        fontFamily: 'Balthazar',
        fontSrc: readFileSync(`${__dirname}/../../fonts/balthazar-v10-latin-regular.woff2`).toString(
            'base64'
        ),
    },
    'audiowide': {
        fontFamily: 'Audiowide',
        fontSrc: readFileSync(`${__dirname}/../../fonts/audiowide-v9-latin-regular.woff2`).toString('base64'),
    },
    'architects-daughter': {
        fontFamily: 'Architects Daughter',
        fontSrc: readFileSync(
            `${__dirname}/../../fonts/architects-daughter-v11-latin-regular.woff2`
        ).toString('base64'),
    },
    'annie-use-your-telescope': {
        fontFamily: 'Annie Use Your Telescope',
        fontSrc: readFileSync(
            `${__dirname}/../../fonts/annie-use-your-telescope-v11-latin-regular.woff2`
        ).toString('base64'),
    },
    'amita': {
        fontFamily: 'Amita',
        fontSrc: readFileSync(`${__dirname}/../../fonts/amita-v9-latin-regular.woff2`).toString('base64'),
    },
    'comfortaa': {
        fontFamily: 'Comfortaa',
        fontSrc: readFileSync(`${__dirname}/../../fonts/comfortaa-latin-regular.woff2`).toString('base64'),
    },
    'monserrat-700': {
        fontFamily: 'Montserrat',
        fontSrc: readFileSync(`${__dirname}/../../fonts/montserrat-v15-latin-700.woff2`).toString('base64'),
    },
    'monserrat': {
        fontFamily: 'Montserrat',
        fontSrc: readFileSync(`${__dirname}/../../fonts/montserrat-v15-latin-regular.woff2`).toString(
            'base64'
        ),
    },
}

/**
 * Returns {@link FontOptions} by input {@link FontPattern} value
 * @param value initial input {@link FontPattern} to fetch by
 */
export const getFont = (value: Optional<FontPattern>): FontOptions => {
    return value ? fonts[value] : fonts[FontPattern.default]
}
