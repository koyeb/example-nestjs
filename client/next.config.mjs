/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://127.0.0.1:3001/:path*", // Proxy to NestJS backend
      },
    ];
  },
};

export default nextConfig;
