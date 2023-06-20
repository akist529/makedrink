/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost, img.makedr.ink'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.makedr.ink',
        port: '',
        pathname: '/i/**'
      }
    ]
  },
}

module.exports = nextConfig
