import { NowRequest, NowResponse, VercelResponse } from '@vercel/node'

import { RoutePattern } from '../typings/enum-types'

import { toString } from '../src/utils/commons'

import { getRoute } from '../src/routes/routes'

export default async function render(req: NowRequest, res: NowResponse): Promise<VercelResponse> {
    try {
        const routePattern = RoutePattern[toString(req.query.operation)]

        const route = getRoute(routePattern)

        return await route(req, res)
    } catch (error) {
        return res.send({
            status: 'Error',
            name: error.name,
            message: error.message,
        })
    }
}
