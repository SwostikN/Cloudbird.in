"use client";

import { BRAND_LOGO, COMPANY_NAME, LINKEDIN_URL, SUPPORT_EMAIL } from "@/data/site";
import { useT } from "@/i18n/LanguageProvider";
import type { TranslationKey } from "@/i18n/translations";

const SERVICE_LINKS: TranslationKey[] = [
  "svc1_t",
  "svc2_t",
  "svc3_t",
  "svc6_t",
  "svc7_t",
];

const LOCATION_LINKS = [
  "Ahmedabad, India",
  "Kathmandu, Nepal",
  "Almaty, Kazakhstan",
  "Kampala, Africa",
];

export default function Footer() {
  const t = useT();
  const year = new Date().getFullYear();

  return (
    <footer className="ft">
      <div className="wrap">
        <div className="ft-top">
          <div className="fbrand">
            <img src={BRAND_LOGO} alt={COMPANY_NAME} width={600} height={399} />
            <p className="fdesc">{t("ft_desc")}</p>
            <div className="fsoc">
              <a href={`mailto:${SUPPORT_EMAIL}`} aria-label="Email">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 6h16v12H4z" fill="none" stroke="#cfe0f2" strokeWidth="2" />
                  <path d="M4 7l8 6 8-6" fill="none" stroke="#cfe0f2" strokeWidth="2" />
                </svg>
              </a>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4.98 3.5A2.5 2.5 0 112.5 6 2.5 2.5 0 014.98 3.5zM3 8.5h4V21H3zM9 8.5h3.8v1.7h.1a4.2 4.2 0 013.8-2.1c4 0 4.7 2.6 4.7 6V21h-4v-5.5c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V21H9z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4>{t("ft_services")}</h4>
            {SERVICE_LINKS.map((key) => (
              <a href="#services" key={key}>
                {t(key)}
              </a>
            ))}
          </div>

          <div>
            <h4>{t("ft_locations")}</h4>
            {LOCATION_LINKS.map((label) => (
              <a href="#locations" key={label}>
                {label}
              </a>
            ))}
          </div>

          <div>
            <h4>{t("ft_company")}</h4>
            <a href="#about">{t("nav_about")}</a>
            <a href="#customers">{t("nav_customers")}</a>
            <a href="#contact">{t("nav_contact")}</a>
            <a href={`mailto:${SUPPORT_EMAIL}`}>{t("top_login")}</a>
          </div>
        </div>

        <div className="ft-bot">
          <span>
            © {year} {COMPANY_NAME}. {t("ft_rights")}
          </span>
          <span>{t("ft_made")}</span>
        </div>
      </div>
    </footer>
  );
}
