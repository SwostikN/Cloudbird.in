import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Not a static export: /api/contact runs on request to send the enquiry
  // through Resend, so the app needs a Node runtime (Vercel, Netlify, or
  // `next start` behind a reverse proxy). `trailingSlash` is deliberately
  // left off — it answered POSTs to /api/contact with a 308 redirect.
};

export default nextConfig;
