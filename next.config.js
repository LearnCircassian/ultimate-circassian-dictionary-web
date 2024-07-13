const REMOTE_IMAGE_PATTERNS = require("./remoteImagePatterns.js");
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  async redirects() {
    return [];
  },
  async headers() {
    return [];
  },
  images: { remotePatterns: REMOTE_IMAGE_PATTERNS },
};

module.exports = nextConfig;
