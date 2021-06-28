import { camelCase } from "change-case";

export const removePx = (str?: string | number) =>
  !str ? "" : String(str).replace("px", "");

const ignoredAttrNames = ["xmlns", "title"];

export const convertReactProps = (
  attrs: Record<string, any>,
  originalContent: any = {},
  propNamesRemap?: Record<string, string>
) => {
  const _props: any = {
    ...originalContent,
  };

  const allowedPropNames = Object.keys(attrs)
    .filter((propName) => !String(propName).match(/^[0-9]/))
    .filter((propName) => !ignoredAttrNames.includes(propName))
    .map((name) =>
      propNamesRemap && propNamesRemap[name] ? propNamesRemap[name] : name
    );
  allowedPropNames.forEach((propName) => {
    const convertedName = camelCase(propName);
    _props[convertedName] = attrs[propName];
  });
  return _props;
};

export const convertStyleProps = (
  attrs: Record<string, any>,
  originalContent: any = {},
  propNamesRemap?: Record<string, string>
) => {
  const _props: any = {
    ...originalContent,
  };
  const allowedPropNames = Object.keys(attrs)
    .filter((propName) => !String(propName).match(/^[0-9]/))
    .filter((propName) => !ignoredAttrNames.includes(propName))
    .map((name) =>
      propNamesRemap && propNamesRemap[name] ? propNamesRemap[name] : name
    );
  allowedPropNames.forEach((propName) => {
    const convertedName = camelCase(propName);
    _props[convertedName] = attrs[propName];
  });
  return _props;
};
