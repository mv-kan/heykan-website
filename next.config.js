/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['heykan-images-213453.s3.eu-central-1.amazonaws.com'],
  },
  output: 'standalone',
}

module.exports = nextConfig
