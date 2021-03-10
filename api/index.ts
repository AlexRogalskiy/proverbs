import { NowRequest, NowResponse, VercelResponse } from '@vercel/node'

import { CategoryPattern, HeroPattern } from '../typings/types'
import { proverbRenderer } from '../utils/proverb'
import { toString } from '../utils/commons'

export default async function render(req: NowRequest, res: NowResponse): Promise<VercelResponse> {
    try {
        const {
            category,
            keywords,
            pattern,
            width,
            height,
            backgroundColor,
            fontColor,
            opacity,
            colorPattern,
        } = req.query

        const proverb = await proverbRenderer({
            category: CategoryPattern[toString(category)] as CategoryPattern,
            pattern: HeroPattern[toString(pattern)] as HeroPattern,
            width: toString(width),
            height: toString(height),
            keywords,
            backgroundColor,
            fontColor,
            opacity,
            colorPattern,
        })

        res.setHeader('Cache-Control', 'no-cache,max-age=0,no-store,s-maxage=0,proxy-revalidate')
        res.setHeader('Pragma', 'no-cache')
        res.setHeader('Expires', '-1')
        res.setHeader('Content-type', 'image/svg+xml')
        res.setHeader('X-Powered-By', 'Vercel')

        return res.send(proverb)
    } catch (error) {
        return res.send({
            status: 'Error',
            name: error.name,
            message: error.message,
        })
    }
}
