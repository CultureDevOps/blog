const { withContentlayer } = require('next-contentlayer2');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

// Définition des politiques de sécurité
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' giscus.app analytics.umami.is statichunt.com http://www.youtube.com https://*.googletagmanager.com https://vercel.live/ https://vercel.com;
  style-src 'self' 'unsafe-inline';
  img-src * blob: data: statichunt.com https://*.google-analytics.com https://*.googletagmanager.com https://vercel.live/ https://vercel.com *.pusher.com;
  media-src 'self' *.s3.amazonaws.com;
  connect-src * statichunt.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://vercel.live/ https://vercel.com *.pusher.com *.pusherapp.com;
  font-src 'self';
  frame-src giscus.app https://www.youtube.com/ https://www.youtube-nocookie.com/ https://vercel.live/ https://vercel.com;
`;

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, ''),
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
];

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  env: {
    CLOUD_FRONT_URL: 'https://d2mezi5ylxaxvl.cloudfront.net',
  },  
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  eslint: {
    dirs: ['app', 'components', 'layouts', 'scripts'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd2mezi5ylxaxvl.cloudfront.net',
        pathname: '**',
      },
    ],
    loader: process.env.NODE_ENV==="development" ? 'default' : 'custom',
    loaderFile: process.env.NODE_ENV==="development" ? '' : './components/loader/cloudfrontLoader.ts',
    formats: ['image/avif', 'image/webp'],
    domains: ['d2mezi5ylxaxvl.cloudfront.net'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    if (process.env.NODE_ENV === 'development') {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: '**/node_modules',
      };    
    }

    return config;
  },
};

module.exports = () => {
  const plugins = [withContentlayer, withBundleAnalyzer];
  return plugins.reduce((acc, plugin) => plugin(acc), nextConfig);
};
