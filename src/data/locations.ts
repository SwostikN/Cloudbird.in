import type { FlagCode } from "@/data/flags";
import type { TranslationKey } from "@/i18n/translations";

export type LocationStatus = "live" | "op" | "soon";

export type Location = {
  flag: FlagCode;
  /** Translation key for the location heading. */
  key: TranslationKey;
  city: string;
  status: LocationStatus;
  addr?: string;
  map?: string;
  /** Name of the person reachable on this office's WhatsApp number. */
  contact?: string;
  /** WhatsApp number in wa.me format (digits only, no plus). */
  wa?: string;
  waLabel?: string;
};

export const LOCS: Location[] = [
  { flag: "in", key: "loc_in", city: "Ahmedabad, Gujarat", status: "live" },
  {
    flag: "np",
    key: "loc_np",
    city: "Lalitpur, Bagmati",
    status: "op",
    addr: "Chyasal Dekwo Sadak, Lalitpur, Bagmati Province 44600",
    map: "https://www.google.com/maps?q=Chyasal+Dekwo+Sadak,+Lalitpur,+Bagmati+Province+44600",
    contact: "Agrani Amatya",
    wa: "9779861763203",
    waLabel: "+977 986-1763203",
  },
  {
    flag: "kz",
    key: "loc_kz",
    city: "Almaty",
    status: "op",
    addr: "Улица Кисловодская, 15, Almaty",
    map: "https://www.google.com/maps?q=Улица+Кисловодская+15+Almaty",
    contact: "Затыльный Иван",
    wa: "77072235413",
    waLabel: "+7 707 223 5413",
  },
  { flag: "af", key: "loc_ug", city: "Kampala", status: "soon" },
];

export const statusKey = (status: LocationStatus): TranslationKey =>
  status === "soon" ? "status_soon" : status === "op" ? "status_op" : "status_live";
