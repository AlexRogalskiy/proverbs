import { LayoutOptions, StyleOptions, TemplateOptions } from '../../typings/domain-types'
import { LayoutPattern } from '../../typings/enum-types'

import { capitalize } from '../utils/commons'

const zuesLayout: Record<LayoutPattern.zues, LayoutOptions> = {
    zues: {
        style: (options: StyleOptions) => {
            const { animation, keyframes } = options.animation

            return `
                    .container{
                        background-color:#000;
                        width:550px;
                        height:auto;
                        padding:30px 20px 40px 40px;
                        ${animation};
                    }
                    ${keyframes}
                    .quote4{
                        background-color:#000;
                        color:#fff;
                        width:450px;
                        text-align:justify;
                        border-left:  thick double #C08552;
                        border-right:  thick double #C08552;
                        padding:40px 10px;
                        position:relative;
                        transform: skew(-.312rad);
                        height:auto;
                    }
                    .quote4::before, .quote4::after{
                        position:absolute;
                        font-size:105px;
                        font-family: 'Dosis', sans-serif;
                        background:#000;
                        display:block;
                        height:30px;
                        width:45px;
                        text-align:center;
                        color:#DAB49D;
                        left:0;
                        right:0;
                        margin:auto;
                        z-index:100;
                    }
                    .quote4::before{
                        content:"“";
                        top:-10px;
                        line-height:80px;
                        z-index:1;
                    }
                    .quote4::after{
                        content:"”";
                        bottom:-25px;
                        line-height: 70px;
                    }
                    .quote4 .first, .quote4 .text{
                        width:90%;
                        margin:auto;
                        transform: skew(.312rad);
                    }
                    .quote4 .first{
                        margin-top:10px;
                        width:100%;
                        color: #DAB49D;
                        font-size:14px;
                        font-family: 'Dosis', sans-serif;
                        text-transform: uppercase;
                        letter-spacing:1px;
                    }
                    .quote4 .text{
                        color:#F3E9DC;
                        font-size:16px;
                        font-family: 'Roboto Slab', serif;
                    }
                    .quote4 .author{
                        text-align:center;
                        margin-top:15px;
                        font-size:13px;
                        font-family: 'Exo', sans-serif;
                        color: #5E3023;
                    }
                    .quote4 .border::before, .quote4 .border::after{
                        content:"";
                        width:280px;
                        height:3px;
                        position:absolute;
                        display:block;
                        left:0;
                        right:0;
                        margin:auto;
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
                            <div class="author">${capitalize(options.category)}</div>
                        </div>
                    </div>
                `
        },
    },
}

export default zuesLayout
