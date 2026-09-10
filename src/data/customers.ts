/**
 * CUSTOMER LINKS: two logos have no verified website yet (octaq, brainscape).
 * To make one clickable, paste its URL into the empty `url` below.
 * To add a NEW client: drop its logo into `public/logos/<key>.png` and push a
 * { name, key, url } entry here — the grid expands automatically.
 */
export type Customer = {
  name: string;
  key: string;
  url: string;
};

export const CUSTOMERS: Customer[] = [
  { name: "Erpbothub", key: "erpbothub", url: "https://erpbothub.com/" },
  { name: "Meritotech", key: "meritotech", url: "https://www.meritotech.com/" },
  { name: "Indivar Software Solutions", key: "indivar", url: "https://www.indivar.com/" },
  { name: "Nichem Industries", key: "nichem", url: "https://nichemind.com/" },
  { name: "Jagson Colorchem", key: "jagson", url: "https://jagson.com/" },
  { name: "Steel & Tube (STIL, Uganda)", key: "steeltube", url: "https://stil.co.ug/" },
  { name: "DJT Corporation & Investments", key: "djt", url: "https://djtcorp.in/" },
  { name: "Client", key: "octaq", url: "" }, // <-- add URL
  { name: "Techscope Technologies", key: "techscope", url: "https://techscope.co.in/" },
  { name: "Prasuma", key: "prasuma", url: "https://www.prasuma.com/" },
  { name: "KAKA PVC Profile", key: "kaka", url: "https://www.kakaprofile.com/" },
  { name: "CLICK ERP Services", key: "clickerp", url: "https://clickerpservices.com/" },
  { name: "Tech Enable", key: "techenable", url: "https://techenable.io/" },
  { name: "Green Gas Limited", key: "greengas", url: "https://gglonline.net/" },
  { name: "Ayushman Solutions", key: "ayushman", url: "https://www.ayushmansolution.com/" },
  { name: "Neo Software", key: "neosoft", url: "https://neosoftware.com.np/" },
  { name: "Sarbottam Steel", key: "sarbottam", url: "https://sarbottamsteels.com/" },
  { name: "Aether Alloys", key: "aether", url: "https://www.aetheralloys.com/" },
  { name: "eSwop", key: "eswop", url: "https://www.eswop.in" },
  { name: "MUT", key: "mut", url: "https://www.mutspl.com/" },
  { name: "Mainee Steel Works", key: "mainee", url: "https://www.maineesteelworks.com/" },
  { name: "Shri Gang Industries", key: "shrigang", url: "https://www.shrigangindustries.com/" },
  { name: "Shri Anant Syntex Ltd.", key: "shrianant", url: "https://shrianantsyntex.in/index" },
  { name: "Brainscape Solutions", key: "brainscape", url: "" }, // <-- add URL
  { name: "Jivika Agri", key: "jivikaagri", url: "https://www.jivikaagri.com/" },
  { name: "Jivika Chem International", key: "jivikachem", url: "https://www.jivikachem.com/" },
  { name: "Masterbatchwala", key: "masterbatchwala", url: "https://www.masterbatchwala.com/" },
  { name: "AM Masterbatch", key: "ammasterbatch", url: "https://ammasterbatch.com/" },
  { name: "Sunwin", key: "sunwin", url: "https://www.sunwin.net.in/" },
  { name: "House of United", key: "houseofunited", url: "https://houseofunited.com/" },
];

export const logoSrc = (key: string) => `/logos/${key}.png`;
