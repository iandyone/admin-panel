import { ColorSystemOptions } from "@mui/material";
import { green, red } from "@mui/material/colors";

export const lightPallette: ColorSystemOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#2b2b2b", // header text / borders
      light: "red",
      dark: "#3572EF",
      contrastText: "purple",
    },
    success: {
      light: green[300],
      main: green[400],
      dark: green[800],
    },
    error: {
      light: red[300],
      main: red[400],
      dark: red[800],
    },
    secondary: {
      main: "#f17800",
      dark: "yellow",
      light: "yellow",
      contrastText: "yellow",
    },
    text: {
      primary: "#2b2b2b", // texts
      secondary: "#2b2b2baa", // placeholders
    },
    background: {
      default: "#fcfcfc",
      paper: "#f5f6fa",
    },
    common: {},
  },
};

export const darkPallette: ColorSystemOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#EEEEEE",
      light: "green",
      dark: "#fec387",
      contrastText: "purple",
    },
    success: {
      light: green[400],
      main: green[500],
      dark: green[700],
    },
    error: {
      light: red[400],
      main: red[500],
      dark: red[700],
    },
    background: {
      default: "#383d4d",
      paper: "#2d2f3a",
    },
  },
};
