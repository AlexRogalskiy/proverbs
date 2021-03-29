import { TemplateData } from '../../typings/domain-types'

export const getSvgTemplate = async ({ layout, style, image, template }: TemplateData): Promise<string> => {
    return `
        <svg width="${image.width}" height="${image.height}" fill="none" xmlns="http://www.w3.org/2000/svg">
            <foreignObject x="0" y="0" width="${image.width}" height="${image.height}">
                <div xmlns="http://www.w3.org/1999/xhtml">
                    <style>
                        ${layout.style(style)}
                    </style>
                    ${layout.template(template)}
                </div>
            </foreignObject>
        </svg>
    `
}
