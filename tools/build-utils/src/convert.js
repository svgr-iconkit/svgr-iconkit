import { parse } from 'svg-parser'
import { optimize } from 'svgo'

const disallowedTagNames = ['style', 'title']
const disallowedAttributeNames = ['class', 'className', 'style']

const renamedAttributesNames = {}

function isAllowedAttributeName(name) {
  if (disallowedAttributeNames.includes(name)) return false
  // if (name.indexOf(":") > -1) {
  //   return false;
  // }
  return true
}

function filterOnlyElement(node) {
  if (!node) return false
  if (node.type !== 'element') return false
  if (!node.tagName) return false
  if (disallowedTagNames.includes(node.tagName.toLowerCase())) return false
  return true
}

function getChildrenData(node, options) {
  if (!node) {
    console.error('Empty node reported')
    throw new Error('Unexcepted undefined node')
  }
  const { tagName, properties, children = [] } = node
  if (!tagName) {
    console.error('Empty node tagName. node=%o', node)
    throw new Error('Unexcepted node without tagName')
  }
  let attrs = {}
  let modifiedTagName = tagName
  let modifiedChildren = [...children]
  Object.keys(properties)
    .filter(isAllowedAttributeName)
    .forEach(propertyName => {
      if (renamedAttributesNames[propertyName]) {
        attrs[renamedAttributesNames[propertyName]] = properties[propertyName]
        return
      }
      attrs[propertyName] = properties[propertyName]
    })

  const { fillColor, strokeColor, idMap = {}, parents = [] } = options

  // Workaround - copying xlink:href target prevent missing rendering in native
  if (attrs['xlink:href']) {
    const hrefTarget = attrs['xlink:href'].replace('#', '')
    const targetNode = idMap[hrefTarget]
    if (targetNode) {
      modifiedTagName = 'g'
      modifiedChildren = [
        {
          ...targetNode,
        },
      ]
      attrs['xlink:href'] = undefined
    } else {
      console.warn(
        '[svgrData/getChildrenData] Unable to find use target %s at node %o',
        attrs['xlink:href'],
        [...parents, tagName].join('/'),
      )
    }
  }

  // Overwrite colors when attributes exist (if non-none)
  if (fillColor) {
    if (attrs.fill && attrs.fill !== 'none') {
      attrs.fill = fillColor
    }
  }
  if (strokeColor) {
    if (attrs.stroke && attrs.stroke !== 'none') {
      attrs.stroke = strokeColor
    }
  }
  const hasChildren = modifiedChildren && Array.isArray(modifiedChildren) && modifiedChildren.length > 0
  const createdChildren = !hasChildren
    ? undefined
    : modifiedChildren.filter(filterOnlyElement).map(node =>
        getChildrenData(node, {
          ...options,
          parents: [...parents, tagName],
        }),
      )

  const result = {
    tagName: modifiedTagName,
    attrs,
  }
  if (createdChildren && createdChildren.length > 0) {
    result.children = createdChildren
  }
  return result
}

function getIdMap(node, options) {
  const idMap = options.idMap
  const { tagName, properties = {}, children = [] } = node
  if (properties.id) {
    idMap[properties.id] = node
  }

  const hasChildren = children && Array.isArray(children) && children.length > 0
  if (hasChildren) {
    for (const node of children) {
      getIdMap(node, options)
    }
  }
  return idMap
}

export function convertSvgData(name, source, { fillColor, strokeColor, forceWidth, forceHeight, typescript = false }) {
  const optimizedSource = optimize(source, {
    plugins: [
      {
        name: 'removeXMLNS',
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
    ],
  })
  if (!optimizedSource || !optimizedSource.data) {
    console.error('[svgrData/convert] unexcepted optimize error. source=%s', source)
    console.error('[svgrData/convert] output=%o', optimizedSource)
    process.exit(1)
    return
  }
  const node = parse(optimizedSource.data)

  const { type, tagName, properties = {}, children = [] } = node.children[0]

  if (type !== 'element') {
    console.error('[svgrData/convert] unexcepted root children. node=%o', node)
    process.exit(1)
    return
  }

  if (!children) {
    console.warn('[svgrData/convert] unable to handle undefined root children. node=%o', node)
    process.exit(1)
    return
  }

  const attrs = {}
  Object.keys(properties)
    .filter(isAllowedAttributeName)
    .forEach(propertyName => {
      attrs[propertyName] = properties[propertyName]
    })

  const filteredChildren = children.filter(filterOnlyElement)

  // Travelling all id in the document
  const idMap = {}
  filteredChildren.forEach(node => getIdMap(node, { idMap }))

  const result = {
    name,
    attrs,
    data: filteredChildren.map(node =>
      getChildrenData(node, {
        parents: [name + ':'],
        idMap,
        fillColor,
        strokeColor,
      }),
    ),
  }

  if (forceWidth) {
    result.attrs.width = forceWidth
  }

  if (forceHeight) {
    result.attrs.height = forceHeight
  }

  const contentStr = JSON.stringify(result)
  if (typescript) {
    return `
import { IconSVG } from "@svgr-iconkit/core";
export const content: IconSVG = ${contentStr};
export default content;
`
  }

  return `
export const content = ${contentStr};
export default content;
`
}
