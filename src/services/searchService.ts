import lunr from 'lunr'
import cron from 'node-cron'

import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

import { Optional } from '../../typings/standard-types'
import { LanguagePattern } from '../../typings/enum-types'

import { ensureDirExists, tempDir } from '../utils/files'
import { boxenErrorLogs, boxenLogs } from '../utils/loggers'
import { profile } from '../utils/profiles'

import proverbs from '../proverbs/proverbs'

const task = cron.schedule('0 * * * *', () => {
    boxenLogs('Running task every 60 minutes on index search')

    storeIndex()
})

task.start()

const filePath: string = join(tempDir, profile.indexOptions.path)

const getIndexPath = (filePath: string): string => join(filePath, profile.indexOptions.name)

const storeIndex = (): lunr.Index => {
    try {
        ensureDirExists(filePath)

        const index = createIndex()
        const indexPath = getIndexPath(filePath)

        boxenLogs(`Storing index file by path=${indexPath}`)

        writeFileSync(indexPath, JSON.stringify(index))

        return index
    } catch (e) {
        boxenErrorLogs(`Failed to store index file, message=${e.message}`)
        throw e
    }
}

const restoreIndex = (): lunr.Index => {
    try {
        const indexPath = getIndexPath(filePath)

        boxenLogs(`Restoring index file from path=${indexPath}`)

        const index = readFileSync(indexPath, 'utf-8')

        return lunr.Index.load(JSON.parse(index))
    } catch (e) {
        boxenErrorLogs(`Failed to restore index file, message=${e.message}`)
        throw e
    }
}

const createIndex = (): lunr.Index => {
    return lunr(function () {
        this.field('quote')
        this.field('author')

        for (const language of Object.values(LanguagePattern)) {
            for (const [index, value] of proverbs[language].entries()) {
                value.id = `${language}${profile.indexOptions.delimiter}${index}`
                this.add(value)
            }
        }
    })
}

export const idx = (): lunr.Index => {
    try {
        return restoreIndex()
    } catch (e) {
        return storeIndex()
    }
}

export const getSearchResultSet = <T>(
    data: T[],
    index: lunr.Index,
    query: lunr.Index.QueryString
): Optional<T>[] => {
    const results = getSearchResults(index, query)

    return results.map(result => {
        return data.find(item => result.ref === item['id'])
    })
}

export const getSearchResults = (index: lunr.Index, query: lunr.Index.QueryString): lunr.Index.Result[] => {
    return index.search(query)
}

export const getSearchResultsByTerm = (index: lunr.Index, term: string): lunr.Index.Result[] => {
    return index.query(q => {
        q.term(lunr.tokenizer(term), {
            wildcard: lunr.Query.wildcard.TRAILING,
            presence: lunr.Query.presence.REQUIRED,
        })
    })
}
