import { LayoutOptions, StyleOptions, TemplateOptions } from '../../typings/domain-types'
import { LayoutPattern } from '../../typings/enum-types'

import { capitalize } from '../utils/commons'

const defaultLayout: Record<LayoutPattern.default, LayoutOptions> = {
    default: {
        style: (options: StyleOptions) => {
            const {
                theme: { textColor, bgColor, categoryColor },
                animation: { animation, keyframes },
            } = options

            return `
                    * {
                        padding: 0;
                        margin: 0;
                        box-sizing: border-box;
                    }
                    .container {
                        font-family: Arial, Helvetica, sans-serif;
                        padding: 40px 20px;
                        width: 600px;
                        background-color: #${bgColor};
                        border: 1px solid rgba(0, 0, 0, 0.2);
                        border-radius: 5px;
                        ${animation};
                    }
                    ${keyframes}
                    .container h3 {
                        font-size: 19px;
                        margin-bottom: 5px;
                        font-weight: 500;
                        font-style: oblique;
                        color: #${textColor};
                    }
                    .container h3::before {
                        content: open-quote;
                        font-size: 25px;
                    }
                    .container h3::after {
                        content: close-quote;
                        vertical-align: sub;
                        font-size: 25px;
                    }
                    .container p {
                        /* float: right; */
                        /* margin-right: 20px; */
                        font-style: italic;
                        padding: 5px;
                        text-align: right;
                        color: #${categoryColor};
                    }
                `
        },
        template: (options: TemplateOptions) => {
            return `
                    <div class="container">
                        <h3> ${options.text} </h3>
                        <p>- ${capitalize(options.category)} </p>
                    </div>
                `
        },
    },
}

export default defaultLayout
