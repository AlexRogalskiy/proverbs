import { LayoutOptions, StyleOptions, TemplateOptions } from '../../typings/domain-types'
import { FontPattern, LayoutPattern } from '../../typings/enum-types'

import { capitalize, join } from '../utils/commons'

import { getFont } from '../fonts/fonts'

const sophoclesLayout: Record<LayoutPattern.sophocles, LayoutOptions> = {
    sophocles: {
        style: (options: StyleOptions) => {
            const { textColor, categoryColor, bgColor, opacity } = options.theme

            const fontText = getFont(FontPattern.stylish)
            const fontCategory = getFont(FontPattern.stylish)

            return `
                    @import 'https://cdnjs.cloudflare.com/ajax/libs/weather-icons/2.0.9/css/weather-icons.min.css';

                    @font-face{
                        font-family: ${fontText.fontFamily};
                        font-style: normal;
                        font-weight: normal;
                        src: url(data:font/woff2;charset=utf-8;base64,${fontText.fontSrc}) format('woff2');
                    }
                    @font-face{
                        font-family: ${fontCategory.fontFamily};
                        font-style: normal;
                        font-weight: normal;
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

                    .container {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        margin: 0;
                        padding: 0;
                        height: 100%;
                        width: 100%;
                        overflow: auto;
                        position: relative;
                    }

                    #card {
                        box-shadow: 9px 7px 40px -6px rgba(0, 0, 0, 0.25);
                        width: 75%;
                        padding: 0;
                        height: 100%;
                        margin: 2% 5%;
                        border-radius: 10px;
                    }

                    #card .details {
                        padding: 5% 5% 10% 10%;
                        color: #888;
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        transition: color 2s ease;
                    }

                    #card .details .right {
                        text-align: right;
                        width: 100%;
                        height: 100%;
                    }

                    #card .details #author {
                        font-weight: 600;
                        font-size: 20px;
                        color: #${categoryColor};
                        margin: 3% 0%;
                    }

                    #card .details #summary {
                        font-weight: 200;
                        font-style: italic;
                        font-size: 18px;
                        color: #${textColor};
                        text-align: justify;
                    }

                    #card .details {
                        font-size: 60px;
                        line-height: normal;
                    }

                    #card .details {
                        font-size: 18px;
                        line-height: normal;
                        vertical-align: top;
                    }

                    .quote-wrapper {
                        background: #${bgColor};
                        background: linear-gradient(240deg, rgba(150, 50, 50, 0.3), rgba(0, 0, 200, 0));
                        opacity: ${opacity};
                        transition: background-color 2s ease;
                    }
                `
        },
        template: (options: TemplateOptions) => {
            return `
                    <div class="container">
                        <div id="card" class="quote-wrapper">
                            <div class="details">
                                <div class="right">
                                    <div id="author" class="category">
                                        ${capitalize(join(options.category))} proverb
                                    </div>
                                    <div id="summary" class="text">${options.text}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
        },
    },
}

export default sophoclesLayout
