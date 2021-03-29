import { LayoutOptions, StyleOptions, TemplateOptions } from '../../typings/domain-types'
import { FontPattern, LayoutPattern } from '../../typings/enum-types'

import { getFont } from '../fonts/fonts'
import { getHeroPattern } from '../patterns/patterns'
import { capitalize } from '../utils/commons'

const plutoLayout: Record<LayoutPattern.pluto, LayoutOptions> = {
    pluto: {
        style: (options: StyleOptions) => {
            const { textColor, categoryColor, bgColor, pattern, opacity, colorPattern } = options.theme

            const fontRegular = getFont(FontPattern.monserrat)
            const font700 = getFont(FontPattern.monserrat_700)

            const backgroundPattern = getHeroPattern(pattern, String(opacity), String(colorPattern))

            return `
                    * {
                        padding: 0;
                        margin: 0;
                        box-sizing: border-box;
                    }
                    @font-face{
                        font-family: ${fontRegular.fontFamily};
                        font-style: normal;
                        font-weight: normal;
                        src: url(data:font/woff2;charset=utf-8;base64,${fontRegular.fontSrc}) format('woff2');
                    }
                    @font-face {
                        font-family: ${font700.fontFamily};
                        font-style: normal;
                        font-weight: bold;
                        src: url(data:font/woff2;charset=utf-8;base64,${font700.fontSrc}) format('woff2');
                    }
                    .text {
                        font-family: ${fontRegular.fontFamily}, sans-serif;
                        font-style: italic;
                        color: #${textColor};
                    }
                    .category {
                        font-family: ${font700.fontFamily}, sans-serif;
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
                    .quote-wrapper {
                        background: ${bgColor};
                        background-image: ${backgroundPattern};
                        margin: 0;
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
                    .quote-wrapper-desc {
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
                <div class="quote-wrapper">
                    <div class="quote-wrapper-desc">
                        <div class="line"></div>
                        <p class="text subhead">${options.text}</p>
                        <div class="line"></div>
                        <h3 class="category">${capitalize(options.category)}</h3>
                    </div>
                </div>
                `
        },
    },
}

export default plutoLayout
