import { createElement } from 'react'
import type { IconSVGNode } from '../common/types'
import { createConvertReactProps } from '../common/utils'

// For web, only few attribute is supported
export const propNamesRemap = {
  class: 'className',
  className: 'className',
  'xlink:href': 'href',
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
  'transform-origin': 'transform-origin',
  style: null,
}

export const convertRunner = createConvertReactProps(propNamesRemap)

export const filterNode = (node: IconSVGNode) => node.tagName !== 'title'
/**
 * Travel children node
 */
export const renderChildren = (nodes: any[], parentKey: string = '#', namespace: string = '@') => {
  const filteredNodes = nodes.filter(filterNode)
  return filteredNodes.map((node, index) => {
    const { tagName, attrs, children } = node
    const nodeKey = `${parentKey}/$${tagName}_${index}`

    let childrenNodes: any[] = []
    if (children && children.length > 0) {
      childrenNodes = renderChildren(children, nodeKey, namespace)
    }
    const _props: any = convertRunner(attrs, {
      key: nodeKey,
    })
    // Rendering svg contenti n
    if (_props.id) {
      _props.id = namespace + _props.id
    }
    if (_props.href) {
      _props.href = '#'+namespace + String(_props.href).substring(1)
    }

    return createElement(tagName, _props, ...childrenNodes)
  })
}
