import { camelCase } from "change-case";
import { IconSVG } from "./types";

export const removePx = (str?: string | number) =>
  !str ? "" : String(str).replace("px", "");

const ignoredAttrNames = ["xmlns", "title", "id", "version"];

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

export const getViewboxValue = (content: IconSVG) => {
  const { attrs, width = 24, height = 24 } = content;
  const { viewBox, width: orgWidth, height: orgHeight } = attrs || {};
  const _viewBox =
    viewBox ||
    `0 0 ${removePx(orgWidth || width)} ${removePx(orgHeight || height)}`;
  return _viewBox;
};
