import type { } from "@mui/lab/themeAugmentation";
import type { } from "@mui/x-data-grid/themeAugmentation";
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
                        default: mode === "light" ? "#fafafa" : "#121212", // Different backgrounds for each mode
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
                                main: "#C96748"
                            },
                            DayGreen: {
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
                                main: "#90caf9", // Define dark mode primary color
                                contrastText: "#000000",
                            },
                            secondary: {
                                main: "#ff4081", // Define dark mode secondary color
                            },
                            error: {
                                main: "#ef5350", // Define dark mode error color
                            },
                            warning: {
                                main: "#ffa726", // Define dark mode warning color
                            },
                            info: {
                                main: "#29b6f6", // Define dark mode info color
                            },
                            success: {
                                main: "#66bb6a", // Define dark mode success color
                            },
                        }),
                },
                components: {
                    MuiSwitch: {
                        styleOverrides: {
                            root: ({ theme }) => ({
                                height: "47.5px",
                                "& .MuiSwitch-switchBase": {
                                    transform: "translateX(8px)",
                                    "&.Mui-checked": {
                                        transform: "translateX(20px)",
                                        "& + .MuiSwitch-track": {
                                            border: `3px solid ${theme.palette["customGray"].main}`,
                                        },
                                        "& .MuiSwitch-thumb ": {
                                            color: theme.palette["customGray"].main,
                                            width: "12px",
                                            height: "12px",
                                            marginTop: "8.5px",
                                        },
                                    },
                                    "&:hover": {
                                        background: "none",
                                    },
                                    "& .MuiSwitch-thumb ": {
                                        color: theme.palette["customGreen2"].main,
                                        width: "12px",
                                        height: "12px",
                                        marginTop: "8.5px",
                                        "&:hover": {
                                            boxShadow: "none", // Adjust the shadow on hover
                                        },
                                    },
                                },
                                "& .MuiSwitch-track": {
                                    borderRadius: "60px",
                                    border: `3px solid ${theme.palette["customGreen2"].main}`,
                                    backgroundColor: "transparent",
                                    opacity: 1,
                                },
                            }),
                        },
                    },
                    MuiAccordion: {
                        styleOverrides: {
                            root: ({ theme }) => ({
                                backgroundColor: theme.palette["customGray"].lighter,
                                boxShadow: "none",
                                border: "none",
                            }),
                        },
                    },
                    MuiAccordionDetails: {
                        styleOverrides: {
                            root: ({ theme }) => ({
                                padding: 0,
                                paddingTop: theme.spacing(1)
                            }),
                        },
                    },
                    MuiAccordionSummary: {
                        styleOverrides: {
                            root: ({ theme }) => ({
                                minHeight: "48px",
                                "&.Mui-expanded": {
                                    minHeight: "48px"
                                },
                                backgroundColor: theme.palette["customGray"].lighter_1,
                                color: theme.palette.primary.main,
                                borderRadius: "8px",
                                margin: 0,
                                '& .MuiAccordionSummary-content ': {

                                    "&.Mui-expanded": {
                                        margin: 0
                                    }
                                }
                            }),
                        },
                    },
                    MuiTab: {
                        styleOverrides: {
                            root: ({ theme }) => ({
                                border: "none",
                                '& .MuiTouchRipple-root': {
                                    color: theme.palette['customGreen'].main
                                },
                                '&.Mui-selected': {
                                    color: theme.palette['customGreen'].main,
                                    borderColor: theme.palette['customGreen'].main
                                },

                            })
                        }
                    },
                    MuiCircularProgress: {
                        styleOverrides: {
                            root: ({ theme }) => ({
                                color: theme.palette['customGreen'].main

                            })
                        }
                    },
                    MuiFormControlLabel: {
                        styleOverrides: {
                            root: ({ theme }) => ({
                                marginLeft: "0px",
                                marginRight: "0px",
                                "& .MuiFormControlLabel-label": {
                                    fontSize: theme.spacing(1.3),
                                },
                            }),
                        },
                    },
                    MuiRadio: {
                        styleOverrides: {
                            root: ({ theme }) => ({
                                padding: 0,
                                paddingInlineEnd: theme.spacing(1),
                                color: theme.palette["customGray"].main, // Default color of the radio button
                                "&.Mui-checked": {
                                    color: theme.palette["customGreen2"].main, // Color when checked
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
                                    color: theme.palette.secondary.darkChannel, // Color when focused
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
                                height: theme.spacing(5),
                                borderRadius: "24px",
                                fontSize: "0.8rem",
                                "&.Mui-disabled": {
                                    color: theme.palette["customGray"].light,
                                    // "&::before": {
                                    //     content: '""', // Empty string to enable ::before usage
                                    //     display: "block",
                                    //     position: "absolute",
                                    //     top: "50%",
                                    //     left: "50%",
                                    //     transform: "translate(-50%, -50%)",
                                    //     zIndex: 1, // Bring the icon to the front
                                    //     width: "24px", // Icon size
                                    //     height: "24px",
                                    //     background: `url(/assets/images/loginIllustration.png) no-repeat center`, // You can replace `BlockIcon` with any other SVG or image
                                    //     backgroundSize: "cover",
                                    // },
                                },
                                variants: [
                                    {
                                        props: { variant: "customGreen" },
                                        style: {
                                            backgroundColor: theme.palette["customGreen"].main,
                                            color: theme.palette.primary.main,
                                        },
                                    },
                                    {
                                        props: { variant: "customOutlined" },
                                        style: {
                                            backgroundColor: theme.palette.primary.main,
                                            border: `1px solid ${theme.palette['customGreen'].main}`,
                                            color: theme.palette['customGreen'].main,
                                        },
                                    },
                                    {
                                        props: { variant: "customOrange" },
                                        style: {
                                            backgroundColor: theme.palette["customOrange"].main,
                                            color: theme.palette.primary.main,
                                        },
                                    },
                                    {
                                        props: { variant: "customBrown" },
                                        style: {
                                            backgroundColor: theme.palette["customBrown"].main,
                                            color: theme.palette.primary.main,
                                        },
                                    },
                                    {
                                        props: { variant: "customGreen2" },
                                        style: {
                                            backgroundColor: theme.palette["customGreen2"].main,
                                            color: theme.palette.primary.main,
                                        },
                                    },
                                ],
                            }),
                        },
                    },
                    MuiMenuItem: {
                        styleOverrides: {
                            root: ({ theme }) => ({
                                color: theme.palette["customBlack"].main,
                                padding: theme.spacing(1.3),
                                marginTop: theme.spacing(0.2),
                                marginBottom: theme.spacing(0.2),
                                fontSize: "0.8rem",
                                "&:hover": {
                                    backgroundColor: theme.palette["customGreen"].main,
                                    color: theme.palette.primary.main,
                                },
                                "&.Mui-selected": {
                                    backgroundColor: theme.palette["customGreen"].main,
                                    color: theme.palette.primary.main,
                                    "&:hover": {
                                        backgroundColor: theme.palette["customGreen"].main,
                                    },
                                },
                            }),
                        },
                    },
                    MuiList: {
                        styleOverrides: {
                            root: ({ theme }) => ({
                                borderRadius: "10px",
                                fontSize: "0.2rem",
                            }),
                        },
                    },
                    MuiListItemText: {
                        styleOverrides: {
                            root: ({ theme }) => ({
                                "& .MuiListItemText-primary": {
                                    fontSize: "0.8rem",
                                },
                            }),
                        },
                    },
                    MuiListItemIcon: {
                        styleOverrides: {
                            root: ({ theme }) => ({
                                color: theme.palette["customBlack"].main,
                                minWidth: `${theme.spacing(3.8)} !important`,
                            }),
                        },
                    },
                    MuiCheckbox: {
                        styleOverrides: {
                            root: ({ theme }) => ({
                                "& .MuiSvgIcon-root": {
                                    // Change the border color when unchecked
                                    color: theme.palette["customGray"].main,
                                },
                                "&.Mui-checked .MuiSvgIcon-root": {
                                    // Change the border or icon color when checked
                                    color: theme.palette["customGreen2"].main, // For checked state
                                },
                            }),
                        },
                    },
                    MuiFilledInput: {
                        styleOverrides: {
                            root: ({ theme }) => ({
                                backgroundColor: theme.palette.primary.main, // Same background color as OutlinedInput
                                borderRadius: "24px", // Custom border radius like OutlinedInput
                                height: theme.spacing(5),
                                color: theme.palette["customBlack"].main,
                                "&:hover": {
                                    backgroundColor: theme.palette.primary.light, // Hover effect like in OutlinedInput
                                },
                                "&.Mui-focused": {
                                    backgroundColor: theme.palette.primary.main, // Focus state
                                    borderColor: theme.palette["customBrown"].main,
                                },
                                "&::before": {
                                    borderBottom: `2px solid ${theme.palette["customBrown"].main}`, // Bottom border for FilledInput (before focus)
                                },
                                "&::after": {
                                    borderBottom: `2px solid ${theme.palette["customBrown"].main}`, // Bottom border for FilledInput (after focus)
                                },
                            }),
                            input: {
                                padding: "12px 14px", // Same padding as OutlinedInput
                            },
                        },
                    },
                    MuiOutlinedInput: {
                        styleOverrides: {
                            root: ({ theme }) => ({
                                backgroundColor: theme.palette.primary.main,
                                borderRadius: theme.spacing(1),
                                // height: theme.spacing(5),
                                fontSize: "0.8rem",
                                // color: theme.palette["customBlack"].main,
                                // "& .MuiOutlinedInput-notchedOutline": {
                                //     paddingInlineStart: "32px",
                                // },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: theme.palette["customBrown"].main, // Border color when focused
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: theme.palette["customBrown"].main, // Change this to your desired hover color
                                },
                            }),
                        },
                    },
                    MuiFormHelperText: {
                        styleOverrides: {
                            root: ({ theme }) => ({
                                // fontSize: "12px",
                                color: theme.palette["customBlack"].main,
                            }),
                        },
                    },
                    MuiFormLabel: {
                        styleOverrides: {
                            root: ({ theme }) => ({
                                color: theme.palette["customBlack"].main,
                                paddingInlineStart: "2px",
                                "&.Mui-focused": {
                                    color: theme.palette["customBrown"].main,
                                },
                            }),
                        },
                    },
                    MuiBreadcrumbs: {
                        styleOverrides: {
                            root: ({ theme }) => ({
                                ".MuiBreadcrumbs-separator": {
                                    marginLeft: theme.spacing(0.5),
                                    marginRight: theme.spacing(0.5),
                                },
                            }),
                        },
                    },
                    MuiCssBaseline: {
                        styleOverrides: {
                            "input:-webkit-autofill": {
                                "-webkit-box-shadow": "0 0 0 50px white inset", // Change to your desired background color
                                "-webkit-text-fill-color": "#333",
                            },
                            "input:-webkit-autofill:focus": {
                                "-webkit-box-shadow": "0 0 0 50px white inset", // Change to your desired box-shadow
                                "-webkit-text-fill-color": "#333",
                            },
                            body: {
                                "&::-webkit-scrollbar": {
                                    width: "10px", // Scrollbar width
                                    height: "10px", // Scrollbar width
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
                                        height: "10px"
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
