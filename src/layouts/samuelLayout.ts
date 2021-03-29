import { LayoutOptions, StyleOptions, TemplateOptions } from '../../typings/domain-types'
import { LayoutPattern } from '../../typings/enum-types'

import { capitalize, join } from '../utils/commons'

const samuelLayout: Record<LayoutPattern.samuel, LayoutOptions> = {
    samuel: {
        style: (options: StyleOptions) => {
            const {
                theme: { bgColor },
                animation: { animation, keyframes },
            } = options

            const borderColor = bgColor === 'fffefe' ? '757575' : bgColor
            return `
                    * {
                        position: relative;
                        z-index: 1;
                    }
                    .quote {
                        display: inline-block;
                        margin: 1em;
                        width:600px;
                        ${animation};
                    }
                    ${keyframes}
                    blockquote {
                        border: solid 6px #${borderColor};
                        display: inline-block;
                        margin: 0;
                        font-size:16px;
                        padding: 1em;
                        background: #fff;
                        -webkit-mask-image: radial-gradient(circle 0 at 0 0, transparent 0, transparent, black);
                        mask-image: radial-gradient(circle 0 at 0 0, transparent 0, transparent, black);
                        position: relative;
                    }
                    blockquote::before {
                        background-color: #fff;
                        bottom: -10%;
                        content: "";
                        left: 0;
                        position: absolute;
                        right: 0;
                        top: -10%;
                        transform: rotate(-15deg) skew(5deg);
                    }
                    cite {
                        display: block;
                        font-style: italic;
                        text-align: right;
                    }
                    cite::before {
                        content: "- ";
                    }
                `
        },
        template: (options: TemplateOptions) => {
            return `
                    <div class="quote">
                        <blockquote>
                            <p>${options.text}</p>
                            <cite>${capitalize(join(options.category))} proverb</cite>
                        </blockquote>
                    </div>
                `
        },
    },
}

export default samuelLayout
