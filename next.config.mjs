/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    buildActivity: false,
  },
  turbopack: {
    root: process.cwd(),
  },
}

export default nextConfig
