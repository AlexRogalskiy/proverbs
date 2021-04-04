import { LayoutOptions, StyleOptions, TemplateOptions } from '../../typings/domain-types'
import { FontPattern, LayoutPattern } from '../../typings/enum-types'

import { capitalize, join } from '../utils/commons'

import { getFont } from '../fonts/fonts'

const defaultLayout: Record<LayoutPattern.default, LayoutOptions> = {
    default: {
        style: (options: StyleOptions) => {
            const {
                theme: { textColor, categoryColor, bgColor },
                animation: { animation, keyframes },
            } = options

            const fontText = getFont(FontPattern.monserrat)
            const fontCategory = getFont(FontPattern.monserrat_700)

            return `
                    * {
                        padding: 0;
                        margin: 0;
                        box-sizing: border-box;
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
                        color: #${categoryColor};
                    }
                    .container {
                        padding: 5% 5%;
                        display: flex;
                        justify-content: center;
                        flex-direction: column;
                        margin: 1em;
                        width: auto;
                        background-color: #${bgColor};
                        border: 1px solid rgba(0, 0, 0, 0.2);
                        border-radius: 5px;
                        ${animation};
                    }
                    ${keyframes}
                    .container h3 {
                        font-size: 19px;
                        margin-bottom: 5px;
                        font-weight: 500;
                        font-style: oblique;
                        color: #${textColor};
                    }
                    .container h3::before {
                        content: open-quote;
                        font-size: 25px;
                    }
                    .container h3::after {
                        content: close-quote;
                        vertical-align: sub;
                        font-size: 25px;
                    }
                    .container p {
                        font-style: italic;
                        text-align: right;
                        color: #${categoryColor};
                    }
                `
        },
        template: (options: TemplateOptions) => {
            return `
                    <div class="container">
                        <h3 class="text"> ${options.text} </h3>
                        <p class="category">- ${capitalize(join(options.category))} proverb</p>
                    </div>
                `
        },
    },
}

export default defaultLayout
