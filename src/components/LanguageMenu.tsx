"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { LANGS, type Lang } from "@/i18n/translations";

export default function LanguageMenu() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const current = LANGS.find((l) => l.code === lang) ?? LANGS[0];

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };

    document.addEventListener("click", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("click", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const choose = (code: Lang) => {
    setLang(code);
    setOpen(false);
  };

  return (
    <div className="lang" ref={wrapRef}>
      <button
        type="button"
        className="lang-btn"
        ref={buttonRef}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Change language"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" />
        </svg>
        <span>{current.short}</span>
        <svg
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          className={`lang-caret${open ? " open" : ""}`}
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <div className={`lang-menu${open ? " open" : ""}`} role="menu">
        {LANGS.map((l) => (
          <button
            key={l.code}
            type="button"
            role="menuitemradio"
            aria-checked={l.code === lang}
            className={l.code === lang ? "active" : undefined}
            onClick={() => choose(l.code)}
          >
            <span className="flag" aria-hidden="true">
              {l.flag}
            </span>{" "}
            {l.label}
          </button>
        ))}
      </div>
    </div>
  );
}
