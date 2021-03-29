import { LayoutOptions, StyleOptions, TemplateOptions } from '../../typings/domain-types'
import { LayoutPattern } from '../../typings/enum-types'

import { capitalize, join } from '../utils/commons'

const socratesLayout: Record<LayoutPattern.socrates, LayoutOptions> = {
    socrates: {
        style: (options: StyleOptions) => {
            const {
                theme: { bgColor },
                animation: { animation, keyframes },
            } = options

            const borderColor = bgColor === 'fffefe' ? 'ccc' : bgColor
            return `
                    .square-brackets-quote {
                        display:inline-block;
                        font-family:Arial,Helvetica,sans-serif;
                        margin:1em;
                        width:600px;
                        ${animation};
                    }
                    ${keyframes}
                    .square-brackets-quote blockquote {
                        border:solid 1em #${borderColor};
                        background: #fff;
                        display:inline-block;
                        margin:0;
                        padding:1em;
                        position:relative;
                        font-size:15px;

                    }
                    .square-brackets-quote blockquote::before {
                        background-color: #fff;
                        bottom: -1em;
                        content: "";
                        left: 2em;
                        position: absolute;
                        right: 2em;
                        top: -1em;
                    }
                    .square-brackets-quote cite {
                        color:#757575;
                        display: block;
                        font-size:small;
                        font-style: normal;
                        text-align: right;
                        text-transform:uppercase;
                    }
                    * {
                        position: relative;
                        z-index: 1;
                    }
                `
        },
        template: (options: TemplateOptions) => {
            return `
                    <div class="square-brackets-quote">
                        <blockquote>
                            <p>${options.text}</p>
                            <cite>${capitalize(join(options.category))} proverb</cite>
                        </blockquote>
                    </div>
                `
        },
    },
}

export default socratesLayout
