import { Switch, styled } from "@mui/material";

import { supportedLocales } from "@infra/i18n/@types/supportedLocales";
import { useLayoutStore } from "@store/useLayoutStore";

const CustomLanguageSwitch = styled(Switch)(({ theme }) => ({
    padding: 8,
    "& .MuiSwitch-track": {
        borderRadius: 22 / 2,
        "&::before, &::after": {
            content: '""',
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: 12,
            fontWeight: "bold",
            color: theme.palette.getContrastText(theme.palette.primary.main),
        },
        "&::before": {
            content: '"FA"', // Display "FA" for Farsi
            left: 12,
        },
        "&::after": {
            content: '"EN"', // Display "EN" for English
            right: 12,
        },
    },
    "& .MuiSwitch-thumb": {
        boxShadow: "none",
        width: 20,
        height: 20,
        margin: 0,
    },
}));

export default function LanguageSwitch() {
    const { language, onLanguageChange } = useLayoutStore();

    const toggleLanguage = (value: boolean) => {
        value ? onLanguageChange(supportedLocales[1].dayJSLanguage) : onLanguageChange(supportedLocales[0].dayJSLanguage);
    };
    return (
        <CustomLanguageSwitch
            value={language === 'fa' ? true : false}
            onChange={(event) => toggleLanguage(event.target.checked)}
        />
    );
}
