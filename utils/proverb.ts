import { CategoryPattern, ColorOptions, ImageOptions, ParsedRequest, ProverbData } from '../typings/types'
import gradient from 'gradient-string'
import randomColor from 'randomcolor'

import { delim, mergeProps, randomElement, randomEnum, toFormatString } from './commons'
import { css } from './getCss'
import { profile } from './env'

import { proverbs } from './proverbs'
// import { idx } from './search'

export async function proverbRenderer(parsedRequest: ParsedRequest): Promise<string> {
    const { category, keywords, width, height, ...rest } = parsedRequest

    const colorOptions: ColorOptions = mergeProps(profile.colorOptions, rest)
    const imageOptions: ImageOptions = mergeProps(profile.imageOptions, { width, height })

    console.log(
        `
        ${gradient(randomColor(), randomColor())(delim)}
        Generating proverb with parameters:
        category=${category},
        keywords=${keywords},
        colorOptions=${toFormatString(colorOptions)}
        imageOptions=${toFormatString(imageOptions)}
        ${gradient(randomColor(), randomColor())(delim)}
        `
    )

    const proverbData: ProverbData | null = keywords
        ? await getProverbByKeywords(keywords)
        : await getProverbByCategory(category)

    return proverbData
        ? `
    <svg
        width="${imageOptions.width}"
        height="${imageOptions.height}"
        xmlns="http://www.w3.org/2000/svg">
        <foreignObject x="0" y="0" width="${imageOptions.width}" height="${imageOptions.height}">
            <div xmlns="http://www.w3.org/1999/xhtml">
              <div class="proverb-wrapper">
                <div class="proverb-wrapper-desc">
                  <div class="line"></div>
                  <p class="font-monserrat700">${proverbData.proverb}</p>
                  <div class="line"></div>
                  <h3 class="font-monserratRegular">${proverbData.description}</h3>
                </div>
              </div>
            </div>
        </foreignObject>
        <style>${css(colorOptions)}</style>
      </svg>
  `
        : ''
}

const getProverbByKeywords = async (keywords: string | string[]): Promise<ProverbData | null> => {
    const searchKeys = typeof keywords === 'string' ? keywords.split(',') : keywords
    //const searchResults = getSearchResults(idx(), searchKeys.join(' '))
    //const searchData = randomElement(searchResults)

    return { proverb: searchKeys[0], description: searchKeys[1] }
    //return searchData ? getProverbById(searchData.ref) : null
}

// const getProverbById = (value: string): ProverbData => {
//     const data = value.split(profile.indexOptions.delimiter)
//
//     return data[data[0]][data[1]]
// }

const getProverbByCategory = async (category: string | undefined): Promise<ProverbData> => {
    const data: ProverbData[] = category ? proverbs[category] : proverbs[randomEnum(CategoryPattern)]

    return randomElement(data)
}
