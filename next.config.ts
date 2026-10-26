import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // AVIF first — the hero plates and product shots are large, smooth
    // renders, exactly the material AVIF beats WebP on. WebP covers the
    // browsers that cannot take AVIF.
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75],
    // Optimising one of these plates costs over a second of CPU, so a
    // result is worth holding on to for a month. Asset names are stable
    // and change by filename when the artwork changes.
    minimumCacheTTL: 2678400,
    // Nothing on the site is laid out wider than a 2x 1536 reference
    // stage; 2048 and 3840 only ever produced renders no one could see.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
