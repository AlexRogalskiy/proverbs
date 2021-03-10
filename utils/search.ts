import * as flexsearch from 'flexsearch'
import FlexSearch from 'flexsearch'

import { LanguagePattern, ProverbData } from '../typings/types'
import { profile } from './env'

import { proverbs } from './proverbs'

export const createIndex = (): flexsearch.Index<ProverbData> => {
    const searchIndex: flexsearch.Index<ProverbData> = FlexSearch.create({
        tokenize: 'forward',
        encode: 'icase',
        async: true,
        worker: false,
        doc: {
            id: 'id',
            field: {
                proverb: {
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
    index: flexsearch.Index<ProverbData>,
    query: string,
    options: flexsearch.SearchOptions
): Promise<ProverbData[]> => {
    return await index.search({
        field: 'proverb',
        query,
        ...options,
    })
}

export const searchQuery = async (
    index: flexsearch.Index<ProverbData>,
    query: string,
    options?: number | flexsearch.SearchOptions
): Promise<ProverbData[]> => {
    return await index.search(query, options)
}
