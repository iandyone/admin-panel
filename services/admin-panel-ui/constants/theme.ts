import { ColorSystemOptions } from "@mui/material";
import { green, red } from "@mui/material/colors";

export const lightPallette: ColorSystemOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#2b2b2b", // header text / borders
      light: "red",
      // dark: "#3572EF",
      dark: "#0288d1",
      contrastText: "#ce93d8",
    },
    secondary: {
      main: "#fec387", // button bg
      // main: "#e65100", // button bg
      dark: "red", // button hover
      light: "yellow",
      contrastText: "#2b2b2b", // button text
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

    text: {
      primary: "#2b2b2b", // texts
      secondary: "#2b2b2baa", // placeholders / sort-arrow

      // secondaryChannel: "#f5f6fa",
    },
    background: {
      default: "#fcfcfc",
      paper: "#f5f6fa",
    },
    action: {
      selectedOpacity: 0.08,
    },

    common: {
      white: "#f5f6fa",
      black: "#71799B",
    },
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
