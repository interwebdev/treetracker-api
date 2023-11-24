/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => [
    {
      source: "/:path*",
      has: [{ type: "host", value: "www.treetracker.app" }],
      destination: "https://treetracker.app/:path*",
      permanent: true,
    },
  ],
};

module.exports = nextConfig;
