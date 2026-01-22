import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // all these URLs will render "/"
      { source: "/about", destination: "/" },
      { source: "/projects", destination: "/" },
      { source: "/contact", destination: "/" },
      { source: "/skills", destination: "/" },
      { source: "/experience", destination: "/" },

    ];
  },
  /* config options here */
   images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
