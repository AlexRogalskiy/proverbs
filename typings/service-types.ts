import { VercelRequest, VercelResponse } from '@vercel/node'

/**
 * RouteFunction
 * @desc Route function type representing single unit of work per request
 */
export type RouteFunction = (req: VercelRequest, res: VercelResponse) => Promise<VercelResponse>
