import * as flexsearch from 'flexsearch'
import FlexSearch from 'flexsearch'

import { TemplateData } from '../typings/types'
import { LanguagePattern } from '../typings/enum-types'

import { profile } from './env'

import { proverbs } from './proverbs'

export const createIndex = (): flexsearch.Index<TemplateData> => {
    const searchIndex: flexsearch.Index<TemplateData> = FlexSearch.create({
        tokenize: 'forward',
        encode: 'icase',
        async: true,
        worker: false,
        doc: {
            id: 'id',
            field: {
                text: {
                    encode: 'extra',
                    tokenize: 'strict',
                    threshold: 7,
                },
                description: {
                    encode: false,
                },
            },
        },
    })

    for (const category of Object.values(LanguagePattern)) {
        for (const [index, value] of proverbs[category].entries()) {
            value.id = `${category}${profile.indexOptions.delimiter}${index}`
            searchIndex.add(value)
        }
    }

    return searchIndex
}

export const searchTitleQuery = async (
    index: flexsearch.Index<TemplateData>,
    query: string,
    options: flexsearch.SearchOptions
): Promise<TemplateData[]> => {
    return await index.search({
        field: 'proverb',
        query,
        ...options,
    })
}

export const searchQuery = async (
    index: flexsearch.Index<TemplateData>,
    query: string,
    options?: number | flexsearch.SearchOptions
): Promise<TemplateData[]> => {
    return await index.search(query, options)
}
