import {
    ColorOptions,
    ImageOptions,
    LanguagePattern,
    Optional,
    ParsedRequest,
    ProverbData,
} from '../typings/types'
import gradient from 'gradient-string'
import randomColor from 'randomcolor'
import _ from 'lodash'

import { delim, isBlankString, mergeProps, randomElement, randomEnum, toFormatString } from './commons'
import { css } from './getCss'
import { profile } from './env'

import { proverbs } from './proverbs'

export async function proverbRenderer(parsedRequest: ParsedRequest): Promise<string> {
    const { language, keywords, width, height, ...rest } = parsedRequest

    const colorOptions: ColorOptions = mergeProps(profile.colorOptions, rest)
    const imageOptions: ImageOptions = mergeProps(profile.imageOptions, { width, height })

    console.log(
        `
        ${gradient(randomColor(), randomColor())(delim)}
        Generating proverb with parameters:
        language=${language},
        keywords=${keywords},
        colorOptions=${toFormatString(colorOptions)}
        imageOptions=${toFormatString(imageOptions)}
        ${gradient(randomColor(), randomColor())(delim)}
        `
    )

    const proverbData: Optional<ProverbData> = keywords
        ? await getProverbByKeywords(keywords)
        : await getProverbByLanguage(language)

    return getImageContent(proverbData, colorOptions, imageOptions)
}

const getImageContent = (
    proverbData: Optional<ProverbData>,
    colorOptions: ColorOptions,
    imageOptions: ImageOptions
): string => {
    if (!proverbData) return ''

    const text = `${proverbData.text} ${getCategory(proverbData.category)}`
    const description = proverbData.description

    return `
      <svg
        width="${imageOptions.width}"
        height="${imageOptions.height}"
        xmlns="http://www.w3.org/2000/svg">
        <foreignObject x="0" y="0" width="${imageOptions.width}" height="${imageOptions.height}">
            <div xmlns="http://www.w3.org/1999/xhtml">
              <div class="proverb-wrapper">
                <div class="proverb-wrapper-desc">
                    ${getBodyContent(text, description)}
                </div>
              </div>
            </div>
        </foreignObject>
        <style>${css(colorOptions)}</style>
      </svg>
      `
}

const getBodyContent = (text: string, description: string): string => {
    return isBlankString(description)
        ? `<h3 class="font-monserrat700 subhead">${text}</h3>`
        : `<h3 class="font-monserrat700 subhead">${text}</h3>
            <div class="line"></div>
            <p class="font-monserratRegular">${description}</p>
            <div class="line"></div>`
}

const getCategory = (category?: string | string[]): string => {
    return category ? `(${_.isArray(category) ? category.join(',') : category})` : ''
}

const getProverbByKeywords = async (keywords: string | string[]): Promise<Optional<ProverbData>> => {
    const searchKeys = typeof keywords === 'string' ? keywords.split(',') : keywords
    //const searchResults = getSearchResults(idx(), searchKeys.join(' '))
    //const searchData = randomElement(searchResults)

    return { text: searchKeys[0], description: searchKeys[1] }
    //return searchData ? getProverbById(searchData.ref) : null
}

// const getProverbById = (value: string): ProverbData => {
//     const data = value.split(profile.indexOptions.delimiter)
//
//     return data[data[0]][data[1]]
// }

const getProverbByLanguage = async (language: Optional<LanguagePattern>): Promise<ProverbData> => {
    const data: ProverbData[] = language ? proverbs[language] : proverbs[randomEnum(LanguagePattern)]

    return randomElement(data)
}
