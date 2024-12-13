import {
  MUILocaleData,
  supportedLocales,
} from "@infra/i18n/@types/supportedLocales";
import { createJSONStorage, persist } from "zustand/middleware";

import { PaletteMode } from "@mui/material";
import { create } from "zustand";

type State = {
  mode: PaletteMode;
  language: MUILocaleData["dayJSLanguage"];
  isMobile?: boolean;
};

type Actions = {
  onModeChange?: (mode: PaletteMode) => void;
  onLanguageChange?: (locale: MUILocaleData["dayJSLanguage"]) => void;
};

export const useLayoutStore = create(
  persist<State & Actions>(
    (set) => ({
      mode: "light", // Default value
      language: supportedLocales[0].dayJSLanguage,
      isMobile: null,
      onModeChange: (mode: PaletteMode) => set({ mode: mode }),
      onLanguageChange: (language) => set({ language: language }),
    }),
    {
      name: "layout-storage", // The key for storage (localStorage)
      storage: createJSONStorage(() => localStorage), // Use localStorage
      partialize: (state) => ({
        mode: state.mode,
        language: state.language,
      }),
    }
  )
);
