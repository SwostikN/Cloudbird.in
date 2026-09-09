"use client";

import LanguageMenu from "@/components/LanguageMenu";
import { SUPPORT_EMAIL } from "@/data/site";
import { useT } from "@/i18n/LanguageProvider";

export default function TopBar() {
  const t = useT();

  return (
    <div className="topbar">
      <div className="wrap">
        <div className="tb-left">
          <a className="it" href={`mailto:${SUPPORT_EMAIL}`}>
            ✉&nbsp; {SUPPORT_EMAIL}
          </a>
          <span className="it">🕑&nbsp; {t("tb_hours")}</span>
        </div>
        <div className="tb-right">
          <a href={`mailto:${SUPPORT_EMAIL}`}>{t("top_login")}</a>
          <LanguageMenu />
        </div>
      </div>
    </div>
  );
}
