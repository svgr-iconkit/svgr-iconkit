import FS from "fs";
import camelCase from "camelcase";

export const fileOptions = {
  encoding: "utf-8",
};
export const readFile = (path) => {
  return FS.readFileSync(path, fileOptions);
};

export const writeFile = (path, content) => {
  return FS.writeFileSync(path, content, fileOptions);
};
export const getCamelIconName = (iconName) =>
  `SVG_${camelCase(iconName, { pascalCase: true })}`;

  