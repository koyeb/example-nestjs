/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3001/api/:path*", // Proxy to NestJS backend
      },
    ];
  },
};

export default nextConfig;
