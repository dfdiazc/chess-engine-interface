/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dfdiazc.pythonanywhere.com",
        port: "",
        pathname: "/static/**",
      },
    ],
  },
};

export default nextConfig;
