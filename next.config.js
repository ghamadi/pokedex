/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
  },
  async redirects() {
    return [
      { source: '/', destination: '/pokemon', permanent: true }
    ];
  }
};

module.exports = nextConfig;
