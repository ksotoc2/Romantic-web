/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.cache = false
    return config
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['www.dropbox.com', 'dropbox.com'],
    unoptimized: true,
  },
}

export default nextConfig
