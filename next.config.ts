import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: `npm run build` emits a self-contained `out/` folder
  // that any static host (Nginx, Netlify, Vercel, S3) can serve as-is.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
