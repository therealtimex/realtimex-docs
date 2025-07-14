// next.config.js
const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''; // e.g. '/realtimex-docs' on GH Pages

module.exports = withNextra({
  output: 'export',
  basePath,
  assetPrefix: basePath,
  trailingSlash: true,
  reactStrictMode: true,
  swcMinify: true,

  images: {
    unoptimized: true,
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },

  async redirects() {
    return [
      {
        source: '/RealTimeX-cloud/502',
        destination: '/cloud/error-502',
        permanent: true,
      },
    ];
  },
});
