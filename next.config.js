/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "surecare-benefits-icons.s3.eu-north-1.amazonaws.com",
        port: "",
        pathname: "/icons/**",
      },
      {
        protocol: "https",
        hostname: "surecare-benefits-icons.s3.amazonaws.com",
        port: "",
        pathname: "/icons/**",
      },
    ],
  },
};

module.exports = nextConfig;
