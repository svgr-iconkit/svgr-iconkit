import FS from "fs";
import Path from "path";
import camelCase from "camelcase";

export const fileOptions = {
  encoding: "utf-8",
};
export const readFile = (path) => {
  return FS.readFileSync(path, fileOptions);
};

/**
 * Write file and make sure directory created
 * @param {*} path 
 * @param {*} content 
 * @returns 
 */
export const writeFile = (path, content) => {
  const dir = Path.dirname(path);
  if (!FS.existsSync(dir)) {
    FS.mkdirSync(dir, { recursive: true});
  }
  return FS.writeFileSync(path, content, fileOptions);
};
export const getCamelIconName = (iconName) =>
  `SVG_${camelCase(iconName, { pascalCase: true })}`;

  