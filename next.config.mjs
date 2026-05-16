/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  allowedDevOrigins: ['192.168.1.4'],
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
