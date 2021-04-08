import { LayoutOptions, StyleOptions, TemplateOptions } from '../../typings/domain-types'
import { FontPattern, LayoutPattern } from '../../typings/enum-types'

import { capitalize, join } from '../utils/commons'

import { getFont } from '../fonts/fonts'

const herculesLayout: Record<LayoutPattern.hercules, LayoutOptions> = {
    hercules: {
        style: (options: StyleOptions) => {
            const {
                theme: { textColor, categoryColor, bgColor },
            } = options

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
                        font-size: 20px;
                        padding: 5% 5%;
                        margin: 0;
                    }
                    .category {
                        font-family: ${fontCategory.fontFamily}, sans-serif;
                        font-weight: bold;
                        text-align: right;
                        padding: 3% 5% 3% 0%;
                        color: #${categoryColor};
                    }

                    .container {
                        position: relative;
                        width: auto;
                        height: auto;
                        margin: 3% 5%;
                        border-radius: 14px;
                        padding: 0;
                        overflow: hidden;
                    }

                    .container * {
                        position: relative;
                        z-index: 20;
                    }

                    .overlay {
                        z-index: 10;
                        display: none;
                    }

                    .sunny {
                        background-color: #${bgColor};
                    }

                    #sunOverlay:before, #sunOverlay:after {
                        content: "";
                    }

                    #sunOverlay {
                        background-color: #ed895b;
                        top: -80px;
                        right: -30px;
                        width: 240px;
                        height: 240px;
                        opacity: 0.7;
                    }

                    #sunOverlay:before {
                        background-color: #ee9b55;
                        top: 0;
                        right: 0;
                        width: 200px;
                        height: 200px;
                    }

                    #sunOverlay:after {
                        background-color: #efc745;
                        top: -10;
                        right: 10px;
                        width: 150px;
                        height: 150px;
                    }

                    #sunOverlay, #sunOverlay:before, #sunOverlay:after {
                        position: absolute;
                        border-radius: 50%;
                    }

                    .sunny #sunOverlay {
                        display: block;
                        /* show sunOverlay when class sunny is applied */
                    }
                `
        },
        template: (options: TemplateOptions) => {
            return `
                    <div class="container sunny">
                        <div>
                            <p class="text"><span id="value">${options.text}</span></p>
                            <h3 class="category">${capitalize(join(options.category))} proverb</h3>
                        </div>
                        <div class="overlay" id="sunOverlay"></div>
                    </div>
                `
        },
    },
}

export default herculesLayout
