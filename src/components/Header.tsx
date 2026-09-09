"use client";

import { useEffect, useRef, useState } from "react";
import { BRAND_LOGO, COMPANY_NAME } from "@/data/site";
import { useT } from "@/i18n/LanguageProvider";
import type { TranslationKey } from "@/i18n/translations";

const NAV_LINKS: { href: string; key: TranslationKey }[] = [
  { href: "#home", key: "nav_home" },
  { href: "#services", key: "nav_services" },
  { href: "#customers", key: "nav_customers" },
  { href: "#locations", key: "nav_locations" },
  { href: "#about", key: "nav_about" },
  { href: "#contact", key: "nav_contact" },
];

export default function Header() {
  const t = useT();
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="hdr">
      <div className="wrap">
        <a className="brand" href="#home">
          <img src={BRAND_LOGO} alt={COMPANY_NAME} width={600} height={399} />
        </a>

        <nav
          className={`nav${open ? " open" : ""}`}
          ref={navRef}
          aria-label="Primary"
          id="primary-nav"
        >
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {t(link.key)}
            </a>
          ))}
        </nav>

        <div className="hdr-cta">
          <a href="#contact" className="btn btn-primary">
            {t("cta_get_started")}
          </a>
          <button
            type="button"
            className={`burger${open ? " open" : ""}`}
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="primary-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
