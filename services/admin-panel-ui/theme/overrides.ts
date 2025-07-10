import { chipClasses, svgIconClasses } from "@mui/material";
import { green, grey, red } from "@mui/material/colors";
import { Theme, Components } from "@mui/material/styles";

export const customizedComponents: Components<Theme> = {
  MuiChip: {
    defaultProps: {
      size: "small",
    },
    styleOverrides: {
      root: ({ theme }) => ({
        border: "1px solid",
        borderRadius: "999px",
        [`& .${chipClasses.label}`]: {
          fontWeight: 600,
        },
        variants: [
          {
            props: {
              color: "default",
            },
            style: {
              borderColor: grey[200],
              backgroundColor: grey[100],
              [`& .${chipClasses.label}`]: {
                color: grey[500],
              },
              [`& .${chipClasses.icon}`]: {
                color: grey[500],
              },
              ...theme.applyStyles("dark", {
                borderColor: grey[700],
                backgroundColor: grey[800],
                [`& .${chipClasses.label}`]: {
                  color: grey[300],
                },
                [`& .${chipClasses.icon}`]: {
                  color: grey[300],
                },
              }),
            },
          },
          {
            props: {
              color: "success",
            },
            style: {
              borderColor: green[200],
              backgroundColor: green[50],
              [`& .${chipClasses.label}`]: {
                color: green[500],
              },
              [`& .${chipClasses.icon}`]: {
                color: green[500],
              },
              ...theme.applyStyles("dark", {
                borderColor: green[800],
                backgroundColor: green[900],
                [`& .${chipClasses.label}`]: {
                  color: green[300],
                },
                [`& .${chipClasses.icon}`]: {
                  color: green[300],
                },
              }),
            },
          },
          {
            props: {
              color: "error",
            },
            style: {
              borderColor: red[100],
              backgroundColor: red[50],
              [`& .${chipClasses.label}`]: {
                color: red[500],
              },
              [`& .${chipClasses.icon}`]: {
                color: red[500],
              },
              ...theme.applyStyles("dark", {
                borderColor: red[800],
                backgroundColor: red[900],
                [`& .${chipClasses.label}`]: {
                  color: red[200],
                },
                [`& .${chipClasses.icon}`]: {
                  color: red[300],
                },
              }),
            },
          },
          {
            props: { size: "small" },
            style: {
              maxHeight: 20,
              [`& .${chipClasses.label}`]: {
                fontSize: theme.typography.caption.fontSize,
              },
              [`& .${svgIconClasses.root}`]: {
                fontSize: theme.typography.caption.fontSize,
              },
            },
          },
          {
            props: { size: "medium" },
            style: {
              [`& .${chipClasses.label}`]: {
                fontSize: theme.typography.caption.fontSize,
              },
            },
          },
        ],
      }),
    },
  },

  MuiTableSortLabel: {
    styleOverrides: {
      active: ({ theme }) => ({
        color: theme.palette.primary.contrastText,
      }),
      iconDirectionAsc: ({ theme }) => ({
        color: theme.palette.primary.contrastText,
      }),
      iconDirectionDesc: ({ theme }) => ({
        color: theme.palette.primary.contrastText,
      }),
    },
  },
};
