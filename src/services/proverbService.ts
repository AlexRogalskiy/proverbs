import { TemplateOptions } from '../../typings/domain-types'
import { Optional } from '../../typings/standard-types'
import { LanguagePattern } from '../../typings/enum-types'

import { getSearchResults, idx } from './searchService'

import { randomElement, randomEnum, toStringArray } from '../utils/commons'
import { profile } from '../utils/profiles'

import proverbs from '../proverbs/proverbs'

const getById = (value: string): TemplateOptions => {
    const parts = value.split(profile.indexOptions.delimiter)

    return proverbs[parts[0]][parts[1]]
}

export async function getQuoteByKeywords(keywords: string | string[]): Promise<Optional<TemplateOptions>> {
    const searchResults = getSearchResults(idx(), toStringArray(keywords).join(' '))
    const searchData = randomElement(searchResults)

    return searchData ? getById(searchData.ref) : null
}

export async function getQuoteByCategory(language: Optional<LanguagePattern>): Promise<TemplateOptions> {
    const data: TemplateOptions[] = language ? proverbs[language] : proverbs[randomEnum(LanguagePattern)]

    return randomElement(data)
}
