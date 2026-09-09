import type { TranslationKey } from "@/i18n/translations";

/** Inline SVG path data for each service icon, drawn on a 24x24 viewBox. */
export const SVCICON: Record<string, string> = {
  pcloud:
    '<path d="M7 16a3.5 3.5 0 010-7 4.5 4.5 0 018.6-1.2A3.3 3.3 0 0117 16z"/><rect x="9.3" y="13.4" width="5.4" height="5.2" rx="1"/><path d="M10.6 13.4v-1.1a1.4 1.4 0 012.8 0v1.1"/>',
  hana:
    '<path d="M4 7c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3z"/><path d="M4 7v10c0 1.7 3.6 3 8 3s8-1.3 8-3V7"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
  b1: '<rect x="3" y="4" width="18" height="14" rx="2"/><path d="M3 9h18M8 14h5"/><path d="M8 21h8"/>',
  cloud: '<path d="M7 18a4 4 0 010-8 5 5 0 019.6-1.3A3.7 3.7 0 0117 18z"/>',
  virt:
    '<rect x="3" y="4" width="18" height="7" rx="1.5"/><rect x="3" y="13" width="18" height="7" rx="1.5"/><path d="M7 7.5h.01M7 16.5h.01"/>',
  db: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
  sec: '<path d="M12 3l7 3v5c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6z"/><path d="M9 12l2 2 4-4"/>',
  mon: '<path d="M3 3v18h18"/><path d="M7 14l3-4 3 3 4-6"/>',
  sys:
    '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6v6H9z"/><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2"/>',
};

export type Service = {
  ic: keyof typeof SVCICON;
  /** Prefix for the `<k>_t` (title) and `<k>_d` (description) translation keys. */
  k: string;
  feat?: boolean;
};

export const SERVICES: Service[] = [
  { ic: "pcloud", k: "svcp", feat: true },
  { ic: "hana", k: "svc1" },
  { ic: "b1", k: "svc2" },
  { ic: "cloud", k: "svc3" },
  { ic: "virt", k: "svc4" },
  { ic: "db", k: "svc5" },
  { ic: "sec", k: "svc6" },
  { ic: "mon", k: "svc7" },
  { ic: "sys", k: "svc8" },
];

export const serviceTitleKey = (k: string) => `${k}_t` as TranslationKey;
export const serviceDescKey = (k: string) => `${k}_d` as TranslationKey;
