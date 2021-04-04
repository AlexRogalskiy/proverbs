import { LayoutOptions, StyleOptions, TemplateOptions } from '../../typings/domain-types'
import { FontPattern, LayoutPattern } from '../../typings/enum-types'

import { capitalize, join } from '../utils/commons'

import { getFont } from '../fonts/fonts'

const churchillLayout: Record<LayoutPattern.churchill, LayoutOptions> = {
    churchill: {
        style: (options: StyleOptions) => {
            const {
                theme: { textColor, categoryColor, bgColor },
                animation: { animation, keyframes },
            } = options

            const fontText = getFont(FontPattern.bellota)
            const fontCategory = getFont(FontPattern.bellota)

            return `
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
                        border-radius: 50%;
                        border-top: 1px solid #f1c40f;
                        text-align: center;
                        color: #${categoryColor};
                    }

                    #ct{
                        height: auto;
                        width: auto;
                        margin: 5% 5%;
                        text-align: center;
                        position: relative;
                        color: #${textColor};
                        padding: 15px;

                        background: radial-gradient(circle at top left, transparent 15px, #${bgColor} 0) top left,
                          radial-gradient(circle at top right, transparent 15px, #${bgColor} 0) top right,
                          radial-gradient(circle at bottom right, transparent 15px, #${bgColor} 0) bottom right,
                          radial-gradient(circle at bottom left, transparent 15px, #${bgColor} 0) bottom left;
                        ${animation};
                        background-size: 51% 51%;
                        background-repeat: no-repeat;
                    }
                    ${keyframes}
                    span{
                        background: #${bgColor};
                        color: #${categoryColor};
                        padding: 1% 10%;
                        font-size: 20px;
                        position: relative;
                        top: -25px;
                    }
                    .corner{
                        height: 30px;
                        width: 30px;
                        border-radius: 50%;
                        border: 1px solid #fff;
                        transform: rotate(-45deg);
                        position: absolute;
                        background: #fff;
                    }
                    #left_top{
                        top: -16px;
                        left: -16px;
                        background: transparent;
                        border-color: transparent transparent #f1c40f transparent;
                    }
                    #right_top{
                        top: -16px;
                        right: -16px;
                        background: transparent;
                        border-color: transparent transparent transparent #f1c40f;
                    }
                    #left_bottom{
                        bottom: -16px;
                        left: -16px;
                        background: transparent;
                        border-color: transparent #f1c40f transparent transparent ;
                    }
                    #right_bottom{
                        bottom: -16px;
                        right: -16px;
                        background: transparent;
                        border-color: #f1c40f transparent transparent transparent;
                    }
                    #borderLeft {
                        border-left: 1px solid #f1c40f;
                        position: absolute;
                        top: 15px;
                        bottom: 15px;
                        left: -1px;
                    }
                    #borderTop {
                        border-top: 1px solid #f1c40f;
                        position: absolute;
                        right: 15px;
                        left: 15px;
                        top: -1px;
                    }
                    #borderRight {
                        border-right: 1px solid #f1c40f;
                        position: absolute;
                        top: 15px;
                        bottom: 15px;
                        right: -1px;
                    }
                    #borderBottom {
                        border-bottom: 1px solid #f1c40f;
                        position: absolute;
                        right: 15px;
                        left: 15px;
                        bottom: -1px;
                    }
                    p{
                        padding-top: 0px;
                        font-size: 17px
                    }
                `
        },
        template: (options: TemplateOptions) => {
            return `
                    <div id="ct">
                        <div class="corner" id="left_top"></div>
                        <div class="corner" id="left_bottom"></div>
                        <div class="corner" id="right_top"></div>
                        <div class="corner" id="right_bottom"></div>
                        <div id="borderLeft"></div>
                        <div id="borderRight"></div>
                        <div id="borderBottom"></div>
                        <div id="borderTop"></div>
                        <span class="category">${capitalize(join(options.category))} proverb</span>
                        <blockquote>
                            <p class="text"><i>${options.text}</i></p>
                        </blockquote>
                    </div>
                `
        },
    },
}

export default churchillLayout
