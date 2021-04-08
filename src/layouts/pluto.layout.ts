import { LayoutOptions, StyleOptions, TemplateOptions } from '../../typings/domain-types'
import { FontPattern, LayoutPattern } from '../../typings/enum-types'

import { getFont } from '../fonts/fonts'
import { getHeroPattern } from '../patterns/patterns'
import { capitalize, join } from '../utils/commons'

const plutoLayout: Record<LayoutPattern.pluto, LayoutOptions> = {
    pluto: {
        style: (options: StyleOptions) => {
            const { textColor, categoryColor, bgColor, pattern, opacity, colorPattern } = options.theme

            const fontText = getFont(FontPattern.monserrat)
            const fontCategory = getFont(FontPattern.monserrat_700)

            const backgroundPattern = getHeroPattern(pattern, String(opacity), String(colorPattern))

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
                    .subhead::first-letter {
                        font-size: 130%;
                        color: #903;
                        font-family: Georgia;
                    }
                    .proverb-wrapper {
                        background: #${bgColor};
                        background-image: ${backgroundPattern};
                        margin: 3% 5%;
                        box-sizing: border-box;
                        display: flex;
                        flex-direction: row;
                        justify-content: center;
                        align-items: center;
                        padding: 5% 5%;
                    }
                    p {
                        font-size: 1.0rem;
                        margin: 10% 5%;
                    }
                    p.site {
                        margin-top: 10px;
                    }
                    .proverb-wrapper-desc {
                        display: flex;
                        flex-direction: column;
                        width: 100%;
                    }
                    div.line {
                        width: 0%;
                        min-width: 100%;
                        max-width: 100%;
                        margin: 0 auto;
                        border: none;
                        border-bottom: 2px dotted rgba(0,0,0, 0.5);
                    }
                `
        },
        template: (options: TemplateOptions) => {
            return `
                <div class="proverb-wrapper">
                    <div class="proverb-wrapper-desc">
                        <h3 class="text subhead">${options.text}</h3>
                        <p class="category">${capitalize(join(options.category))} proverb</p>
                    </div>
                </div>
                `
        },
    },
}

export default plutoLayout
