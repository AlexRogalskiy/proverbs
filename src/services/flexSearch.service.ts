import * as flexsearch from 'flexsearch'
import FlexSearch from 'flexsearch'

import { LanguagePattern } from '../../typings/enum-types'
import { TemplateOptions } from '../../typings/domain-types'

import { profile } from '../utils/profiles'

import proverbs from '../proverbs/proverbs'

export const createIndex = (): flexsearch.Index<TemplateOptions> => {
    const searchIndex: flexsearch.Index<TemplateOptions> = FlexSearch.create({
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
                category: {
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
    index: flexsearch.Index<TemplateOptions>,
    query: string,
    options: flexsearch.SearchOptions
): Promise<TemplateOptions[]> => {
    return await index.search({
        field: 'text',
        query,
        ...options,
    })
}

export const searchQuery = async (
    index: flexsearch.Index<TemplateOptions>,
    query: string,
    options?: number | flexsearch.SearchOptions
): Promise<TemplateOptions[]> => {
    return await index.search(query, options)
}
