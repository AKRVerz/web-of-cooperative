/** @type {import('next').NextConfig} */

const runtimeCaching = require('next-pwa/cache');
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  runtimeCaching,
  buildExcludes: [/middleware-manifest.json$/],
  sw: 'sw.js',
});

const nextConfig = withPWA({
  reactStrictMode: true,
  swcMinify: true,
});

module.exports = nextConfig;
