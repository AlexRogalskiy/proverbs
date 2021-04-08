import { LayoutOptions, StyleOptions, TemplateOptions } from '../../typings/domain-types'
import { FontPattern, LayoutPattern } from '../../typings/enum-types'

import { capitalize, join } from '../utils/commons'

import { getFont } from '../fonts/fonts'

const euclidLayout: Record<LayoutPattern.euclid, LayoutOptions> = {
    euclid: {
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
                        font-size: 16px;
                        padding: 5% 5%;
                        margin: 0;
                    }
                    .category {
                        font-family: ${fontCategory.fontFamily}, sans-serif;
                        font-weight: bold;
                        text-align: right;
                        padding: 3% 5% 3% 0%;
                        color: #${categoryColor};
                        font-size: 26px;
                    }

                    .box {
                        background-color: transparent;
                        border-radius: 3px;
                        color: #fff;
                        position: absolute;
                        top: 35%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        width: 60%;
                        height: 60%;
                        transform-style: preserve-3d;
                        perspective: 2000px;
                        transition: 0.4s;
                        text-align: center;
                    }

                    .box:before {
                        content: "";
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: transparent;
                        border-top: 20px solid #${textColor};
                        border-left: 20px solid #${textColor};
                        box-sizing: border-box;
                    }

                    .box:after {
                        content: "";
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        border-bottom: 20px solid #${textColor};
                        border-right: 20px solid #${textColor};
                        box-sizing: border-box;
                    }

                    .box .fas {
                        font-size: 25px;
                        height: 50px;
                        width: 50px;
                        line-height: 50px !important;
                        background-color: #${categoryColor};
                        color: #2C3A47;
                    }

                    .box .fa2 {
                        position: absolute;
                        bottom: 0;
                        right: 0;
                        z-index: 1;
                    }

                    .box .wrapper {
                        position: absolute;
                        top: 30px;
                        left: -30px;
                        width: calc(100% + 60px);
                        height: calc(100% - 60px);
                        background-color: #${bgColor};
                        border-radius: 3px;
                        transition: 0.4s;
                    }

                    .box .wrapper .fa1 {
                        position: absolute;
                        top: 0;
                        left: 0;
                    }

                    .box .wrapper div {
                        position: absolute;
                        top: 50%;
                        left: 0;
                        transform: translateY(-50%);
                        text-align: center;
                        width: 100%;
                        padding: 30px 60px;
                        line-height: 1.5;
                        box-sizing: border-box;
                    }

                    .box:hover {
                        transform: translate(-50%, -50%) rotateY(-20deg) skewY(3deg);
                    }

                    .box:hover .wrapper {
                        transform: rotateY(20deg) skewY(-3deg);
                    }
                `
        },
        template: (options: TemplateOptions) => {
            return `
                    <div class="box"><i class="fas fa-quote-left fa2"></i>
                        <div class="wrapper"><i class="fas fa-quote-right fa1"></i>
                            <div>
                                <h3 class="category">${capitalize(join(options.category))} proverb</h3>
                                <p class="text">${options.text}</p>
                            </div>
                        </div>
                    </div>
                `
        },
    },
}

export default euclidLayout
