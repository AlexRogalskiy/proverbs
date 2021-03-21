const fs = require('fs')
const _ = require('lodash')

const lunr = require('lunr')
const os = require('os')
const path = require('path')
const boxen = require('boxen')

const proverbs = require('../data/proverbs.json')

function getConfig() {
    return process.env.AWS_LAMBDA_FUNCTION_VERSION
        ? { path: '.cache', name: 'lunr-index.json', delimiter: '_' }
        : { path: '.cache', name: 'lunr-index.json', delimiter: '__' }
}

function filePath() {
    return path.join(os.tmpdir(), `${getConfig().path}`)
}

function getIndexPath(filePath) {
    return path.join(filePath, `${getConfig().name}`)
}

function loadIndex(obj, args) {
    obj.field('proverb')
    obj.field('author')

    for (const category of Object.keys(args)) {
        for (const [index, value] of Object.entries(args[category])) {
            value.id = `${category}${getConfig().delimiter}${index}`
            obj.add(value)
        }
    }

    return obj.build()
}

function createIndex(args) {
    const args_ = _.merge(...args)
    return lunr(obj => loadIndex(obj, args_))
}

function ensureDirExists(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
    }
}

;(function () {
    try {
        const path = filePath()
        ensureDirExists(path)

        const values = [
            proverbs,
        ]
        const searchIndex = createIndex(values)
        const index = getIndexPath(path)

        console.log(
            boxen(`Storing index file by path=${index}`, {
                padding: 1,
                margin: 1,
                borderStyle: 'single',
                borderColor: 'yellow',
            })
        )

        fs.writeFileSync(index, JSON.stringify(searchIndex))
    } catch (e) {
        console.error(
            boxen(`Failed to store index file, message=${e.message}`, {
                padding: 1,
                margin: 1,
                borderStyle: 'double',
                borderColor: 'red',
            })
        )
        throw e
    }
})()
