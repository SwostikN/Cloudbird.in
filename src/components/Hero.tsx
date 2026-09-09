"use client";

import { useT } from "@/i18n/LanguageProvider";
import type { TranslationKey } from "@/i18n/translations";

const STATS: { n: string; key: TranslationKey }[] = [
  { n: "24×7", key: "hstat1" },
  { n: "9+", key: "hstat2" },
  { n: "4", key: "hstat3" },
  { n: "100%", key: "hstat4" },
];

export default function Hero() {
  const t = useT();

  return (
    <section className="hero" id="home">
      <div className="wrap">
        <div>
          <div className="eyebrow">{t("hero_eyebrow")}</div>
          <h1>{t("hero_h1")}</h1>
          <p className="sub">{t("hero_sub")}</p>
          <div className="hero-cta">
            <a href="#services" className="btn btn-primary">
              {t("hero_cta1")}
            </a>
            <a href="#contact" className="btn btn-light">
              {t("hero_cta2")}
            </a>
          </div>
          <div className="hero-trust">
            <span aria-hidden="true">★★★★★</span> <span>{t("hero_trust")}</span>
          </div>
        </div>

        <div className="hero-card">
          <h3>{t("hero_card_t")}</h3>
          {STATS.map((s) => (
            <div className="hstat" key={s.key}>
              <div className="n">{s.n}</div>
              <div className="l">{t(s.key)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
