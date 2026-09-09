"use client";

import { SERVICES, SVCICON, serviceDescKey, serviceTitleKey } from "@/data/services";
import { useT } from "@/i18n/LanguageProvider";

export default function Services() {
  const t = useT();

  return (
    <section className="sec" id="services">
      <div className="wrap">
        <div className="sec-head" data-reveal>
          <div className="eyebrow">{t("services_eyebrow")}</div>
          <h2>{t("services_title")}</h2>
          <p>{t("services_sub")}</p>
        </div>

        <div className="grid svc-grid">
          {SERVICES.map((s, i) => (
            <div
              className={`card${s.feat ? " feat" : ""}`}
              key={s.k}
              data-reveal
              style={{ "--reveal-delay": `${i * 55}ms` } as React.CSSProperties}
            >
              {s.feat && <span className="badge">{t("svc_badge")}</span>}
              <div className="svc-ic">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  dangerouslySetInnerHTML={{ __html: SVCICON[s.ic] }}
                />
              </div>
              <h3>{t(serviceTitleKey(s.k))}</h3>
              <p>{t(serviceDescKey(s.k))}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
