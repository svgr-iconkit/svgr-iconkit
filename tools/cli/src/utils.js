import FS from 'fs'
import Path from 'path'
import { camelCase, paramCase } from '@svgr-iconkit/common-utils'
export const fileOptions = {
  encoding: 'utf-8',
}
export const readFile = path => {
  return FS.readFileSync(path, fileOptions)
}

/**
 * Write file and make sure directory created
 * @param {*} path
 * @param {*} content
 * @returns
 */
export const writeFile = (path, content) => {
  const dir = Path.dirname(path)
  if (!FS.existsSync(dir)) {
    FS.mkdirSync(dir, { recursive: true })
  }
  return FS.writeFileSync(path, content, fileOptions)
}
export const getCamelIconName = iconName => `SVG_${camelCase(iconName)}`

export const resolvePackagePath = async packageName => {
  for (const modulePath of module.paths) {
    const isExist = FS.existsSync(Path.join(modulePath, packageName, 'package.json'))
    if (isExist) {
      return Promise.resolve(Path.join(modulePath, packageName))
    }
  }
  return Promise.resolve(null)
}

export const createRootIconset = family => `
import { createIconset } from "@svgr-iconkit/core";
import { IconNames, map } from "./map";
export const familyName: string = ${JSON.stringify(family)};
export const Iconset = createIconset<IconNames>({familyName, map});

export default Iconset;
`
