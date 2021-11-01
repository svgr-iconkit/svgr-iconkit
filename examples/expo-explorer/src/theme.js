
import { ComponentTheme, extendTheme } from "native-base";

export const nbConfig = {
  suppressColorAccessibilityWarning: true,
};

const colors = {
  primary: {
    50: '#91d3de',
    100: '#7eccd9',
    200: '#6cc5d3',
    300: '#59bdce',
    400: "#47b6c8",
    500: '#3992a0',
    600: '#2b6d78',
    700: '#1c4950',
    800: '#15373c',
    900: '#0e2428',
  },
  secondary: {
    50: '#E4CCEA',
    100: '#DFB7DE',
    200: '#D5A1C7',
    300: '#CA8CAC',
    400: '#BE788C',
    500: '#AC6B73',
    600: '#9A625E',
    700: '#875E52',
    800: '#745846',
    900: '#62503A',
  },
  tertiary: {
    50: '#bcc2c0',
    100: '#b1b8b6',
    200: '#a6adab',
    300: '#9ba3a1',
    400: '#909996',
    500: '#828a87',
    600: '#737a78',
    700: '#656b69',
    800: '#565c5a',
    900: '#484d4b',
  },
};

// extend the theme
export const nbTheme = extendTheme({
  colors,
});
