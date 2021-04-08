import { LayoutOptions, StyleOptions, TemplateOptions } from '../../typings/domain-types'
import { FontPattern, LayoutPattern } from '../../typings/enum-types'

import { capitalize, join } from '../utils/commons'

import { getFont } from '../fonts/fonts'

const erastosthenesLayout: Record<LayoutPattern.erastosthenes, LayoutOptions> = {
    erastosthenes: {
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

                    div, p {
                        margin: 0;
                        padding: 0;
                    }

                    .container {
                        padding: 3% 3%;
                        position: relative;
                        background: #${bgColor};
                        text-align: center;
                        margin: 3% 5%;
                        border-radius: 5px;
                        box-shadow: 1px 5px 25px 1px #212121;
                    }

                    @media (max-width: 600px) {
                        .container {
                            max-width: none;
                        }
                    }

                    .quotes {
                        position: relative;
                        padding: 5% 3%;
                        text-align: left;
                    }

                    .quotes .quote {
                        padding-bottom: 15px;
                    }

                    .quotes .author {
                        position: absolute;
                        bottom: 5px;
                        right: 5px;
                    }

                    .quotes .author:before {
                        content: "-";
                        padding-right: 5px;
                    }
                `
        },
        template: (options: TemplateOptions) => {
            return `
                    <div id="wrapper" class="container">
                        <div class="quotes">
                            <span class="text" aria-hidden="true">
                                ${options.text}
                            </span>
                            <p id="quote" class="quote">
                                <span class="author category">
                                    ${capitalize(join(options.category))} proverb
                                </span>
                            </p>
                        </div>
                    </div>
                `
        },
    },
}

export default erastosthenesLayout
