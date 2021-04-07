import { LayoutOptions, StyleOptions, TemplateOptions } from '../../typings/domain-types'
import { FontPattern, LayoutPattern } from '../../typings/enum-types'

import { capitalize, join } from '../utils/commons'

import { getFont } from '../fonts/fonts'

const ptolemyLayout: Record<LayoutPattern.ptolemy, LayoutOptions> = {
    ptolemy: {
        style: (options: StyleOptions) => {
            const {
                theme: { textColor, categoryColor, bgColor },
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
                        text-align: center;
                        color: #${categoryColor};
                    }

                    .container {
                        display: table-row;
                        position: relative;
                        margin: 0 auto;
                    }

                    article, article:before, article:after {
                        position: absolute;
                        top: 0;
                        left: 0;
                        bottom: 0;
                        right: 0;
                        margin: 5% 5%;
                        height: fit-content;
                        padding: 20px;
                        box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.3), 5px 10px 10px rgba(0, 0, 0, 0.15);
                        font: 200%/1.5 Open Sans, Baskerville, serif;
                        font-size: 1.5em;
                        background-color: #${bgColor};
                        background-image: linear-gradient(rgba(38, 77, 115, 0.5) 1px, transparent 1px);
                        background-size: 100% 1.5em;
                        background-origin: content-box;
                    }

                    .front {
                        -webkit-animation: nextCard 1s ease-in-out;
                        animation: nextCard 1s ease-in-out;
                    }

                    .back:before, .back:after {
                        content: "";
                        position: absolute;
                        left: 0px;
                        top: -40px;
                        width: auto;
                        height: auto;
                        padding: 20px;
                        z-index: -1;
                    }

                    .back:before {
                        transform: rotateZ(-2deg);
                    }

                    .back:after {
                        transform: rotateZ(3deg);
                    }

                    a {
                        text-decoration: none;
                        color: #2196f3;
                    }

                    footer {
                        position: absolute;
                        left: 0;
                        right: 0;
                        bottom: 32px;
                        color: #2196f3;
                        cursor: pointer;
                        -webkit-user-select: none;
                        -moz-user-select: none;
                        -ms-user-select: none;
                        user-select: none;
                    }

                    footer .next {
                        position: absolute;
                        right: 25px;
                    }

                    footer .tweet {
                        position: absolute;
                        left: 25px;
                    }

                    @-webkit-keyframes nextCard {
                        /*
                        0% {
                          transform: translateX(0);
                        }
                        50% {
                          transform: translateX(700px);
                        }
                        100% {
                          transform: translateX(0);
                          z-index: -1;
                        }
                        */
                        25% {
                            transform: rotate(25deg);
                        }
                        50% {
                            transform: translateY(-400px);
                        }
                        75% {
                            z-index: -1;
                        }
                        100% {
                            transform: translateY(0);
                            z-index: -1;
                        }
                    }

                    @keyframes nextCard {
                        /*
                        0% {
                          transform: translateX(0);
                        }
                        50% {
                          transform: translateX(700px);
                        }
                        100% {
                          transform: translateX(0);
                          z-index: -1;
                        }
                        */
                        25% {
                            transform: rotate(25deg);
                        }
                        50% {
                            transform: translateY(-400px);
                        }
                        75% {
                            z-index: -1;
                        }
                        100% {
                            transform: translateY(0);
                            z-index: -1;
                        }
                    }
                `
        },
        template: (options: TemplateOptions) => {
            return `
                    <div class="container">
                        <article class="back"></article>
                        <article id="mainCard">
                            <h1 class="category">${capitalize(join(options.category))} proverb</h1>
                            <p class="text">${options.text}</p>
                        </article>
                    </div>
                `
        },
    },
}

export default ptolemyLayout
