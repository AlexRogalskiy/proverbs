import * as data from '../data/proverbs.json'

import { mergeProps } from './commons'
import { ProverbMapper } from '../typings/types'

const getProverbData = (): ProverbMapper => mergeProps<ProverbMapper>(data)

export const proverbs = getProverbData()
