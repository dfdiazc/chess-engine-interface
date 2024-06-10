import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "unrealchess.live",
        port: "",
        pathname: "/static/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
