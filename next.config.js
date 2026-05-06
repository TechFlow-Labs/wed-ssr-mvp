/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async rewrites() {
    // API_INTERNAL_URL is set in Coolify and points to the backend service FQDN.
    // Requests to /public-api/* are proxied server-side — no nginx needed.
    const target =
      process.env.API_PROXY_TARGET ||
      process.env.API_INTERNAL_URL ||
      'http://localhost:8000';
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
