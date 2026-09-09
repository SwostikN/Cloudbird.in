import { describe, expect, it } from "vitest";
import { CUSTOMERS } from "@/data/customers";
import { LOCS } from "@/data/locations";
import { SERVICES, SVCICON } from "@/data/services";
import { FLAGS } from "@/data/flags";
import { I18N, LANGS, type TranslationKey } from "@/i18n/translations";

describe("translations", () => {
  const keys = Object.keys(I18N.en) as TranslationKey[];

  it("covers every language declared in the switcher", () => {
    expect(Object.keys(I18N).sort()).toEqual(LANGS.map((l) => l.code).sort());
  });

  it.each(LANGS.map((l) => l.code))("%s has the same keys as English", (code) => {
    expect(Object.keys(I18N[code]).sort()).toEqual([...keys].sort());
  });

  it.each(LANGS.map((l) => l.code))("%s has no empty strings", (code) => {
    const empty = keys.filter((k) => !I18N[code][k]?.trim());
    expect(empty).toEqual([]);
  });
});

describe("content data", () => {
  it("carries the original 23 customers, 21 of them linked", () => {
    expect(CUSTOMERS).toHaveLength(23);
    expect(CUSTOMERS.filter((c) => c.url)).toHaveLength(21);
    expect(CUSTOMERS.filter((c) => !c.url).map((c) => c.key)).toEqual([
      "octaq",
      "techenable",
    ]);
  });

  it("uses unique customer keys", () => {
    expect(new Set(CUSTOMERS.map((c) => c.key)).size).toBe(CUSTOMERS.length);
  });

  it("points every customer URL at https", () => {
    CUSTOMERS.filter((c) => c.url).forEach((c) => {
      expect(c.url.startsWith("https://"), c.key).toBe(true);
    });
  });

  it("renders 9 services, exactly one flagship, each with an icon", () => {
    expect(SERVICES).toHaveLength(9);
    expect(SERVICES.filter((s) => s.feat)).toHaveLength(1);
    SERVICES.forEach((s) => expect(SVCICON[s.ic], s.k).toBeTruthy());
  });

  it("has a title and description translation for every service", () => {
    SERVICES.forEach((s) => {
      expect(I18N.en[`${s.k}_t` as TranslationKey], s.k).toBeTruthy();
      expect(I18N.en[`${s.k}_d` as TranslationKey], s.k).toBeTruthy();
    });
  });

  it("renders 4 locations with a flag each", () => {
    expect(LOCS).toHaveLength(4);
    LOCS.forEach((l) => expect(FLAGS[l.flag], l.city).toBeTypeOf("function"));
  });

  it("pairs every WhatsApp number with a label and digits only", () => {
    LOCS.filter((l) => l.wa).forEach((l) => {
      expect(l.waLabel, l.city).toBeTruthy();
      expect(l.wa).toMatch(/^\d+$/);
    });
  });

  it("names a contact on every office with a WhatsApp number", () => {
    LOCS.filter((l) => l.wa).forEach((l) => expect(l.contact, l.city).toBeTruthy());
    expect(LOCS.find((l) => l.flag === "np")?.contact).toBe("Agrani Amatya");
    expect(LOCS.find((l) => l.flag === "kz")?.contact).toBe("Затыльный Иван");
  });

  it("pairs every address with a map link", () => {
    LOCS.filter((l) => l.addr).forEach((l) => expect(l.map, l.city).toBeTruthy());
  });
});
