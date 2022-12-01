/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
  },
  async redirects() {
    return [
      { source: '/', destination: '/pokemon/p1', permanent: true },
      { source: '/pokemon', destination: '/pokemon/p1', permanent: true }
    ];
  }
};

module.exports = nextConfig;
