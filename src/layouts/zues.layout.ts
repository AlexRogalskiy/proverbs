import { LayoutOptions, StyleOptions, TemplateOptions } from '../../typings/domain-types'
import { FontPattern, LayoutPattern } from '../../typings/enum-types'

import { capitalize, join } from '../utils/commons'

import { getFont } from '../fonts/fonts'

const zuesLayout: Record<LayoutPattern.zues, LayoutOptions> = {
    zues: {
        style: (options: StyleOptions) => {
            const {
                theme: { textColor, categoryColor, bgColor },
                animation: { animation, keyframes },
            } = options

            const fontText = getFont(FontPattern.merienda)
            const fontCategory = getFont(FontPattern.merienda)

            return `
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

                    .container{
                        background-color: #${bgColor};
                        display: flex;
                        justify-content: center;
                        margin: 1em;
                        width: auto;
                        padding: 5% 3%;
                        ${animation};
                    }
                    ${keyframes}
                    .quote4{
                        background-color: #${bgColor};
                        color: #fff;
                        width: 75%;
                        text-align: justify;
                        border-left: thick double #C08552;
                        border-right: thick double #C08552;
                        padding: 6% 4%;
                        position: relative;
                        transform: skew(-.312rad);
                        height: auto;
                    }
                    .quote4::before, .quote4::after{
                        position: absolute;
                        font-family: 'Dosis', sans-serif;
                        font-size: 105px;
                        background: #${bgColor};
                        display: block;
                        height: 30px;
                        width: 45px;
                        text-align: center;
                        color: #DAB49D;
                        left: 0;
                        right: 0;
                        margin: auto;
                        z-index: 100;
                    }
                    .quote4::before{
                        content: "“";
                        top: -25px;
                        line-height: 80px;
                        z-index: 1;
                    }
                    .quote4::after{
                        content: "”";
                        bottom: -25px;
                        line-height: 70px;
                    }
                    .quote4 .first, .quote4 .text{
                        width: 90%;
                        margin: auto;
                        text-align: center;
                        transform: skew(.312rad);
                    }
                    .quote4 .first{
                        margin-top: 10px;
                        width: 100%;
                        color: #DAB49D;
                        font-size: 14px;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                    }
                    .quote4 .text{
                        color: #F3E9DC;
                        font-size: 16px;
                    }
                    .quote4 .author{
                        text-align: center;
                        margin: 5% 3% 0% 3%;
                        font-size: 13px;
                        color: #5E3023;
                    }
                    .quote4 .border::before, .quote4 .border::after{
                        content: "";
                        width: 280px;
                        height: 3px;
                        position: absolute;
                        display: block;
                        left: 0;
                        right: 0;
                        margin: auto;
                    }
                    .quote4 .border::after{
                        border-bottom: 2px solid #C08552;
                        bottom: 0px;
                    }
                    .quote4 .border::before{
                        border-top: 2px solid #C08552;
                        top:0px;
                    }
                `
        },
        template: (options: TemplateOptions) => {
            return `
                    <div class="container">
                        <div class="quote4">
                            <div class="border"></div>
                            <div class="text">${options.text}</div>
                            <div class="author category">${capitalize(join(options.category))} proverb</div>
                        </div>
                    </div>
                `
        },
    },
}

export default zuesLayout
