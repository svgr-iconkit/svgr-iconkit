
import { camelCase } from "change-case";
export const removePx = (str?: string | number) =>  !str ? '' : String(str).replace("px", "");

export const convertReactProps = (attrs: Record<string, any>, originalContent: any = {}) => {

  const _props: any = {
    ...originalContent,
  };

  Object.keys(attrs).forEach((propName) => {
    const convertedName = camelCase(propName);
    _props[convertedName] = attrs[propName];
  });
  return _props;
}