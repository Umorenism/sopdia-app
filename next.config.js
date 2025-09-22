/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  staticPageGenerationTimeout: 1500, // ✅ must be top-level
  images: {
    domains: ['stackfood.6am.one'], // ✅ only image config here
  },
};

module.exports = nextConfig;
