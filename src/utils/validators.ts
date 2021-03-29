export const getType = (obj: any): string => {
    return {}.toString
        .call(obj)
        .match(/\s(\w+)/)[1]
        .toLowerCase()
}

export const isBlankString = (value: string): boolean => !value || /^\s*$/.test(value)

export const isNull = (value: any): boolean => {
    return value === null
}

export const isUndefined = (value: any): boolean => {
    return value === undefined
}

export const isNullOrUndefined = (value: any): boolean => {
    return isNull(value) || isUndefined(value) || typeof value === 'undefined'
}

export const isNotNull = (value: any): boolean => {
    return !isNull(value)
}

export const isNotUndefined = (value: any): boolean => {
    return !isUndefined(value)
}

export const isString = (value: any): boolean => {
    return isNotNull(value) && (typeof value === 'string' || getType(value) === 'string')
}

export const isArray = (value: any): boolean => {
    // return myArray.constructor.toString().indexOf("Array") > -1;
    return isNotNull(value) && Object.prototype.toString.apply(value) === '[object Array]'
}

export const isObject = (value: any): boolean => {
    return isNotNull(value) && Object.prototype.toString.apply(value) === '[object Object]'
}

export const isFunction = (value: any): boolean => {
    return isNotNull(value) && typeof value === 'function' && value.constructor && value.apply
}

export const isNumber = (value: any): boolean => {
    return isNotNull(value) && (typeof value === 'number' || getType(value) === 'number') && isFinite(value)
}
