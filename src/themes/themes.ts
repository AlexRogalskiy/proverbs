import { Optional } from '../../typings/standard-types'
import { ThemePattern } from '../../typings/enum-types'
import { ThemeOptions } from '../../typings/domain-types'

/**
 * ThemeRecord
 * @desc Type representing theme config options
 */
export type ThemeRecord = Record<ThemePattern, ThemeOptions>

/**
 * Theme mappings
 * @desc Type representing supported theme mappings
 */
const themes: Readonly<ThemeRecord> = {
    'default': {
        textColor: '2f80ed',
        categoryColor: '333',
        bgColor: 'fffefe',
        colorPattern: 'ffe0e9',
        opacity: 0.3,
    },
    'default-repocard': {
        textColor: '2f80ed',
        categoryColor: '333',
        bgColor: 'fff8dc',
        colorPattern: 'ffe0e9',
        opacity: 0.7,
    },
    'dark': {
        textColor: 'fff',
        categoryColor: '9f9f9f',
        bgColor: '151515',
        colorPattern: 'ffe0e9',
        opacity: 0.3,
    },
    'radical': {
        textColor: 'fe428e',
        categoryColor: 'a9fef7',
        bgColor: '141321',
        colorPattern: 'ffe0e9',
        opacity: 0.3,
    },
    'merko': {
        textColor: 'abd200',
        categoryColor: '68b587',
        bgColor: '0a0f0b',
        colorPattern: 'ffe0e9',
        opacity: 0.3,
    },
    'gruvbox': {
        textColor: 'fabd2f',
        categoryColor: '8ec07c',
        bgColor: '282828',
        colorPattern: 'ffe0e9',
        opacity: 0.3,
    },
    'tokyonight': {
        textColor: '70a5fd',
        categoryColor: '38bdae',
        bgColor: '1a1b27',
        colorPattern: 'ffe0e9',
        opacity: 0.3,
    },
    'onedark': {
        textColor: 'e4bf7a',
        categoryColor: 'df6d74',
        bgColor: '282c34',
        colorPattern: 'ffe0e9',
        opacity: 0.3,
    },
    'cobalt': {
        textColor: 'e683d9',
        categoryColor: '75eeb2',
        bgColor: '193549',
        colorPattern: 'ffe0e9',
        opacity: 0.3,
    },
    'synthwave': {
        textColor: 'e2e9ec',
        categoryColor: 'e5289e',
        bgColor: '2b213a',
        colorPattern: 'ffe0e9',
        opacity: 0.3,
    },
    'highcontrast': {
        textColor: 'e7f216',
        categoryColor: 'fff',
        bgColor: '000',
        colorPattern: 'ffe0e9',
        opacity: 0.3,
    },
    'dracula': {
        textColor: 'ff6e96',
        categoryColor: 'f8f8f2',
        bgColor: '282a36',
        colorPattern: 'ffe0e9',
        opacity: 0.3,
    },
    'prussian': {
        textColor: 'bddfff',
        categoryColor: '6e93b5',
        bgColor: '172f45',
        colorPattern: 'ffe0e9',
        opacity: 0.3,
    },
    'monokai': {
        textColor: 'eb1f6a',
        categoryColor: 'f1f1eb',
        bgColor: '272822',
        colorPattern: 'ffe0e9',
        opacity: 0.3,
    },
    'vue': {
        textColor: '41b883',
        categoryColor: '273849',
        bgColor: 'fffefe',
        colorPattern: 'ffe0e9',
        opacity: 0.3,
    },
    'vue-dark': {
        textColor: '41b883',
        categoryColor: 'fffefe',
        bgColor: '273849',
        colorPattern: 'ffe0e9',
        opacity: 0.3,
    },
    'shades-of-purple': {
        textColor: 'fad000',
        categoryColor: 'a599e9',
        bgColor: '2d2b55',
        colorPattern: 'ffe0e9',
        opacity: 0.3,
    },
    'nightowl': {
        textColor: 'c792ea',
        categoryColor: '7fdbca',
        bgColor: '011627',
        colorPattern: 'ffe0e9',
        opacity: 0.3,
    },
    'buefy': {
        textColor: '7957d5',
        categoryColor: '363636',
        bgColor: 'ffffff',
        colorPattern: 'ffe0e9',
        opacity: 0.7,
    },
    'blue-green': {
        textColor: '2f97c1',
        categoryColor: '0cf574',
        bgColor: '350338',
        colorPattern: 'ffe0e9',
        opacity: 0.8,
    },
    'algolia': {
        textColor: '00aeff',
        categoryColor: 'eff00a',
        bgColor: '050f2c',
        colorPattern: 'ffe0e9',
        opacity: 0.3,
    },
    'great-gatsby': {
        textColor: 'ffa726',
        categoryColor: 'ffd95b',
        bgColor: '000000',
        colorPattern: 'ffe0e9',
        opacity: 0.3,
    },
    'darcula': {
        textColor: 'ba5f17',
        categoryColor: 'bebebe',
        bgColor: '242424',
        colorPattern: 'ffe0e9',
        opacity: 0.3,
    },
    'bear': {
        textColor: 'e03c8a',
        categoryColor: 'bcb28d',
        bgColor: '1f2023',
        colorPattern: 'ffe0e9',
        opacity: 0.3,
    },
    'solarized-dark': {
        textColor: '268bd2',
        categoryColor: '859900',
        bgColor: '002b36',
        colorPattern: 'ffe0e9',
        opacity: 0.3,
    },
    'solarized-light': {
        textColor: '268bd2',
        categoryColor: '859900',
        bgColor: 'fdf6e3',
        colorPattern: 'ffe0e9',
        opacity: 0.3,
    },
    'chartreuse-dark': {
        textColor: '7fff00',
        categoryColor: 'f007ff',
        bgColor: '000',
        colorPattern: 'ffe0e9',
        opacity: 0.3,
    },
    'nord': {
        textColor: '81a1c1',
        categoryColor: 'd8dee9',
        bgColor: '2e3440',
        colorPattern: 'ffe0e9',
        opacity: 0.3,
    },
    'gotham': {
        textColor: '2aa889',
        categoryColor: '99d1ce',
        bgColor: '0c1014',
        colorPattern: 'ffe0e9',
        opacity: 0.3,
    },
    'material-palenight': {
        textColor: 'c792ea',
        categoryColor: 'a6accd',
        bgColor: '292d3e',
        colorPattern: 'ffe0e9',
        opacity: 0.3,
    },
    'graywhite': {
        textColor: '24292e',
        categoryColor: '24292e',
        bgColor: 'ffffff',
        colorPattern: 'ffe0e9',
        opacity: 0.3,
    },
    'vision-friendly-dark': {
        textColor: 'ffb000',
        categoryColor: 'ffbb00',
        bgColor: '000000',
        colorPattern: 'ffe0e9',
        opacity: 0.3,
    },
    'ayu-mirage': {
        textColor: 'f4cd7c',
        categoryColor: 'c7c8c2',
        bgColor: '1f2430',
        colorPattern: 'ffe0e9',
        opacity: 0.3,
    },
    'midnight-purple': {
        textColor: '9745f5',
        categoryColor: '9846f6',
        bgColor: '000000',
        colorPattern: 'ffe0e9',
        opacity: 0.3,
    },
    'calm': {
        textColor: 'e07a5f',
        categoryColor: 'ebcfb2',
        bgColor: '373f51',
        colorPattern: 'ffe0e9',
        opacity: 0.3,
    },
    'flag-india': {
        textColor: 'ff8f1c',
        categoryColor: '509E2F',
        bgColor: 'ffffff',
        colorPattern: 'ffe0e9',
        opacity: 0.3,
    },
    'omni': {
        textColor: 'FF79C6',
        categoryColor: 'E1E1E6',
        bgColor: '191622',
        colorPattern: 'ffe0e9',
        opacity: 0.3,
    },
    'react': {
        textColor: '61dafb',
        categoryColor: '64ddff',
        bgColor: '20232a',
        colorPattern: 'ffe0e9',
        opacity: 0.3,
    },
    'jolly': {
        textColor: 'ff64da',
        categoryColor: 'fd99ff',
        bgColor: '291B3E',
        colorPattern: 'ffe0e9',
        opacity: 0.3,
    },
    'maroongold': {
        textColor: 'F7EF8A',
        categoryColor: 'E0AA3E',
        bgColor: '260000',
        colorPattern: 'ffe0e9',
        opacity: 0.3,
    },
    'yeblu': {
        textColor: 'ffdd99',
        categoryColor: 'ffee99',
        bgColor: '002046',
        colorPattern: 'ffe0e9',
        opacity: 0.3,
    },
    'blueberry': {
        textColor: '82aaff',
        categoryColor: '27e8a7',
        bgColor: '242938',
        colorPattern: 'ffe0e9',
        opacity: 0.3,
    },
    'slateorange': {
        textColor: 'faa627',
        categoryColor: 'fdd789',
        bgColor: '36393f',
        colorPattern: 'ffe0e9',
        opacity: 0.3,
    },
    'kacho-ga': {
        textColor: 'bf4a3f',
        categoryColor: 'd9c8a9',
        bgColor: '402b23',
        colorPattern: 'ffe0e9',
        opacity: 0.3,
    },
    'arabesque': {
        textColor: '0a83dc',
        categoryColor: 'd9c8a9',
        bgColor: 'ffffff',
        colorPattern: 'ffe0e9',
        opacity: 0.3,
    },
}

/**
 * Returns {@link ThemeOptions} by input {@link ThemePattern} value
 * @param value initial input {@link ThemePattern} to fetch by
 */
export const getTheme = (value: Optional<ThemePattern>): ThemeOptions => {
    return value ? themes[value] : themes[ThemePattern.default]
}
