import { ComponentType, createElement, PropsWithChildren, ReactNode } from 'react'
import {
  Circle, ClipPath, Defs, Ellipse,
  G, Line, LinearGradient, Marker, Mask, Path, Pattern, Polygon, Polyline, RadialGradient, Rect, Stop,
  Symbol, Text, TextPath, TSpan, Use
} from 'react-native-svg'
import { createConvertReactProps } from '../common/utils'
import { IconSVGNode } from '../web'


export const NodeComponentMap: Record<string, ComponentType<PropsWithChildren<any>>> = {
  path: Path,
  line: Line,
  text: Text,
  g: G,
  defs: Defs,
  use: Use,
  lineargradient: LinearGradient,
  radialgradient: RadialGradient,
  pattern: Pattern,
  marker: Marker,
  textpath: TextPath,
  tspan: TSpan,
  tSpan: TSpan,
  clippath: ClipPath,
  stop: Stop,
  mask: Mask,
  circle: Circle,
  ellipse: Ellipse,
  rect: Rect,
  polyline: Polyline,
  polygon: Polygon,
  symbol: Symbol,
}
// For native, only few attribute is supported
const propNamesRemap = {
  class: 'className',
  'xmlns:xlink': 'xmlnsXlink',
  'xlink:href': 'xlinkHref',
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

export const convertProps = createConvertReactProps(propNamesRemap)

export const supportedNodeNames = Object.keys(NodeComponentMap)

export const filterNode = (node: IconSVGNode) => supportedNodeNames.includes(node.tagName)

/**
 * Travel children node
 */
export const renderChildren = (nodes: any[], parentKey: string = '#'): ReactNode[] => {
  const filteredNodes = nodes.filter(filterNode)
  return filteredNodes.map((node, index) => {
    const { tagName, attrs, children } = node
    const NodeComponent = NodeComponentMap[tagName.toLowerCase()]
    if (!NodeComponent) {
      return null
    }
    const nodeKey = `${parentKey}/$${tagName}_${index}`

    const _props: any = convertProps(attrs, {
      key: nodeKey,
    })
    return createElement(NodeComponent, {
      ..._props,
      children: children && children.length > 0 && renderChildren(children, nodeKey),
    })
  })
}
