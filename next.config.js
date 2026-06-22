/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Placeholders are inline SVG data URIs while the backend is not wired,
    // so skip the optimizer (which can't process data: URLs anyway).
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: '**.supabase.co' },
    ],
  },
}

module.exports = nextConfig
