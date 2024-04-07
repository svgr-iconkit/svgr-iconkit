import { blankCaseRegExp } from './constants'

export const paramCase = (val: string) =>
  String(val)
    .split(blankCaseRegExp)
    .filter(str => str.length > 0)
    .join('-')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/^\-/, '')
    .replace(/[\-\_]+/g, '-')
    .toLowerCase()

export default paramCase
