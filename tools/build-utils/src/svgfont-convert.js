import { parse } from 'svg-parser'
import { optimize } from 'svgo'

import FS from 'fs'
import { nodeToCode } from './utils'

export function convertSvgFont(
  name,
  source,
  { fillColor, strokeColor, forceWidth, forceHeight, typescript = false, disableConvertXlink = false },
) {
  const plugins = [
    {
      name: 'removeTitle',
    },
    {
      name: 'removeDesc',
    },
    {
      name: 'removeUselessDefs',
    },
    {
      name: 'convertStyleToAttrs',
    },
    {
      name: 'removeDimensions',
    },
    {
      name: 'removeStyleElement',
    },
    {
      name: 'removeScriptElement',
    },
  ]
  if (!disableConvertXlink) {
    plugins.push({ name: 'removeXMLNS' })
  }

  let sourceContent = FS.readFileSync(source, 'utf-8')
  if (sourceContent.charCodeAt(0) === 0xfeff) {
    sourceContent = sourceContent.slice(1)
  }
  const optimizedSource = optimize(sourceContent, {
    plugins,
  })
  if (!optimizedSource || !optimizedSource.data) {
    console.error('[svgFont/convert] unexcepted optimize error. source: "%s', source)
    console.error('[svgFont/convert] output=%o', optimizedSource)
    process.exit(1)
    return
  }
  const node = parse(optimizedSource.data)

  const { type, tagName, properties = {}, children = [] } = node.children[0]

  if (type !== 'element') {
    console.error('[svgFont/convert] unexcepted root children. node: %o', node)
    process.exit(1)
    return
  }

  if (!children) {
    console.warn('[svgFont/convert] unable to handle undefined root children. node: %o', node)
    process.exit(1)
    return
  }

  const svgNode = children[0]
  if (svgNode.tagName !== 'defs') {
    console.warn('[svgFont/convert] unexpected first tag. Looking for <defs>. node: %o', node)
    return Promise.reject(new Error('Unexpected tag found.'))
  }
  const fontNodes = svgNode.children.filter(childNode => childNode.tagName === 'font')

  if (!fontNodes || fontNodes.length < 1) {
    console.warn('[svgFont/convert] No font-face defined. node: %o', svgNode)
    return Promise.reject(new Error('No font-face defined.'))
  }
  const fontNode = fontNodes[0]

  const fontFaceNodes = fontNode.children.filter(childNode => childNode.tagName === 'font-face')
  const glyphNodes = fontNode.children.filter(childNode => childNode.tagName === 'glyph')

  if (!fontFaceNodes || fontFaceNodes.length < 1) {
    console.warn('[svgFont/convert] No font-face defined. node: %o', fontNode)
    return Promise.reject(new Error('No font-face defined.'))
  }
  const { properties: fontFaceProperties } = fontFaceNodes[0]

  if (!glyphNodes || glyphNodes.length < 1) {
    console.warn('[svgFont/convert] No glyph defined. node: %o', fontNode)
    return Promise.reject(new Error('No glyph defined.'))
  }

  const { 'font-family': fontFamily, 'units-per-em': size = 16, descent = 0 } = fontFaceProperties

  return Promise.resolve(
    glyphNodes.map(glyphNode => {
      const { properties = {} } = glyphNode
      const iconName = properties['glyph-name']

      const width = forceWidth ?? size
      const height = forceHeight ?? size
      const result = {
        name: iconName,
        attrs: {
          viewBox: `0 0 ${width} ${height}`,
        },
        data: [
          {
            tagName: 'path',
            attrs: {
              transform: `translate(0, ${Number(descent).toFixed(2)}) scale(1, -1)`,
              'transform-origin': 'center',
              fill: fillColor,
              d: properties.d,
            },
          },
        ],
      }
      return {
        name: iconName,
        result,
        code: nodeToCode(result, { typescript }),
      }
    }),
  )
}
