import { createTheme } from "@mui/material";

import { darkPallette, lightPallette } from "@/constants";
import { customizedComponents } from "@/theme/overrides";

export const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },

  colorSchemes: {
    light: lightPallette,
    dark: darkPallette,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  components: customizedComponents,
});
