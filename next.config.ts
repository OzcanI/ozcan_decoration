import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // AWS S3 (virtual-hosted-style and path-style buckets)
      { protocol: "https", hostname: "*.amazonaws.com" },
      // Placeholder imagery used by the seed data (replace with real uploads).
      { protocol: "https", hostname: "picsum.photos" },
      // Optional custom CDN/public host for the bucket (e.g. CloudFront)
      ...(process.env.NEXT_PUBLIC_S3_PUBLIC_HOST
        ? [
            {
              protocol: "https" as const,
              hostname: process.env.NEXT_PUBLIC_S3_PUBLIC_HOST,
            },
          ]
        : []),
    ],
  },
};

export default withNextIntl(nextConfig);
