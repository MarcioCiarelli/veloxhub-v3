/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'veloxhub.com.br' },
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: 'secure.gravatar.com' },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/wp-json/:path*',
        destination: 'https://veloxhub.com.br/wp-json/:path*',
      },
    ]
  },
}

export default nextConfig
