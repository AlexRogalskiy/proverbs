import { Optional } from './standard-types'
import { HeroPattern, LanguagePattern } from './enum-types'

/**
 * ProverbData
 * @desc Type representing template data
 */
export type TemplateData = {
    /**
     * Template identifier
     */
    id?: string
    /**
     * Template text
     */
    text: string
    /**
     * Template category
     */
    category?: string | string[]
    /**
     * Template description
     */
    description: string
}

/**
 * ParsedRequest
 * @desc Type representing parsed request data
 */
export type ParsedRequestData = {
    /**
     * Template origin language
     */
    language?: Optional<LanguagePattern>
    /**
     * Template image background pattern
     */
    pattern?: Optional<HeroPattern>
    /**
     * Template image width
     */
    width?: string
    /**
     * Template image height
     */
    height?: string
    /**
     * Request keywords
     */
    keywords?: string | string[]
    /**
     * Template image color pattern
     */
    colorPattern?: string | string[]
    /**
     * Template image text font color
     */
    fontColor?: string | string[]
    /**
     * Template image background color
     */
    backgroundColor?: string | string[]
    /**
     * Template image background opacity
     */
    opacity?: string | string[]
}

/**
 * ColorOptions
 * @desc Type representing template color options
 */
export type ColorOptions = {
    /**
     * Template image color pattern
     */
    readonly colorPattern: string | string[]
    /**
     * Template image text font color
     */
    readonly fontColor: string | string[]
    /**
     * Template image background color
     */
    readonly backgroundColor: string | string[]
    /**
     * Template image background opacity
     */
    readonly opacity: string | string[]
    /**
     * Template image background pattern
     */
    readonly pattern?: Optional<HeroPattern>
}

/**
 * ImageOptions
 * @desc Type representing template image options
 */
export type ImageOptions = {
    /**
     * Template image width
     */
    readonly width: string
    /**
     * Template image height
     */
    readonly height: string
}

/**
 * IndexOptions
 * @desc Type representing template index options
 */
export type IndexOptions = {
    /**
     * Index identifier delimiter
     */
    readonly delimiter: string
    /**
     * Index file path
     */
    readonly path: string
    /**
     * Index file name
     */
    readonly name: string
}

/**
 * ProfileOptions
 * @desc Type representing template profile options
 */
export type ProfileOptions = {
    /**
     * Color configuration options.
     */
    readonly colorOptions: ColorOptions
    /**
     * Image configuration options.
     */
    readonly imageOptions: ImageOptions
    /**
     * Index configuration options.
     */
    readonly indexOptions: IndexOptions
}
