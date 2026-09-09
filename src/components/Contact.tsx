"use client";

import { useState, type FormEvent } from "react";
import { HEAD_OFFICE, SUPPORT_EMAIL } from "@/data/site";
import { useT } from "@/i18n/LanguageProvider";
import { buildEnquiryMailto } from "@/lib/mailto";

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 6h16v12H4z" />
      <path d="M4 7l8 6 8-6" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21s-7-5.6-7-11a7 7 0 0114 0c0 5.4-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" />
    </svg>
  );
}

export default function Contact() {
  const t = useT();
  const [invalid, setInvalid] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const msg = String(data.get("msg") ?? "").trim();

    if (!name || !email || !msg) {
      setInvalid(true);
      return;
    }
    setInvalid(false);

    window.location.href = buildEnquiryMailto({ name, email, msg });
  };

  return (
    <section className="sec" id="contact">
      <div className="wrap">
        <div className="sec-head" data-reveal>
          <div className="eyebrow">{t("contact_eyebrow")}</div>
          <h2>{t("contact_title")}</h2>
          <p>{t("contact_sub")}</p>
        </div>

        <div className="contact-grid">
          <div data-reveal>
            <div className="ci">
              <div className="ic">
                <MailIcon />
              </div>
              <div>
                <h4>{t("ci_email")}</h4>
                <p>
                  <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
                </p>
              </div>
            </div>

            <div className="ci">
              <div className="ic">
                <PinIcon />
              </div>
              <div>
                <h4>{t("ci_addr")}</h4>
                <p>{HEAD_OFFICE}</p>
              </div>
            </div>

            <div className="ci">
              <div className="ic">
                <GlobeIcon />
              </div>
              <div>
                <h4>{t("ci_hours")}</h4>
                <p>{t("ci_hours_v")}</p>
              </div>
            </div>
          </div>

          <form
            className="form"
            onSubmit={onSubmit}
            noValidate
            data-reveal
            style={{ "--reveal-delay": "90ms" } as React.CSSProperties}
          >
            <div className="fld">
              <label htmlFor="cf-name">{t("f_name")}</label>
              <input
                id="cf-name"
                name="name"
                required
                autoComplete="name"
                aria-invalid={invalid || undefined}
                onChange={() => invalid && setInvalid(false)}
              />
            </div>
            <div className="fld">
              <label htmlFor="cf-email">{t("f_email")}</label>
              <input
                id="cf-email"
                type="email"
                name="email"
                required
                autoComplete="email"
                aria-invalid={invalid || undefined}
                onChange={() => invalid && setInvalid(false)}
              />
            </div>
            <div className="fld">
              <label htmlFor="cf-msg">{t("f_msg")}</label>
              <textarea
                id="cf-msg"
                name="msg"
                required
                aria-invalid={invalid || undefined}
                onChange={() => invalid && setInvalid(false)}
              />
            </div>

            <p className="form-err" role="alert" hidden={!invalid}>
              {t("f_required")}
            </p>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", justifyContent: "center" }}
            >
              {t("f_send")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
