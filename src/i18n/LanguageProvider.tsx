"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_LANG,
  I18N,
  type Lang,
  type TranslationKey,
} from "@/i18n/translations";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Every visit opens in English. The switcher changes the language for the
  // current visit only; the choice is deliberately not remembered, so a
  // returning visitor is never greeted in a language someone picked once.
  const [lang, setLang] = useState<Lang>(DEFAULT_LANG);

  useIsomorphicLayoutEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang,
      t: (key: TranslationKey) => I18N[lang][key] ?? I18N[DEFAULT_LANG][key],
    }),
    [lang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside a LanguageProvider");
  return ctx;
}

/** Shorthand for components that only need to translate strings. */
export function useT() {
  return useLanguage().t;
}
