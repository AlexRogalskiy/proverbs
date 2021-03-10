import { ProfileOptions } from '../typings/types'
import { CONFIG } from './config'

const getProfileOptions = (): ProfileOptions => {
    return process.env.AWS_LAMBDA_FUNCTION_VERSION ? CONFIG.prod : CONFIG.dev
}

export const profile = getProfileOptions()
