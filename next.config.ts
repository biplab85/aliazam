import type { NextConfig } from "next";

/**
 * Static export per task.md §2.
 * Images served as static <img> with unoptimized: true so we can ship a flat
 * /out folder. Switch to Next image optimization later if/when we move off
 * static hosting.
 */
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;
