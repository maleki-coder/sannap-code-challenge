import { Direction } from "@mui/material";
import {
    faIR as matFaIr,
    enUS as matUsEn,
    Localization,
} from "@mui/material/locale";

import "dayjs/locale/en";
import "dayjs/locale/fa";
import { faIR, enUS } from "@mui/x-date-pickers/locales";

export interface MUILocaleData {
    muiCore: Localization;
    muiDatePicker: any;
    dayJSLanguage: string;
    title: string;
    direction: Direction;
}

// RTL language
const farsi: MUILocaleData = {
    muiCore: matFaIr,
    muiDatePicker: faIR,
    dayJSLanguage: "fa",
    title: "فارسی",
    direction: "rtl",
};
const english: MUILocaleData = {
    muiCore: matUsEn,
    muiDatePicker: enUS,
    dayJSLanguage: "en",
    title: "English",
    direction: "ltr",
};

export const supportedLocales: MUILocaleData[] = [farsi, english];
