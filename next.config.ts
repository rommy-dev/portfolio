import type { NextConfig } from "next";

/*
 * Une seule config exportée : auparavant `module.exports = {...}` écrasait `export default`
 * une fois le fichier transpilé, et seules les `allowedDevOrigins` étaient prises en compte.
 */
const nextConfig: NextConfig = {
  reactStrictMode: false,
  allowedDevOrigins: ['10.58.245.84'],
  images: {
    /* AVIF en priorité (plus léger), WebP sinon. */
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    /* N'importe que les modules réellement utilisés de ces paquets. */
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
};

export default nextConfig;
