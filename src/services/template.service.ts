import { Optional } from '../../typings/standard-types'
import {
    AnimationOptions,
    FontOptions,
    ImageOptions,
    LayoutOptions,
    ParsedRequestData,
    TemplateOptions,
    ThemeOptions,
} from '../../typings/domain-types'

import { mergeProps } from '../utils/commons'
import { serialize } from '../utils/serializers'
import { profile } from '../utils/profiles'
import { boxenLogs } from '../utils/loggers'

import { getTheme } from '../themes/themes'
import { getLayout } from '../layouts/layouts'
import { getFont } from '../fonts/fonts'
import { getAnimation } from '../animations/animations'
import { getSvgTemplate } from '../models/template'

import * as proverbService from './proverb.service'

export async function templateRenderer(requestData: ParsedRequestData): Promise<string> {
    const {
        fontPattern,
        themePattern,
        animationPattern,
        layoutPattern,
        categoryPattern,
        keywords,
        imageOptions,
        themeOptions,
    } = requestData

    const layout = mergeProps<LayoutOptions>(profile.layoutOptions, getLayout(layoutPattern))
    const font = mergeProps<FontOptions>(profile.styleOptions?.font, getFont(fontPattern))
    const theme = mergeProps<ThemeOptions>(profile.styleOptions?.theme, getTheme(themePattern), themeOptions)
    const animation = mergeProps<AnimationOptions>(
        profile.styleOptions?.animation,
        getAnimation(animationPattern)
    )
    const style = { font, theme, animation }
    const image = mergeProps<ImageOptions>(profile.imageOptions, imageOptions)

    const template: Optional<TemplateOptions> = keywords
        ? await proverbService.getProverbByKeywords(keywords)
        : await proverbService.getProverbByCategory(categoryPattern)

    boxenLogs(
        `
        Generating image view with parameters:
        category=${categoryPattern},
        keywords=${keywords},
        image options=${serialize(image)}
        theme options=${serialize(theme)}
        `
    )

    return template ? await getSvgTemplate({ layout, style, image, template }) : ''
}
