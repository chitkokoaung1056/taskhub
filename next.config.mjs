/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  reactCompiler: true,
   images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "eddiiaiukwflqpxkjshp.supabase.co",
      },
    ],
  },
}

export default nextConfig
