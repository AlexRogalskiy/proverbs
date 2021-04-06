import { LayoutOptions, StyleOptions, TemplateOptions } from '../../typings/domain-types'
import { FontPattern, LayoutPattern } from '../../typings/enum-types'

import { capitalize, join } from '../utils/commons'

import { getFont } from '../fonts/fonts'

const hermesLayout: Record<LayoutPattern.hermes, LayoutOptions> = {
    hermes: {
        style: (options: StyleOptions) => {
            const {
                theme: { textColor, categoryColor, bgColor },
            } = options

            const fontText = getFont(FontPattern.bellota)
            const fontCategory = getFont(FontPattern.bellota)

            return `
                    @charset "UTF-8";
                    @import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,200italic);

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
                        width: auto;
                        height: auto;
                        margin: 3% 5%;
                    }

                    .text-center {
                        text-align: center;
                    }

                    .quote-card {
                        background: #${bgColor};
                        color: #222222;
                        padding: 20px;
                        padding-left: 50px;
                        box-sizing: border-box;
                        box-shadow: 0 2px 4px rgba(34, 34, 34, 0.22);
                        position: relative;
                        overflow: hidden;
                    }

                    .quote-card p {
                        font-size: 22px;
                        line-height: 1.5;
                        margin: 0;
                        max-width: 80%;
                    }

                    .quote-card cite {
                        font-size: 16px;
                        margin-top: 10px;
                        display: block;
                        font-weight: 200;
                        opacity: 0.8;
                    }

                    .quote-card:before {
                        font-family: Georgia, serif;
                        content: "“";
                        position: absolute;
                        top: 10px;
                        left: 10px;
                        font-size: 5em;
                        color: rgba(238, 238, 238, 0.5);
                        font-weight: normal;
                    }

                    .quote-card:after {
                        font-family: Georgia, serif;
                        content: "”";
                        position: absolute;
                        bottom: -110px;
                        line-height: 100px;
                        right: -32px;
                        font-size: 25em;
                        color: rgba(238, 238, 238, 0.1);
                        font-weight: normal;
                    }

                    @media (max-width: 640px) {
                        .quote-card:after {
                            font-size: 22em;
                            right: -25px;
                        }
                    }

                    .credits {
                        margin-top: 80px;
                    }

                    .credits a {
                        color: #222222;
                        text-decoration: none;
                        text-shadow: 0 0 2px rgba(34, 34, 34, 0.24);
                        padding-bottom: 1px;
                        display: inline-block;
                        border-bottom: 1px dashed rgba(34, 34, 34, 0.24);
                        opacity: 0.6;
                        transition: 0.3s all ease-in;
                    }

                    .credits a:hover {
                        border-bottom-style: solid;
                        opacity: 1;
                    }
                `
        },
        template: (options: TemplateOptions) => {
            return `
                    <div class="container">
                        <blockquote class="quote-card">
                            <p class="text">
                                ${options.text}
                            </p>
                            <cite class="category">
                                ${capitalize(join(options.category))} proverb
                            </cite>
                        </blockquote>
                    </div>
                `
        },
    },
}

export default hermesLayout
