import { createElement } from 'react'
import type { IconSVGNode } from '../common/types'
import { createConvertReactProps } from '../common/utils'

// For web, only few attribute is supported
export const propNamesRemap = {
  class: 'className',
  className: 'className',
  strokeWidth: 'strokeWidth',
  'stroke-width': 'strokeWidth',
  strokeOpacity: 'strokeOpacity',
  'stroke-opacity': 'strokeOpacity',
  strokeLinecap: 'strokeLinecap',
  'stroke-linecap': 'strokeLinecap',
  strokeLinejoin: 'strokeLinejoin',
  'stroke-linejoin': 'strokeLinejoin',
  strokeDasharray: 'strokeDasharray',
  'stroke-dasharray': 'strokeDasharray',
  strokeDashoffset: 'strokeDashoffset',
  'stroke-dashoffset': 'strokeDashoffset',
  strokeMiterlimit: 'strokeMiterlimit',
  'stroke-miterlimit': 'strokeMiterlimit',
  style: null,
}

export const convertRunner = createConvertReactProps(propNamesRemap)

export const filterNode = (node: IconSVGNode) => node.tagName !== 'title'
/**
 * Travel children node
 */
export const renderChildren = (nodes: any[], parentKey: string = '#') => {
  const filteredNodes = nodes.filter(filterNode)
  return filteredNodes.map((node, index) => {
    const { tagName, attrs, children } = node
    const nodeKey = `${parentKey}/$${tagName}_${index}`

    let childrenNodes: any[] = []
    if (children && children.length > 0) {
      childrenNodes = renderChildren(children, nodeKey)
    }
    const _props: any = convertRunner(attrs, {
      key: nodeKey,
    })

    return createElement(tagName, _props, ...childrenNodes)
  })
}
