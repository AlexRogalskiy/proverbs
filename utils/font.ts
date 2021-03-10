import { readFileSync } from 'fs'

export const monserrat700 = readFileSync(`${__dirname}/../fonts/montserrat-v15-latin-700.woff2`).toString(
    'base64'
)

export const monserratRegular = readFileSync(
    `${__dirname}/../fonts/montserrat-v15-latin-regular.woff2`
).toString('base64')
