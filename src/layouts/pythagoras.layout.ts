import { LayoutOptions, StyleOptions, TemplateOptions } from '../../typings/domain-types'
import { FontPattern, LayoutPattern } from '../../typings/enum-types'

import { getFont } from '../fonts/fonts'
import { capitalize, join } from '../utils/commons'

const pythagorasLayout: Record<LayoutPattern.pythagoras, LayoutOptions> = {
    pythagoras: {
        style: (options: StyleOptions) => {
            const { textColor, categoryColor, bgColor } = options.theme

            const fontText = getFont(FontPattern.monserrat)
            const fontCategory = getFont(FontPattern.monserrat_700)

            return `
                    *, *:after, *:before {
                        padding: 0;
                        margin: 0;
                        box-sizing: border-box;
                        z-index: 1;
                        position: relative;
                    }

                    @font-face{
                        font-family: ${fontText.fontFamily};
                        font-style: normal;
                        font-weight: normal;
                        src: url(data:font/woff2;charset=utf-8;base64,${fontText.fontSrc}) format('woff2');
                    }
                    @font-face {
                        font-family: ${fontCategory.fontFamily};
                        font-style: normal;
                        font-weight: bold;
                        src: url(data:font/woff2;charset=utf-8;base64,${fontCategory.fontSrc}) format('woff2');
                    }
                    .text {
                        font-family: ${fontText.fontFamily}, sans-serif;
                        font-style: italic;
                        color: #${textColor};
                    }
                    .category {
                        font-family: ${fontCategory.fontFamily}, sans-serif;
                        font-weight: bold;
                        text-align: right;
                        margin: 3% 3% 0% 0%;
                        color: #${categoryColor};
                    }

                    blockquote {
                        position: relative;
                        margin: 3% 10%;
                        width: 80%;
                        font-size: 22px;
                        line-height: 36px;
                        padding-left: 40px;
                        border-left: 5px solid #${bgColor};
                    }

                    blockquote span {
                        display: block;
                        text-align: right;
                        font-size: 14px;
                        line-height: 40px;
                        margin-top: 10px;
                        text-transform: uppercase;
                    }

                    blockquote.tweet .tweet-quote {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        width: 74px;
                        height: 26px;
                        margin-top: -13px;
                        margin-left: -36px;
                        transition: all 0.2s ease;
                    }
                `
        },
        template: (options: TemplateOptions) => {
            return `
                    <blockquote class="tweet">
                        <p class="text">${options.text}
                            <span class="category">${capitalize(join(options.category))} proverb</span>
                        </p>
                    </blockquote>
                `
        },
    },
}

export default pythagorasLayout
