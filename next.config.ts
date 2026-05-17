import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  // Strip console output in production builds (keep error/warn)
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    // Cho phép next/image load ảnh từ Cloudflare R2 CDN
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.hieunt.site",
        pathname: "/**",
      },
    ],
  },

  // Security + cache headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        source: "/(.*)\\.(woff|woff2|ttf|otf|ico|png|jpg|jpeg|svg|webp|avif)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      // HTML pages — cache tại Cloudflare edge 1 tiếng
      // s-maxage: CDN cache, max-age=0: browser luôn revalidate để nhận bản mới sau purge
      // stale-while-revalidate: Cloudflare trả cache cũ trong khi fetch bản mới ở background
      {
        source: "/(|document)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
