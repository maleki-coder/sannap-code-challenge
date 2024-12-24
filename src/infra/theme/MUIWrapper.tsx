import "@infra/i18n/config";

import {
    MUILocaleData,
    supportedLocales,
} from "@infra/i18n/@types/supportedLocales";
import { useEffect, useMemo } from "react";
import faIR from "date-fns-jalali/locale/fa-IR";
import enUS from "date-fns-jalali/locale/en-US";

import { CacheProvider } from "@emotion/react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ThemeProvider } from "@mui/material";
import createCache from "@emotion/cache";
import { getTheme } from "./theme";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { useLayoutStore } from "@store/useLayoutStore";
import { useTranslation } from "react-i18next";

/**
 TypeScript and React inconvenience:
 These functions are in here purely for types!
 They will be overwritten - it's just that
 createContext must have an initial value.
 Providing a type that could be 'null | something'
 and initiating it with *null* would be uncomfortable :)
 */

// Create rtl cache
const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
});

const emptyCache = createCache({
    key: "meaningless-key",
});

export function MUIWrapper({ children }: { children: React.ReactNode }) {
    const { i18n } = useTranslation();
    const { mode, language } = useLayoutStore();
    let locale: MUILocaleData;
    supportedLocales.forEach((local) => {
        if (local.dayJSLanguage == language) {
            locale = local;
        }
    });
    useEffect(() => {
        document.dir = locale.direction;
        i18n.changeLanguage(language);
    }, [language]);
    const theme = useMemo(() => getTheme(mode, locale), [mode, locale]);


    return (
        <CacheProvider value={locale.direction === "rtl" ? cacheRtl : emptyCache}>
            <ThemeProvider theme={theme}>
                <LocalizationProvider
                    adapterLocale={locale.direction === "rtl" ? faIR : enUS.code}
                >
                    {children}
                </LocalizationProvider>
            </ThemeProvider>
        </CacheProvider>
    );
}
