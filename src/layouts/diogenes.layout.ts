import { LayoutOptions, StyleOptions, TemplateOptions } from '../../typings/domain-types'
import { FontPattern, LayoutPattern } from '../../typings/enum-types'

import { capitalize, join } from '../utils/commons'

import { getFont } from '../fonts/fonts'

const diogenesLayout: Record<LayoutPattern.diogenes, LayoutOptions> = {
    diogenes: {
        style: (options: StyleOptions) => {
            const {
                theme: { textColor, categoryColor, bgColor },
            } = options

            const fontText = getFont(FontPattern.monserrat)
            const fontCategory = getFont(FontPattern.monserrat_700)

            return `
                    @import url("https://cdnjs.cloudflare.com/ajax/libs/weather-icons/2.0.10/css/weather-icons.min.css");

                    *, *:after, *:before {
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

                    .container i {
                        font-size: 18px;
                    }

                    .container p#conditions {
                        font-size: 20px;
                    }

                    .container i, .container p#conditions {
                        display: inline-block;
                        margin-top: 0.2em;
                        margin-bottom: 0.2em;
                    }

                    .overlay {
                        z-index: 10;
                        display: none;
                    }

                    .rainy {
                        background-color: #${bgColor};
                    }

                    .rainy #rainOverlay {
                        display: block;
                    }

                    #rainOverlay {
                        position: relative;
                    }

                    #rainOverlay .wi-smog {
                        position: absolute;
                        color: #495073;
                        font-size: 248px;
                        top: -170px;
                        right: -50px;
                        transform: rotate(-20deg);
                    }

                    #rainOverlay .wi-smog:nth-child(2) {
                        opacity: 0.1;
                        top: -150px;
                        right: -40px;
                    }
                `
        },
        template: (options: TemplateOptions) => {
            return `
                    <div class="container rainy">
                        <div>
                            <p class="text"><span id="value">${options.text}</span></p>
                            <h3 class="category">${capitalize(join(options.category))} proverb</h3>
                        </div>
                        <div class="overlay" id="rainOverlay">
                            <i class="wi wi-smog"></i>
                            <i class="wi wi-smog"></i>
                        </div>
                    </div>
                `
        },
    },
}

export default diogenesLayout
