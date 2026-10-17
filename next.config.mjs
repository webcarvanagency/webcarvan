/** @type {import('next').NextConfig} */
const nextConfig = {
  // Lets phones on the same Wi-Fi open the dev server (development only)
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*"],
  // Old service URLs point to the renamed services.
  async redirects() {
    return [
      { source: "/services/web-development", destination: "/services/website-design-development", permanent: true },
      { source: "/services/ecommerce-shopify", destination: "/services/ecommerce-solutions", permanent: true },
      { source: "/services/digital-marketing", destination: "/services/digital-marketing-advertising", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default nextConfig;
