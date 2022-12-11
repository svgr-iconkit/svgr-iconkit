
export const nodeToCode = (result, { typescript = false}) => {
  const contentStr = JSON.stringify(result)
  if (typescript) {
    return `import { IconSVG } from "@svgr-iconkit/core";
export const content: IconSVG = ${contentStr || '{}'};
export default content;`
  }

  return `export const content = ${contentStr || '{}'};
export default content;`
}