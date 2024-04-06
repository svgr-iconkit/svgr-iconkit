import { blankCaseRegExp } from './constants'

export const camelCase = (val: string) =>
  String(val)
    .split(blankCaseRegExp)
    .filter(str => str.length > 0)
    .map((str, index) => {
      if (index < 1) return str
      return str.substring(0, 1).toUpperCase() + str.substring(1)
    })
    .join('')

export default camelCase
