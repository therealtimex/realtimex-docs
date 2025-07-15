// next.config.js
const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
});

module.exports = withNextra({
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  // swcMinify is now on by default in Next.js 15+

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

  // Note: custom redirects won’t be applied in a static export; 
  // handle them client‐side or via a `_redirects` file if needed.
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
