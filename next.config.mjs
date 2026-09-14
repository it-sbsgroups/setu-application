/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  // Compresses responses and adds ETag/caching headers automatically.
  compress: true,
  images: {
    // Lets next/image optimize the Unsplash product photography
    // (resizing, lazy-loading, WebP/AVIF) instead of shipping raw <img> tags.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
