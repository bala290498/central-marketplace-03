import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/index",
        destination: "/",
        permanent: true,
      },
      {
        source: "/how-it-works.html",
        destination: "/how-it-works",
        permanent: true,
      },
      {
        source: "/list-your-business.html",
        destination: "/list-your-business",
        permanent: true,
      },
      {
        source: "/we-are-hiring.html",
        destination: "/we-are-hiring",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
