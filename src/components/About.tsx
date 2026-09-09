"use client";

import { COMPANY_NAME } from "@/data/site";
import { useT } from "@/i18n/LanguageProvider";
import type { TranslationKey } from "@/i18n/translations";

/** `value` wins when the row shows a proper noun that never gets translated. */
const ROWS: { labelKey: TranslationKey; value?: string; valueKey?: TranslationKey }[] = [
  { labelKey: "reg_company", value: COMPANY_NAME },
  { labelKey: "reg_hq", value: "Ahmedabad, Gujarat, India" },
  { labelKey: "reg_offer", valueKey: "reg_offer_v" },
  { labelKey: "reg_cov", value: "India · Nepal · Kazakhstan · Africa" },
];

export default function About() {
  const t = useT();

  return (
    <section className="sec about" id="about">
      <div className="wrap">
        <div className="about-grid">
          <div data-reveal>
            <div className="eyebrow">{t("about_eyebrow")}</div>
            <h2 style={{ fontSize: 32, margin: "10px 0 16px" }}>{t("about_title")}</h2>
            <p>{t("about_p1")}</p>
            <p>{t("about_p2")}</p>
          </div>

          <div className="reg" data-reveal style={{ "--reveal-delay": "90ms" } as React.CSSProperties}>
            <div className="rh">{t("reg_title")}</div>
            <div className="rb">
              {ROWS.map((row) => (
                <div className="row" key={row.labelKey}>
                  <span className="k">{t(row.labelKey)}</span>
                  <span className="v">{row.value ?? t(row.valueKey!)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
