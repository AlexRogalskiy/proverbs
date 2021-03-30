import fetch from 'isomorphic-unfetch'

import { ResponseError } from '../errors/errors'
import { errorLogs } from './loggers'

const checkStatus = async (response: Response): Promise<Response> => {
    if (response.ok) {
        return response
    }

    const error = new ResponseError(response.statusText, response)

    return Promise.reject(error)
}

export const fetchAsJson = async (url: string, options: RequestInit = {}): Promise<any> => {
    try {
        const response = await fetch(url, options)
        const data = await checkStatus(response)

        return await data.json()
    } catch (error) {
        errorLogs(`Cannot fetch request by url: ${url}, message: ${error.message}`)
        throw error
    }
}

export const toBase64ImageUrl = async (request: RequestInfo): Promise<string> => {
    const fetchImageUrl = await fetch(request)
    const responseArrBuffer = await fetchImageUrl.arrayBuffer()

    return `data:${fetchImageUrl.headers.get('Content-Type') || 'image/png'};base64,${Buffer.from(
        responseArrBuffer
    ).toString('base64')}`
}
