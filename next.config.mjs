/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  allowedDevOrigins: ['192.168.1.4'],
  images: {
    /* Keep hero backgrounds at full quality — no lossy re-encoding */
    unoptimized: true,
  },
};

export default nextConfig;
