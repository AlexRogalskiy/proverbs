import { LayoutOptions, StyleOptions, TemplateOptions } from '../../typings/domain-types'
import { FontPattern, LayoutPattern } from '../../typings/enum-types'

import { capitalize, join } from '../utils/commons'

import { getFont } from '../fonts/fonts'

const herodoteLayout: Record<LayoutPattern.herodote, LayoutOptions> = {
    herodote: {
        style: (options: StyleOptions) => {
            const {
                theme: { textColor, categoryColor, bgColor },
            } = options

            const fontText = getFont(FontPattern.bellota)
            const fontCategory = getFont(FontPattern.bellota)

            return `
                    * {
                        margin: 0;
                        padding: 0;
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
                        font-size: 2.2em;
                        font-variant: small-caps;
                        color: #${textColor};
                    }
                    .category {
                        font-family: ${fontCategory.fontFamily}, sans-serif;
                        font-weight: bold;
                        text-align: right;
                        font-size: 1.5em;
                        padding: 3% 5% 3% 5%;
                        color: #${categoryColor};
                    }

                    section {
                        background-color: #${bgColor};
                        background-image: radial-gradient(center top, circle cover, #FFF, #${bgColor});
                        background-image: -o-radial-gradient(center top, circle cover, #FFF, #${bgColor});
                        background-image: -ms-radial-gradient(center top, circle cover, #FFF, #${bgColor});
                        background-image: -moz-radial-gradient(center top, circle cover, #FFF, #${bgColor});
                        background-image: -webkit-radial-gradient(center top, circle cover, #FFF, #${bgColor});
                        text-align: center;
                    }

                    section .quote-wrapper {
                        height: auto;
                        width: 90%;
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        padding: 3% 5%;
                    }

                    .quote {
                        display: block;
                        position: relative;
                        top: 0.7em;
                        margin: 0% 5%;
                        width: 75%;
                        height: auto;
                        color: #444;
                        align-self: stretch;
                        letter-spacing: 0.1em;
                        text-align: left;
                        line-height: normal;
                    }

                    .cite {
                        align-self: stretch;
                    }

                    .cite:before {
                        content: '’’';
                        width: 100%;
                        height: 100%;
                        position: relative;
                        align-self: stretch;
                        pointer-events: none;
                        font-size: 10em;
                        font-family: Arial;
                        letter-spacing: -10px;
                        text-align: left;
                        line-height: normal;
                        font-style: normal;
                        font-weight: bold;
                        color: #7b9ab9;
                    }
                `
        },
        template: (options: TemplateOptions) => {
            return `
                    <section>
                        <div class="quote-wrapper">
                            <div class="cite"></div>
                            <span class="quote text">${options.text}</span>
                        </div>
                        <p class="category">
                            ${capitalize(join(options.category))} proverb
                        </p>
                    </section>
                `
        },
    },
}

export default herodoteLayout
