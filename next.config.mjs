/** @type {import('next').NextConfig} */
const nextConfig = {
  // Lets phones on the same Wi-Fi open the dev server (development only)
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default nextConfig;
