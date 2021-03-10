import * as flexsearch from 'flexsearch'
import FlexSearch from 'flexsearch'

import { proverbs } from './proverbs'

import { CategoryPattern, ProverbData } from '../typings/types'
// import { ensureDirExists, tempDir } from './commons'
import { profile } from './env'
//
// const filePath: string = join(tempDir, `${profile.indexOptions.path}`)
//
// const getIndexPath = (filePath: string): string => join(filePath, `${profile.indexOptions.name}`)
//
// const storeIndex = (): lunr.Index => {
//     try {
//         ensureDirExists(filePath)
//
//         const index = createIndex()
//         const indexPath = getIndexPath(filePath)
//
//         console.log(
//             boxen(`Storing index file by path=${indexPath}`, {
//                 padding: 1,
//                 margin: 1,
//                 borderStyle: 'single',
//                 borderColor: 'yellow',
//             })
//         )
//
//         writeFileSync(indexPath, JSON.stringify(index))
//
//         return index
//     } catch (e) {
//         console.error(
//             boxen(`Failed to store index file, message=${e.message}`, {
//                 padding: 1,
//                 margin: 1,
//                 borderStyle: 'double',
//                 borderColor: 'red',
//             })
//         )
//         throw e
//     }
// }
//
// const restoreIndex = (): lunr.Index => {
//     try {
//         const indexPath = getIndexPath(filePath)
//
//         console.log(
//             boxen(`Restoring index file from path=${indexPath}`, {
//                 padding: 1,
//                 margin: 1,
//                 borderStyle: 'single',
//                 borderColor: 'yellow',
//             })
//         )
//
//         const index = readFileSync(indexPath, 'utf-8')
//
//         return lunr.Index.load(JSON.parse(index))
//     } catch (e) {
//         console.error(
//             boxen(`Failed to restore index file, message=${e.message}`, {
//                 padding: 1,
//                 margin: 1,
//                 borderStyle: 'double',
//                 borderColor: 'red',
//             })
//         )
//         throw e
//     }
// }

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

    for (const category of Object.values(CategoryPattern)) {
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

// export const idx = (): lunr.Index => {
//     try {
//         return restoreIndex()
//     } catch (e) {
//         return storeIndex()
//     }
// }
