import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.mnlegal.net",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      {
        protocol: "https",
        hostname: "secure.gravatar.com",
      },
    ],
  },
  // Guards re-enabled: `npx tsc --noEmit` is clean and lint reports warnings
  // only, so neither of these can block a legitimate deploy — but both will
  // now stop a genuinely broken page from reaching production.
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Don't advertise the framework in every response.
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Clickjacking: deny framing entirely (site has no embed use case).
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Content-Security-Policy', value: "frame-ancestors 'none'" },
          // Stop browsers guessing content types.
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Send the origin to other sites, full URL same-origin.
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // No page on this site needs these devices.
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/404/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/404',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
