/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'veloxhub.com.br' },
      { protocol: 'https', hostname: 'wp.veloxhub.com.br' },
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: 'secure.gravatar.com' },
      { protocol: 'https', hostname: '*.gravatar.com' },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/wp-json/:path*',
        destination: 'https://wp.veloxhub.com.br/wp-json/:path*',
      },
    ]
  },
  async redirects() {
    return []
  },
}

export default nextConfig
