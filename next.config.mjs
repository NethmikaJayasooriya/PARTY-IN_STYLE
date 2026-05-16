/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  allowedDevOrigins: ['192.168.1.4'],
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
