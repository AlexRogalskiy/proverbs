import { ColorOptions, ImageOptions, LanguagePattern, ParsedRequest, ProverbData } from '../typings/types'
import gradient from 'gradient-string'
import randomColor from 'randomcolor'

import { delim, mergeProps, randomElement, randomEnum, toFormatString } from './commons'
import { css } from './getCss'
import { profile } from './env'

import { proverbs } from './proverbs'

// import { idx } from './search'

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

    const proverbData: ProverbData | null = keywords
        ? await getProverbByKeywords(keywords)
        : await getProverbByLanguage(language)

    if (proverbData) {
        const category = proverbData.category ? `(${proverbData.category})` : ''
        const text = `${proverbData.text} ${category}`
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
                  <h3 class="font-monserrat700">${text}</h3>
                  <div class="line"></div>
                  <p class="font-monserratRegular">${description}</p>
                  <div class="line"></div>
                </div>
              </div>
            </div>
        </foreignObject>
        <style>${css(colorOptions)}</style>
      </svg>
  `
    }

    return ''
}

const getProverbByKeywords = async (keywords: string | string[]): Promise<ProverbData | null> => {
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

const getProverbByLanguage = async (language: string | undefined): Promise<ProverbData> => {
    const data: ProverbData[] = language ? proverbs[language] : proverbs[randomEnum(LanguagePattern)]

    return randomElement(data)
}
