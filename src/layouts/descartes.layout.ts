import { LayoutOptions, StyleOptions, TemplateOptions } from '../../typings/domain-types'
import { FontPattern, LayoutPattern } from '../../typings/enum-types'

import { capitalize, join } from '../utils/commons'

import { getFont } from '../fonts/fonts'

const descartesLayout: Record<LayoutPattern.descartes, LayoutOptions> = {
    descartes: {
        style: (options: StyleOptions) => {
            const {
                theme: { textColor, categoryColor, bgColor },
            } = options

            const fontText = getFont(FontPattern.bellota)
            const fontCategory = getFont(FontPattern.bellota)

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
                        text-align: center;
                        color: #${categoryColor};
                    }

                    .font, #Author {
                        font-family: "Mr De Haviland", cursive;
                        font-weight: 200;
                    }

                    .ColorOpp, #QuoteContainer {
                        background-color: #${bgColor};
                    }

                    #QuoteContainer {
                        display: -webkit-flex;
                        flex-direction: row;
                        flex-wrap: wrap;
                        position: relative;
                        width: auto;
                        margin: 3% 5%;
                        box-shadow: 2px 2px 25px #9E9E9E;
                    }

                    #Author {
                        text-align: right;
                        background-color: #${bgColor};
                        padding: 3% 3%;
                        box-sizing: border-box;
                        font-size: 20px;
                        letter-spacing: 3px;
                        width: 100%;
                    }

                    #Quote {
                        padding: 5px;
                    }

                    #main {
                        font-size: 28px;
                        padding: 10px 20px 0px 18px;
                        margin: 2px 15px 2px 0px;
                        letter-spacing: 3px;
                    }

                    #acv {
                        margin: 0px;
                    }

                    @media (max-width: 600px) {
                        #QuoteContainer {
                            -webkit-animation: none !important;
                        }

                        #main #acv {
                            font-size: 28px;
                            padding-left: 45px;
                        }

                        #main {
                            font-size: 38px;
                        }

                        button {
                            -webkit-animation: none !important;
                        }
                    }

                    @media (max-width: 820px) {
                        #QuoteContainer {
                            width: auto;
                        }
                    }
                `
        },
        template: (options: TemplateOptions) => {
            return `
                    <div id="QuoteContainer">
                        <div id="Quote" class="text">
                            <p id="main">${options.text}</p>
                        </div>
                        <div id="Author" class="category">
                            <p id="acv">${capitalize(join(options.category))} proverb</p>
                        </div>
                    </div>
                `
        },
    },
}

export default descartesLayout
