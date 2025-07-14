// next.config.js
const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''; // '/realtimex-docs' on GH Pages

module.exports = withNextra({
  output: 'export',
  basePath,
  assetPrefix: basePath,
  trailingSlash: true,
  reactStrictMode: true,
  // swcMinify is now the default in Next.js 15+, so you can remove it
  // swcMinify: true,

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

  // Note: redirects won’t be applied by `output: 'export'`; 
  // you’ll need a client-side solution or a _redirects file if you require them.
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
