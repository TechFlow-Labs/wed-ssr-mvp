/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async rewrites() {
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
