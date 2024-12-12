import type {} from "@mui/lab/themeAugmentation";
import type {} from "@mui/x-data-grid/themeAugmentation";
import { createTheme, responsiveFontSizes } from "@mui/material";
import { MUILocaleData } from "@infra/i18n/@types/supportedLocales";
import { faIR as pickersfaIR } from "@mui/x-date-pickers/locales";
import { faIR as gridfaIR } from "@mui/x-data-grid/locales";
export const getTheme = (mode: "light" | "dark", locale: MUILocaleData) => {
  return responsiveFontSizes(
    createTheme(
      {
        typography: {
          fontFamily:
            '"IRANSansXFaNum-Medium" , "Roboto", "Helvetica", "Arial", sans-serif',
          htmlFontSize: 16,
        },
        palette: {
          mode,
          common: {
            black: "#000000",
            white: "#ffffff",
          },
          background: {
            default: mode === "light" ? "#fafafa" : "#121212",
            paper: mode === "light" ? "#fff" : "#424242",
          },
          ...(mode === "light"
            ? {
                customBrown: {
                  main: "#a36943",
                },
                customGray: {
                  lightest: "#EEEEEE",
                  lighter: "#F8F8F8",
                  lighter_1: "#586264",
                  light: "#DDDDDD",
                  main: "#CCCCCC",
                  dark: "#34383B",
                },
                customBlack: {
                  main: "#263238",
                },
                customOrange: {
                  light: "#FF9900",
                  main: "#C96748",
                },
                dayGreen: {
                  main: "#019BA7",
                },
                customGreen2: {
                  main: "#009900",
                },
                customRed: {
                  main: "#A81830",
                },
                primary: {
                  main: "#fff",
                  dark: "#000",
                  contrastText: "#ffffff",
                },
                secondary: {
                  main: "#01baef",
                },

                error: {
                  main: "#b80c09",
                },
                warning: {
                  main: "#b80c09",
                },
                info: {
                  main: "#192bc2",
                },
                success: {
                  main: "#2fce27",
                },
              }
            : {
                primary: {
                  main: "#90caf9",
                  contrastText: "#000000",
                },
                secondary: {
                  main: "#ff4081",
                },
                error: {
                  main: "#ef5350",
                },
                warning: {
                  main: "#ffa726",
                },
                info: {
                  main: "#29b6f6",
                },
                success: {
                  main: "#66bb6a",
                },
              }),
        },
        components: {
          MuiCircularProgress: {
            styleOverrides: {
              root: ({ theme }) => ({
                color: theme.palette["customGray"].main,
              }),
            },
          },
          MuiRadio: {
            styleOverrides: {
              root: ({ theme }) => ({
                padding: 0,
                paddingInlineEnd: theme.spacing(1),
                color: theme.palette["customGray"].main,
                "&.Mui-checked": {
                  color: theme.palette["customRed"].main,
                },
              }),
            },
          },
          MuiInputLabel: {
            styleOverrides: {
              root: ({ theme }) => ({
                color: theme.palette.primary.darkChannel,
                fontSize: "0.8rem",
                "& .Mui-focused": {
                  color: theme.palette.secondary.darkChannel,
                },
              }),
            },
          },
          MuiButton: {
            styleOverrides: {
              root: ({ theme }) => ({
                "& .MuiLoadingButton-loadingIndicator": {
                  color: theme.palette.common.white,
                },
                height: theme.spacing(6),
                borderRadius: theme.spacing(1),
                fontSize: "0.8rem",
                "&.Mui-disabled": {
                  color: theme.palette["customGray"].light,
                },
                variants: [
                  {
                    props: { variant: "dayGreen" },
                    style: {
                      backgroundColor: theme.palette["dayGreen"].main,
                      color: theme.palette.primary.main,
                    },
                  },
                ],
              }),
            },
          },
          MuiFilledInput: {
            styleOverrides: {
              root: ({ theme }) => ({
                backgroundColor: theme.palette.primary.main,
                borderRadius: "24px",
                height: theme.spacing(5),
                color: theme.palette["customBlack"].main,
                "&:hover": {
                  backgroundColor: theme.palette.primary.light,
                },
                "&.Mui-focused": {
                  backgroundColor: theme.palette.primary.main,
                  borderColor: theme.palette["customBrown"].main,
                },
                "&::before": {
                  borderBottom: `2px solid ${theme.palette["customBrown"].main}`,
                },
                "&::after": {
                  borderBottom: `2px solid ${theme.palette["customBrown"].main}`,
                },
              }),
              input: {
                padding: "12px 14px",
              },
            },
          },
          MuiOutlinedInput: {
            styleOverrides: {
              root: ({ theme }) => ({
                backgroundColor: theme.palette.primary.main,
                borderRadius: theme.spacing(1),
                fontSize: "0.8rem",
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette["customBrown"].main,
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette["customBrown"].main,
                },
              }),
            },
          },
          MuiFormHelperText: {
            styleOverrides: {
              root: ({ theme }) => ({
                color: theme.palette["customBlack"].main,
              }),
            },
          },
          MuiFormLabel: {
            styleOverrides: {
              root: ({ theme }) => ({
                color: theme.palette["customBlack"].main,
                paddingInlineStart: theme.spacing(0.2),
                "&.Mui-focused": {
                  color: theme.palette["customBlack"].main,
                },
              }),
            },
          },
          MuiCssBaseline: {
            styleOverrides: {
              "input:-webkit-autofill": {
                "-webkit-box-shadow": "0 0 0 50px white inset",
                "-webkit-text-fill-color": "#333",
              },
              "input:-webkit-autofill:focus": {
                "-webkit-box-shadow": "0 0 0 50px white inset",
                "-webkit-text-fill-color": "#333",
              },
              body: {
                "&::-webkit-scrollbar": {
                  width: "10px",
                  height: "10px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: mode === "dark" ? "#444" : "#888", // Thumb color
                  borderRadius: "10px",
                  border: "2px solid transparent", // Border around thumb
                  backgroundClip: "content-box",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  backgroundColor: mode === "dark" ? "#666" : "#555", // Thumb hover color
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: mode === "dark" ? "#222" : "#eee", // Track color
                },
                ".MuiDrawer-paper": {
                  "&::-webkit-scrollbar": {
                    width: "10px",
                    height: "10px",
                  },
                  "&::-webkit-scrollbar-track": {
                    background: "#f1f1f1",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: "#888",
                    borderRadius: "6px",
                  },
                  "&::-webkit-scrollbar-thumb:hover": {
                    background: "#555",
                  },
                },
              },
            },
          },
        },
        direction: locale.direction,
      },
      locale.muiCore,
      locale.muiDatePicker,
      pickersfaIR,
      gridfaIR
    )
  );
};
