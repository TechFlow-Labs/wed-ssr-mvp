/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async rewrites() {
    // Production traffic uses nginx /public-api → API; rewrites here would hit localhost inside the web container → 500.
    if (process.env.NODE_ENV === 'production') {
      return [];
    }
    const target =
      process.env.API_PROXY_TARGET ||
      process.env.API_INTERNAL_URL ||
      'http://localhost:8060';
    const base = String(target).replace(/\/$/, '');
    return [
      { source: '/public-api/:path*', destination: `${base}/:path*` },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
