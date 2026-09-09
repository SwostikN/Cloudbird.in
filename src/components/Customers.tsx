"use client";

import { CUSTOMERS, logoSrc } from "@/data/customers";
import { useT } from "@/i18n/LanguageProvider";

function ExternalIcon() {
  return (
    <span className="ext" aria-hidden="true">
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M7 17L17 7M9 7h8v8" />
      </svg>
    </span>
  );
}

export default function Customers() {
  const t = useT();

  return (
    <section className="sec" id="customers" style={{ background: "var(--bg2)" }}>
      <div className="wrap">
        <div className="sec-head" data-reveal>
          <div className="eyebrow">{t("customers_eyebrow")}</div>
          <h2>{t("customers_title")}</h2>
          <p>{t("customers_sub")}</p>
        </div>

        <div className="cust-grid">
          {CUSTOMERS.map((c, i) => {
            const style = { "--reveal-delay": `${Math.min(i, 12) * 40}ms` } as React.CSSProperties;
            const logo = <img src={logoSrc(c.key)} alt={c.name} loading="lazy" />;

            return c.url ? (
              <a
                key={c.key}
                className="cust"
                href={c.url}
                target="_blank"
                rel="noopener"
                title={c.name}
                data-reveal
                style={style}
              >
                {logo}
                <ExternalIcon />
              </a>
            ) : (
              <div key={c.key} className="cust" title={c.name} data-reveal style={style}>
                {logo}
              </div>
            );
          })}

          <div className="cust more" data-reveal>
            <span>{t("cust_more")}</span>
          </div>
        </div>

        <div className="cust-note">{t("customers_note")}</div>
      </div>
    </section>
  );
}
